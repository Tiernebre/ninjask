import { Repository } from "typeorm";
import { fetchOk } from "../http";
import { PokeApiPokemonSpecies } from "../poke-api";
import { getSetOfRandomIntegers } from "../random";
import { VersionService } from "../version/version.service";
import { DraftPokemonEntity } from "./draft-pokemon.entity";
import { DraftEntity } from "./draft.entity";

export class DraftService {
  constructor(
    private readonly draftRepository: Repository<DraftEntity>,
    private readonly versionService: VersionService
  ) {}

  public async generatePoolOfPokemonForOneWithId(id: number): Promise<void> {
    const draft = await this.draftRepository.findOne(id);

    if (draft) {
      const challenge = await draft.challenge;
      const {
        pokemon_entries: pokemonEntries,
      } = await this.versionService.getPokedexFromOneWithId(
        challenge.versionId
      );
      const randomNumbersGenerated = Array.from(getSetOfRandomIntegers({
        min: 0,
        max: pokemonEntries.length,
        size: 30
      }))
      const pokemonPooled = await Promise.all(randomNumbersGenerated.map(async (randomNumber) => {
        const randomPokemon = pokemonEntries[randomNumber];
        const pokemon = await fetchOk<PokeApiPokemonSpecies>(
          randomPokemon.pokemon_species.url
        );
        const draftPokemonEntity = new DraftPokemonEntity();
        draftPokemonEntity.pokemonId = pokemon.id;
        draftPokemonEntity.draft = draft;
        return draftPokemonEntity;
      }))
      draft.pokemon = pokemonPooled;
      await this.draftRepository.save(draft);
    }
  }
}
