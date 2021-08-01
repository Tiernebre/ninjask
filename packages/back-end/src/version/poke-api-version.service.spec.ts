jest.mock("../http", () => ({
  fetchOk: jest.fn(),
}));

import { HttpClient } from "../http";
import { PokeApiVersionService } from "./poke-api-version.service";
import { matchers, object, verify, when } from "testdouble";
import {
  generateMockPokeApiPokedex,
  generateMockPokeApiVersion,
  generateMockPokeApiVersionGroup,
} from "../poke-api/games.mock";
import { fetchOk } from "../http";
import { when as jestWhen } from "jest-when";
import {
  mapPokedexFromPokeApi,
  mapVersionFromEntity,
  mapVersionFromPokeApi,
} from "./version.mapper";
import { Repository } from "typeorm";
import { generateMockVersionEntity } from "./version.mock";
import { Logger } from "../logger";
import { VersionEntity } from "./version.entity";

const mockedFetchOk = fetchOk as unknown as jest.Mock;

describe("PokeApiVersionService", () => {
  let pokeApiVersionService: PokeApiVersionService;
  let pokeApiHttpClient: HttpClient;
  let repository: Repository<VersionEntity>;

  beforeEach(() => {
    pokeApiHttpClient = object<HttpClient>();
    repository = object<Repository<VersionEntity>>();
    pokeApiVersionService = new PokeApiVersionService(
      pokeApiHttpClient,
      object<Logger>(),
      repository
    );
    mockedFetchOk.mockReset();
  });

  const stageCacheMocks = (): VersionEntity => {
    when(pokeApiHttpClient.get("version?limit=100")).thenResolve({
      results: [
        {
          id: 1,
          url: "localhost:1234",
        },
      ],
    });
    const mockVersion = generateMockPokeApiVersion();
    jestWhen(mockedFetchOk)
      .calledWith("localhost:1234")
      .mockResolvedValue(mockVersion);
    const expectedEntity = generateMockVersionEntity();
    when(
      repository.create({
        id: mockVersion.id,
        name: mockVersion.name,
        versionGroupUrl: mockVersion.version_group.url,
      })
    ).thenReturn(expectedEntity);
    return expectedEntity;
  };

  const verifyCacheHappened = (expectedEntity: VersionEntity): void => {
    verify(repository.save([expectedEntity]));
  };
  const verifyCacheDidNotHappen = (): void => {
    verify(repository.save(matchers.anything()), { times: 0 });
  };

  describe("getOneById", () => {
    it("caches versions and returns a found version", async () => {
      when(repository.count()).thenResolve(0);
      const expectedEntity = stageCacheMocks();
      when(repository.findOne(expectedEntity.id)).thenResolve(expectedEntity);
      const gotten = await pokeApiVersionService.getOneById(expectedEntity.id);
      const expected = mapVersionFromEntity(expectedEntity);
      expect(gotten).toEqual(expected);
      verifyCacheHappened(expectedEntity);
    });

    it("does not cache versions and returns a found version", async () => {
      when(repository.count()).thenResolve(1);
      const expectedEntity = generateMockVersionEntity();
      when(repository.findOne(expectedEntity.id)).thenResolve(expectedEntity);
      const gotten = await pokeApiVersionService.getOneById(expectedEntity.id);
      const expected = mapVersionFromEntity(expectedEntity);
      expect(gotten).toEqual(expected);
      verifyCacheDidNotHappen();
    });
  });

  describe("getPokedexFromOneWithId", () => {
    it("returns an associated pokedex from a given version id", async () => {
      const version = generateMockPokeApiVersion();
      const versionGroup = generateMockPokeApiVersionGroup();
      const pokedex = generateMockPokeApiPokedex();
      when(pokeApiHttpClient.get(`version/${version.id}`)).thenResolve(version);
      jestWhen(mockedFetchOk)
        .calledWith(version.version_group.url)
        .mockResolvedValue(versionGroup);
      jestWhen(mockedFetchOk)
        .calledWith(versionGroup.pokedexes[0].url)
        .mockResolvedValue(pokedex);
      const gotten = await pokeApiVersionService.getPokedexFromOneWithId(
        version.id
      );
      expect(gotten).toEqual(mapPokedexFromPokeApi(pokedex));
    });
  });

  describe("getPokedexFromOne", () => {
    it("returns an associated pokedex from a given version", async () => {
      const version = generateMockPokeApiVersion();
      const versionGroup = generateMockPokeApiVersionGroup();
      const pokedex = generateMockPokeApiPokedex();
      jestWhen(mockedFetchOk)
        .calledWith(version.version_group.url)
        .mockResolvedValue(versionGroup);
      jestWhen(mockedFetchOk)
        .calledWith(versionGroup.pokedexes[0].url)
        .mockResolvedValue(pokedex);
      const gotten = await pokeApiVersionService.getPokedexFromOne(
        mapVersionFromPokeApi(version)
      );
      expect(gotten).toEqual(mapPokedexFromPokeApi(pokedex));
    });
  });

  describe("getAll", () => {
    it("fetches and caches versions onto the database if none exist", async () => {
      when(repository.count()).thenResolve(0);
      const expectedEntity = stageCacheMocks();
      when(repository.find()).thenResolve([expectedEntity]);
      const gottenVersions = await pokeApiVersionService.getAll();
      verifyCacheHappened(expectedEntity);
      expect(gottenVersions).toEqual([mapVersionFromEntity(expectedEntity)]);
    });

    it("does not cache if versions already exist", async () => {
      when(repository.count()).thenResolve(1);
      const expectedEntities = [generateMockVersionEntity()];
      when(repository.find()).thenResolve(expectedEntities);
      const gottenVersions = await pokeApiVersionService.getAll();
      verifyCacheDidNotHappen();
      expect(gottenVersions).toEqual(
        expectedEntities.map(mapVersionFromEntity)
      );
    });
  });
});
