import { Pokemon } from "./pokemon";

export interface PokemonService {
  /**
   * Returns a random Pokemon.
   */
  getARandomOne(): Promise<Pokemon>
}