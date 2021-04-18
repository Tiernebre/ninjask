import { Pokemon } from "./pokemon";

export interface PokemonService {
  /**
   * Returns a Pokemon from a given pokemon id.
   * @param id The id of the Pokemon to get.
   * @returns The found pokemon.
   */
  getOneById(id: number): Promise<Pokemon>;

  /**
   * Returns a random Pokemon.
   * @returns A randomized Pokemon from anywhere in the national dex.
   */
  getARandomOne(): Promise<Pokemon>;
}
