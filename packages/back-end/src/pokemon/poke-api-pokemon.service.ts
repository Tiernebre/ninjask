import { HttpClient } from "../http/http-client";
import { NamedAPIResourceList } from "../poke-api/named-api-resource-list";
import { getRandomInt } from "../random";
import { Pokemon } from "./pokemon";
import { PokemonService } from "./pokemon.service";
import { Logger } from '../logger'

// Ignoring Gen 8 because of PokeAPI still updating for it.
const NUMBER_OF_POKEMON = 809;

export class PokeApiPokemonService implements PokemonService {
  constructor(
    private readonly pokeApiHttpClient: HttpClient,
    private readonly logger: Logger
  ) {}

  public async getAll(): Promise<NamedAPIResourceList> {
    return this.pokeApiHttpClient.get("pokemon");
  }

  public async getOneById(id: number): Promise<Pokemon> {
    return this.pokeApiHttpClient.get(`pokemon/${id}`);
  }

  public async getARandomOne(): Promise<Pokemon> {
    const index = getRandomInt(0, NUMBER_OF_POKEMON);
    this.logger.info(`Fetching Pokemon with randomly generated index = ${index}`)
    const pokemonFound = await this.getOneById(index);
    this.logger.info(`Retrieved Pokemon ${pokemonFound.name}`)
    return pokemonFound;
  }
}
