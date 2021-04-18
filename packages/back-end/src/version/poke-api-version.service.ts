import { fetchOk } from "../http";
import { HttpClient } from "../http/http-client";
import {
  PokeApiPokedex,
  PokeApiVersion,
  PokeApiVersionGroup,
} from "../poke-api";
import { VersionService } from "./version.service";
import { mapPokedexFromPokeApi, mapVersionFromPokeApi, mapVersionGroupFromPokeApi } from './version.mapper'
import { Version } from './version'
import { Pokedex } from "./pokedex";

export class PokeApiVersionService implements VersionService {
  constructor(private readonly pokeApiHttpClient: HttpClient) {}

  async getOneById(id: number): Promise<Version> {
    const foundVersion = await this.pokeApiHttpClient.get<PokeApiVersion>(`version/${id}`)
    return mapVersionFromPokeApi(foundVersion)
  }

  async getPokedexFromOneWithId(id: number): Promise<Pokedex> {
    const version = await this.getOneById(id);
    const versionGroupResponse = await fetchOk<PokeApiVersionGroup>(
      version.versionGroupUrl
    );
    const versionGroup = mapVersionGroupFromPokeApi(versionGroupResponse)
    const pokedexResponse = await fetchOk<PokeApiPokedex>(versionGroup.pokedexUrl)
    return mapPokedexFromPokeApi(pokedexResponse)
  }
}
