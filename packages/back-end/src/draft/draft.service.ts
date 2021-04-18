import { Repository } from "typeorm";
import { fetchOk } from "../http";
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
    private readonly pokemonService: PokemonService
  ) {}

  public async getOneById(id: number): Promise<DraftEntity> {
    const draft = await this.draftRepository.findOne(id, {
      relations: ["pokemon"],
    });
    if (!draft) {
      throw new Error(`Draft with id ${id} was not found.`);
    }
    return draft;
  }

  public async generatePoolOfPokemonForOneWithId(id: number): Promise<void> {
    const draft = await this.getOneById(id);
    const challenge = await draft.challenge;
    const version = await this.versionService.getOneById(challenge.versionId);
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
    const pokemonPooled = await Promise.all(
      randomNumbersGenerated.map(async (randomNumber) => {
        const randomPokemonUrl = pokemonUrls[randomNumber];
        const pokemon = await fetchOk<PokeApiPokemonSpecies>(randomPokemonUrl);
        const draftPokemonEntity = new DraftPokemonEntity();
        draftPokemonEntity.pokemonId = pokemon.id;
        draftPokemonEntity.draft = draft;
        return draftPokemonEntity;
      })
    );
    draft.pokemon = pokemonPooled;
    await this.draftRepository.save(draft);
  }

  public async getPoolOfPokemonForOneWithId(id: number): Promise<Pokemon[]> {
    const draft = await this.getOneById(id);
    const pokemonIds = draft.pokemon.map(({ pokemonId }) => pokemonId);
    return Promise.all(
      pokemonIds.map((pokemonId) => this.pokemonService.getOneById(pokemonId))
    );
  }
}
