import { Pokedex } from "./pokedex";
import { Version } from "./version";

export interface VersionService {
  /**
   * Returns a version with the provided id.
   * @param id The id of the version to get.
   */
  getOneById(id: number): Promise<Version>;

  /**
   * Fetches the regional Pokedex for a given version.
   * @param version The version to fetch a Pokedex for.
   */
  getPokedexFromOne(version: Version): Promise<Pokedex>;

  /**
   * Gets and returns all versions of the Pokemon games
   */
  getAll(): Promise<Version[]>;
}
