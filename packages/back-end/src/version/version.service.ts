import { PokeApiVersion } from "../poke-api";

export interface VersionService {
  /**
   * Returns a version with the provided id.
   * @param id The id of the version to get.
   */
  getOneById(id: number): Promise<PokeApiVersion>;

  /**
   * Fetches the regional Pokedex for this version.
   * @param version The version to get the pokedex from.
   */
  getPokedexFromOne(version: PokeApiVersion): Promise<void>;
}
