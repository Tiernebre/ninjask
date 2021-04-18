import { Repository } from "typeorm";
import { fetchOk } from "../http";
import { Logger } from "../logger";
import { PokeApiPokemonSpecies } from "../poke-api";
import { Pokemon } from "../pokemon/pokemon";
import { PokemonService } from "../pokemon/pokemon.service";
import { getSetOfRandomIntegers } from "../random";
import { VersionService } from "../version/version.service";
import { DraftPokemonEntity } from "./draft-pokemon.entity";
import { DraftEntity } from "./draft.entity";

export class DraftService {
  constructor(
    private readonly draftRepository: Repository<DraftEntity>,
    private readonly versionService: VersionService,
    private readonly pokemonService: PokemonService,
    private readonly logger: Logger
  ) {}

  public async getOneById(id: number): Promise<DraftEntity> {
    this.logger.info(`Fetching draft with id = ${id}`);
    const draft = await this.draftRepository.findOne(id, {
      relations: ["pokemon"],
    });
    if (!draft) {
      throw new Error(`Draft with id ${id} was not found.`);
    }
    this.logger.info(`Returning draft ${JSON.stringify(draft)}`);
    return draft;
  }

  public async generatePoolOfPokemonForOneWithId(id: number): Promise<void> {
    this.logger.info(
      `Generating a pool of draftable Pokemon for draft with id = ${id}.`
    );
    const draft = await this.getOneById(id);
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
    const { pokemonUrls } = await this.versionService.getPokedexFromOne(
      version
    );
    const randomNumbersGenerated = Array.from(
      getSetOfRandomIntegers({
        min: 0,
        max: pokemonUrls.length,
        size: draft.poolSize,
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
    const pokemonPooled = await this.poolPokemon(pokemonUrls, randomNumbersGenerated, draft)
    draft.pokemon = pokemonPooled;
    await this.draftRepository.save(draft);
    this.logger.info(
      `Fully saved draft with id = ${id} with new generated pool of Pokemon.`
    );
  }

  public async getPoolOfPokemonForOneWithId(id: number): Promise<Pokemon[]> {
    this.logger.info(`Getting draftable Pokemon from draft with id = ${id}`);
    const draft = await this.getOneById(id);
    const pokemonIds = draft.pokemon.map(({ pokemonId }) => pokemonId);
    return Promise.all(
      pokemonIds.map((pokemonId) => this.pokemonService.getOneById(pokemonId))
    );
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
}
