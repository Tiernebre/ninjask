import { Pokemon } from "./Pokemon";

export interface PokemonService {
  /**
   * Returns a random Pokemon.
   */
  getARandomOne(): Promise<Pokemon>;
}
