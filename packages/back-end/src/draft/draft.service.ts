import fetch from "node-fetch";
import { Repository } from "typeorm";
import { fetchOk } from "../http";
import { PokeApiPokemonSpecies } from "../poke-api";
import { getRandomInt } from "../random";
import { VersionService } from "../version/version.service";
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
      const version = await this.versionService.getOneById(challenge.versionId);
      const {
        pokemon_entries: pokemonEntries,
      } = await this.versionService.getPokedexFromOne(version);
      const pokemonPooled: string[] = [];
      for (let i = 0; i < 5; i++) {
        const randomNumber = getRandomInt(0, pokemonEntries.length);
        const randomPokemon = pokemonEntries[randomNumber];
        const pokemon = await fetchOk<PokeApiPokemonSpecies>(randomPokemon.pokemon_species.url);
        pokemonPooled.push(pokemon.name);
      }
      console.log(pokemonPooled);
    }
  }
}
