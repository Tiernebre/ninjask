import { Repository } from "typeorm";
import { fetchOk } from "../http";
import { PokeApiPokemonSpecies } from "../poke-api";
import { getRandomInt } from "../random";
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
      const pokemonPooled: DraftPokemonEntity[] = [];
      for (let i = 0; i < 5; i++) {
        const randomNumber = getRandomInt(0, pokemonEntries.length);
        const randomPokemon = pokemonEntries[randomNumber];
        const pokemon = await fetchOk<PokeApiPokemonSpecies>(
          randomPokemon.pokemon_species.url
        );
        const draftPokemonEntity = new DraftPokemonEntity();
        draftPokemonEntity.pokemonId = pokemon.id;
        draftPokemonEntity.draft = draft;
        pokemonPooled.push(draftPokemonEntity);
      }
      draft.pokemon = pokemonPooled;
      await this.draftRepository.save(draft);
    }
  }
}
