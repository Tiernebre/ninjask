import { Pokemon } from "./Pokemon";
import { PokemonService } from "./PokemonService";

export class HttpPokemonService implements PokemonService {
  getARandomOne(): Promise<Pokemon> {
    throw new Error("Method not implemented.");
  }
}