import { HttpClient } from "../http/http-client";
import { NamedAPIResourceList } from "../poke-api/named-api-resource-list";
import { getRandomInt } from "../random";
import { Pokemon } from "./pokemon";
import { PokemonService } from "./pokemon.service";
import { Logger } from "../logger";

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
    this.logger.info(`Fetching Pokemon with id = ${id}`);
    const foundPokemon = await this.pokeApiHttpClient.get<Pokemon>(
      `pokemon/${id}`
    );
    this.logger.info(`Retrieved Pokemon ${foundPokemon.name}`);
    return foundPokemon;
  }

  public async getARandomOne(): Promise<Pokemon> {
    this.logger.info(`Getting a randomized Pokemon.`);
    const index = getRandomInt(0, NUMBER_OF_POKEMON);
    return this.getOneById(index);
  }
}
