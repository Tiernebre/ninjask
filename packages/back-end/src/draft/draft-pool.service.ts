import { Repository } from "typeorm";
import { ChallengeService } from "../challenge";
import { ChallengeStatus } from "../challenge/challenge-status";
import { BadRequestError } from "../error";
import { fetchOk } from "../http";
import { Logger } from "../logger";
import { PokeApiPokemonSpecies } from "../poke-api";
import { PokemonService } from "../pokemon/pokemon.service";
import { getSetOfRandomIntegers } from "../random";
import { Version } from "../version/version";
import { VersionService } from "../version/version.service";
import { DraftPokemonEntity } from "./draft-pokemon.entity";
import { DraftPoolPokemon } from "./draft-pool-pokemon";
import { DraftEntity } from "./draft.entity";
import { DraftService } from "./draft.service";

export class DraftPoolService {
  constructor(
    private readonly draftService: DraftService,
    private readonly draftRepository: Repository<DraftEntity>,
    private readonly versionService: VersionService,
    private readonly pokemonService: PokemonService,
    private readonly logger: Logger,
    private readonly challengeService: ChallengeService
  ) {}

  public async generateOneForDraftWithId(id: number): Promise<void> {
    this.logger.info(
      `Generating a pool of draftable Pokemon for draft with id = ${id}.`
    );
    const draft = await this.draftService.getOneAsEntityWithPool(id);
    const poolCannotOccur =
      !(await this.challengeService.oneCanHavePoolGeneratedWithId(
        draft.challengeId
      ));
    if (poolCannotOccur) {
      throw new BadRequestError(
        "The draft cannot be pooled anymore since the challenge has moved forward."
      );
    }

    const version = await this.getVersionForDraft(draft);
    const pokemonUrls = await this.getEligiblePokemonForDraft(version);
    const randomNumbersGenerated =
      await this.generateRandomPokemonIndicesForDraft(
        draft,
        version,
        pokemonUrls
      );
    const pokemonPooled = await this.poolPokemon(
      pokemonUrls,
      randomNumbersGenerated,
      draft
    );
    await this.clearExistingDraftPool(draft);
    draft.pokemon = Promise.resolve(pokemonPooled);
    draft.livePoolPokemonIndex = -1;
    await this.draftRepository.save(draft);
    await this.challengeService.updateStatusForOneWithId(
      draft.challengeId,
      ChallengeStatus.POOLED
    );
    this.logger.info(
      `Fully saved draft with id = ${id} with new generated pool of Pokemon.`
    );
  }

  public async getOneForDraftWithId(id: number): Promise<DraftPoolPokemon[]> {
    this.logger.info(`Getting draftable Pokemon from draft with id = ${id}`);
    const draft = await this.draftService.getOneAsEntityWithPool(id);
    const associatedDraftPokemon = await draft.pokemon;
    return Promise.all(
      associatedDraftPokemon.map(async (draftPoolPokemon) => {
        const pokemon = await this.pokemonService.getOneById(
          draftPoolPokemon.pokemonId
        );
        return {
          ...pokemon,
          draftPoolId: draftPoolPokemon.id,
        };
      })
    );
  }

  private async getVersionForDraft(draft: DraftEntity): Promise<Version> {
    const challenge = await draft.challenge;
    this.logger.info(
      `Found challenge with id = ${challenge.id} that was associated with draft for pool generation.`
    );
    const version = await this.versionService.getOneById(challenge.versionId);
    this.logger.info(
      `Found version ${JSON.stringify(
        version
      )} that was associated with challenge for pool generation.`
    );
    return version;
  }

  private async getEligiblePokemonForDraft(
    version: Version
  ): Promise<string[]> {
    const { pokemonUrls } = await this.versionService.getPokedexFromOne(
      version
    );
    return pokemonUrls;
  }

  private async generateRandomPokemonIndicesForDraft(
    draft: DraftEntity,
    version: Version,
    pokemonUrls: string[]
  ): Promise<number[]> {
    const randomNumbersGenerated = Array.from(
      getSetOfRandomIntegers({
        min: 0,
        max: pokemonUrls.length,
        size: await this.getPoolSizeForDraft(draft),
        denyList: version.deniedPokemonIds,
      })
    );
    this.logger.info(
      `Using Pokedex associated with version ${
        version.name
      }: The following random Pokedex numbers were generated for the draft: ${randomNumbersGenerated.join(
        ", "
      )}`
    );
    return randomNumbersGenerated;
  }

  private async poolPokemon(
    pokemonUrls: string[],
    pokemonIndices: number[],
    draft: DraftEntity
  ): Promise<DraftPokemonEntity[]> {
    return Promise.all(
      pokemonIndices.map(async (randomNumber: number) => {
        const randomPokemonUrl = pokemonUrls[randomNumber];
        const pokemon = await fetchOk<PokeApiPokemonSpecies>(randomPokemonUrl);
        const draftPokemonEntity = new DraftPokemonEntity();
        draftPokemonEntity.pokemonId = pokemon.id;
        draftPokemonEntity.draft = draft;
        this.logger.info(`Added ${pokemon.name} to the draft. Welcome!`);
        return draftPokemonEntity;
      })
    );
  }

  private async clearExistingDraftPool(draft: DraftEntity): Promise<void> {
    const draftPokemon = await draft.pokemon;
    if (draftPokemon.length) {
      this.logger.info(
        `Draft with id = ${draft.id} already had an existing pool of Pokemon. Clearing out the existing pool in favor of the newly generated one.`
      );
      draft.pokemon = Promise.resolve([]);
      await this.draftRepository.save(draft);
      this.logger.info(`Cleared the pool for draft with id = ${draft.id}`);
    } else {
      this.logger.info(
        `Draft with id = ${draft.id} does not have an existing pool.`
      );
    }
  }

  private async getPoolSizeForDraft(draft: DraftEntity): Promise<number> {
    const challenge = await draft.challenge;
    const { length: numberOfParticipants } = await challenge.participants;
    const numberOfDraftPicks = numberOfParticipants * draft.numberOfRounds;
    return numberOfDraftPicks + draft.extraPoolSize;
  }
}
