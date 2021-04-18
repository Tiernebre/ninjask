import { HttpClient } from "../http/http-client";
import { PokeApiVersion } from "../poke-api/games";
import { VersionService } from "./version.service";

export class PokeApiVersionService implements VersionService {
  constructor(
    private readonly pokeApiHttpClient: HttpClient,
  ) {}

  getOneById(id: number): Promise<PokeApiVersion> {
    return this.pokeApiHttpClient.get(`version/${id}`)
  }
}