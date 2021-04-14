import { HttpClient } from "../http/http-client";
import { NamedAPIResourceList } from "../poke-api/named-api-resource-list";
import { getRandomInt } from "../random";
import { Pokemon } from "./pokemon";
import { PokemonService } from "./pokemon-service";

export class PokeApiPokemonService implements PokemonService {
  constructor(private readonly pokeApiHttpClient: HttpClient) {}

  public async getAll(): Promise<NamedAPIResourceList> {
    return this.pokeApiHttpClient.get("pokemon");
  }

  public async getOneById(id: number): Promise<Pokemon> {
    return this.pokeApiHttpClient.get(`pokemon/${id}`);
  }

  public async getARandomOne(): Promise<Pokemon> {
    const { count } = await this.getAll()
    const index = getRandomInt(0, count)
    return this.getOneById(index)
  }
}
