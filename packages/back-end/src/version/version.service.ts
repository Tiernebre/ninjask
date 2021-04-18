import { PokeApiVersion } from "../poke-api/games";

export interface VersionService {
  getOneById(id: number): Promise<PokeApiVersion>
}