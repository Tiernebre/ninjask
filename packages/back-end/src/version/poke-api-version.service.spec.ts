/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
jest.mock("../http", () => ({
  fetchOk: jest.fn(),
}));

import { HttpClient } from "../http";
import { PokeApiVersionService } from "./poke-api-version.service";
import { object, when } from "testdouble";
import {
  generateMockPokeApiPokedex,
  generateMockPokeApiVersion,
  generateMockPokeApiVersionGroup,
} from "../poke-api/games.mock";
import { fetchOk } from "../http";
import { when as jestWhen } from "jest-when";
import { mapPokedexFromPokeApi, mapVersionFromPokeApi } from "./version.mapper";
import { Repository } from "typeorm";
import { VersionDeniedPokemonEntity } from "./version-denied-pokemon.entity";
import { generateMockVersionDeniedPokemon } from "./version.mock";
import { Logger } from "../logger";

const mockedFetchOk = fetchOk as unknown as jest.Mock;

describe("PokeApiVersionService", () => {
  let pokeApiVersionService: PokeApiVersionService;
  let pokeApiHttpClient: HttpClient;
  let versionDeniedPokemonRepository: Repository<VersionDeniedPokemonEntity>;

  beforeEach(() => {
    pokeApiHttpClient = object<HttpClient>();
    versionDeniedPokemonRepository =
      object<Repository<VersionDeniedPokemonEntity>>();
    pokeApiVersionService = new PokeApiVersionService(
      pokeApiHttpClient,
      versionDeniedPokemonRepository,
      object<Logger>()
    );
    mockedFetchOk.mockReset();
  });

  describe("getOneById", () => {
    it("returns a found version", async () => {
      const pokeApiVersion = generateMockPokeApiVersion();
      when(pokeApiHttpClient.get(`version/${pokeApiVersion.id}`)).thenResolve(
        pokeApiVersion
      );
      const versionDeniedList = [
        generateMockVersionDeniedPokemon(),
        generateMockVersionDeniedPokemon(),
      ];
      when(
        versionDeniedPokemonRepository.find({ versionId: pokeApiVersion.id })
      ).thenResolve(versionDeniedList);
      const gotten = await pokeApiVersionService.getOneById(pokeApiVersion.id);
      const expected = mapVersionFromPokeApi(
        pokeApiVersion,
        versionDeniedList.map(({ pokemonId }) => pokemonId)
      );
      expect(gotten).toEqual(expected);
    });
  });

  describe("getPokedexFromOneWithId", () => {
    it("returns an associated pokedex from a given version id", async () => {
      const version = generateMockPokeApiVersion();
      const versionGroup = generateMockPokeApiVersionGroup();
      const pokedex = generateMockPokeApiPokedex();
      when(pokeApiHttpClient.get(`version/${version.id}`)).thenResolve(version);
      when(
        versionDeniedPokemonRepository.find({ versionId: version.id })
      ).thenResolve([]);
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
    it("returns all found versions", async () => {
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
      const versions = await pokeApiVersionService.getAll();
      expect(versions).toHaveLength(1);
      expect(versions[0]).toEqual({
        id: mockVersion.id,
        name: mockVersion.name,
        deniedPokemonIds: new Set([]),
        versionGroupUrl: mockVersion.version_group.url,
      });
    });
  });
});
