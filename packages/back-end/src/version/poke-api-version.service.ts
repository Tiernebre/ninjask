import { fetchOk } from "../http";
import { HttpClient } from "../http/http-client";
import {
  PokeApiPokedex,
  PokeApiVersion,
  PokeApiVersionGroup,
} from "../poke-api";
import { VersionService } from "./version.service";
import {
  mapPokedexFromPokeApi,
  mapVersionFromPokeApi,
  mapVersionGroupFromPokeApi,
} from "./version.mapper";
import { Version } from "./version";
import { Pokedex } from "./pokedex";
import { Repository } from "typeorm";
import { VersionDeniedPokemonEntity } from "./version-denied-pokemon.entity";

export class PokeApiVersionService implements VersionService {
  constructor(
    private readonly pokeApiHttpClient: HttpClient,
    private readonly versionDeniedPokemonRepository: Repository<VersionDeniedPokemonEntity>
  ) {}

  async getOneById(id: number): Promise<Version> {
    const foundVersion = await this.pokeApiHttpClient.get<PokeApiVersion>(
      `version/${id}`
    );
    const deniedPokemon = await this.versionDeniedPokemonRepository.find({
      versionId: foundVersion.id,
    });
    const deniedPokemonIds = deniedPokemon.map(({ pokemonId }) => pokemonId);
    return mapVersionFromPokeApi(foundVersion, deniedPokemonIds);
  }

  async getPokedexFromOneWithId(id: number): Promise<Pokedex> {
    return this.getPokedexFromOne(await this.getOneById(id));
  }

  async getPokedexFromOne(version: Version): Promise<Pokedex> {
    const versionGroupResponse = await fetchOk<PokeApiVersionGroup>(
      version.versionGroupUrl
    );
    const versionGroup = mapVersionGroupFromPokeApi(versionGroupResponse);
    const pokedexResponse = await fetchOk<PokeApiPokedex>(
      versionGroup.pokedexUrl
    );
    return mapPokedexFromPokeApi(pokedexResponse);
  }
}
