import { HttpClient } from "../http/http-client";
import { PokemonService } from "./pokemon.service";
import { Logger } from "../logger";
import { mapFromPokeApi } from "./pokemon.mapper";
import { Pokemon } from "./pokemon";
import { PokeApiPokemonSpecies } from "../poke-api";

export class PokeApiPokemonService implements PokemonService {
  constructor(
    private readonly pokeApiHttpClient: HttpClient,
    private readonly logger: Logger
  ) {}

  public async getOneById(id: number): Promise<Pokemon> {
    this.logger.info(`Fetching Pokemon with id = ${id}`);
    const foundPokemon = await this.pokeApiHttpClient.get<PokeApiPokemonSpecies>(
      `pokemon-species/${id}`
    );
    this.logger.info(`Retrieved Pokemon ${foundPokemon.name}`);
    return mapFromPokeApi(foundPokemon);
  }
}
