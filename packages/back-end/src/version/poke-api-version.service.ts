import fetch from "node-fetch";
import { HttpClient } from "../http/http-client";
import { PokeApiVersion, PokeApiVersionGroup } from "../poke-api";
import { VersionService } from "./version.service";

export class PokeApiVersionService implements VersionService {
  constructor(
    private readonly pokeApiHttpClient: HttpClient,
  ) {}

  getOneById(id: number): Promise<PokeApiVersion> {
    return this.pokeApiHttpClient.get(`version/${id}`)
  }

  async getPokedexFromOne(version: PokeApiVersion): Promise<void> {
    const versionGroupResponse = await fetch(version.version_group.url)
    const versionGroup = await versionGroupResponse.json() as PokeApiVersionGroup
    console.log(versionGroup)
  }
}