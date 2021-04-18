import { PokeApiPokedex, PokeApiVersion } from "../poke-api";

export interface VersionService {
  /**
   * Returns a version with the provided id.
   * @param id The id of the version to get.
   */
  getOneById(id: number): Promise<PokeApiVersion>;

  /**
   * Fetches the regional Pokedex for a given version id.
   * @param id the id of the version to get a pokedex for..
   */
  getPokedexFromOneWithId(id: number): Promise<PokeApiPokedex>;
}
