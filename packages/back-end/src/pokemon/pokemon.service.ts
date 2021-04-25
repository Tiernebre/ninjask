import { Pokemon } from "./pokemon";

export interface PokemonService {
  /**
   * Returns a Pokemon from a given pokemon id.
   * @param id The id of the Pokemon to get.
   * @returns The found pokemon.
   */
  getOneById(id: number): Promise<Pokemon>;
}
