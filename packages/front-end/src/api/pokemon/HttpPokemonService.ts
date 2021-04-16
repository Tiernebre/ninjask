import { HttpClient } from "../http";
import { Pokemon } from "./Pokemon";
import { PokemonService } from "./PokemonService";

export class HttpPokemonService implements PokemonService {
  constructor(private readonly httpClient: HttpClient) {}

  getARandomOne(): Promise<Pokemon> {
    return this.httpClient.get('random-pokemon')
  }
}