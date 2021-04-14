import { HttpClient } from "../http/http-client";
import { Pokemon } from "./pokemon";
import { PokemonService } from "./pokemon-service";

export class PokeApiPokemonService implements PokemonService {
  constructor(
    private readonly pokeApiHttpClient: HttpClient
  ) {}

  public async getOne(id: number): Promise<Pokemon> {
    return this.pokeApiHttpClient.get(`pokemon/${id}`)
  }
}