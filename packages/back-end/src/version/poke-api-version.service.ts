import fetch from "node-fetch";
import { HttpClient } from "../http/http-client";
import {
  PokeApiPokedex,
  PokeApiVersion,
  PokeApiVersionGroup,
} from "../poke-api";
import { VersionService } from "./version.service";

export class PokeApiVersionService implements VersionService {
  constructor(private readonly pokeApiHttpClient: HttpClient) {}

  getOneById(id: number): Promise<PokeApiVersion> {
    return this.pokeApiHttpClient.get(`version/${id}`);
  }

  async getPokedexFromOne(version: PokeApiVersion): Promise<PokeApiPokedex> {
    const versionGroupResponse = await fetch(version.version_group.url);
    const versionGroup = (await versionGroupResponse.json()) as PokeApiVersionGroup;
    const [pokedex] = versionGroup.pokedexes;
    const pokedexResponse = await fetch(pokedex.url);
    return pokedexResponse.json() as Promise<PokeApiPokedex>;
  }
}
