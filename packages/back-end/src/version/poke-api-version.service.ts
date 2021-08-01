import { fetchOk } from "../http";
import { HttpClient } from "../http/http-client";
import {
  NamedAPIResourceList,
  PokeApiPokedex,
  PokeApiVersion,
  PokeApiVersionGroup,
} from "../poke-api";
import { VersionService } from "./version.service";
import {
  mapPokedexFromPokeApi,
  mapVersionFromEntity,
  mapVersionGroupFromPokeApi,
} from "./version.mapper";
import { Version } from "./version";
import { Pokedex } from "./pokedex";
import { Repository } from "typeorm";
import { Logger } from "../logger";
import { VersionEntity } from "./version.entity";
import { NotFoundError } from "../error";

export class PokeApiVersionService implements VersionService {
  constructor(
    private readonly pokeApiHttpClient: HttpClient,
    private readonly logger: Logger,
    private readonly versionRepository: Repository<VersionEntity>
  ) {}

  async getOneById(id: number): Promise<Version> {
    this.logger.info(`Retrieving version with id = ${id}`);
    await this.cacheVersionsIfTheyDoNotExist();

    const version = await this.versionRepository.findOne(id);
    if (!version) {
      throw new NotFoundError(`Version with id = ${id} was not found.`);
    }
    this.logger.info(
      `Retrieved version with id = ${id} and name = ${version.name}`
    );
    return mapVersionFromEntity(version);
  }

  async getPokedexFromOne(version: Version): Promise<Pokedex> {
    this.logger.info(
      `Retrieving regional pokedex for given version = ${JSON.stringify(
        version
      )}`
    );
    const versionGroupResponse = await fetchOk<PokeApiVersionGroup>(
      version.versionGroupUrl
    );
    const versionGroup = mapVersionGroupFromPokeApi(versionGroupResponse);
    const pokedexResponse = await fetchOk<PokeApiPokedex>(
      versionGroup.pokedexUrl
    );
    return mapPokedexFromPokeApi(pokedexResponse);
  }

  async getAll(): Promise<Version[]> {
    await this.cacheVersionsIfTheyDoNotExist();

    return (await this.versionRepository.find()).map((version) =>
      mapVersionFromEntity(version)
    );
  }

  private async cacheVersionsIfTheyDoNotExist(): Promise<void> {
    if ((await this.versionRepository.count()) <= 0) {
      await this.cacheAll();
    }
  }

  private async cacheAll(): Promise<void> {
    const { results } = await this.pokeApiHttpClient.get<NamedAPIResourceList>(
      "version?limit=100"
    );
    const versions = await Promise.all(
      results.map(async (result) => {
        return fetchOk<PokeApiVersion>(result.url);
      })
    );
    const versionsToSave = versions.map((version) => {
      return this.versionRepository.create({
        id: version.id,
        name: version.name,
        versionGroupUrl: version.version_group.url,
      });
    });
    await this.versionRepository.save(versionsToSave);
  }
}
