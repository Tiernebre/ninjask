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

const mockedFetchOk = (fetchOk as unknown) as jest.Mock;

describe("PokeApiVersionService", () => {
  let pokeApiVersionService: PokeApiVersionService;
  let pokeApiHttpClient: HttpClient;

  beforeEach(() => {
    pokeApiHttpClient = object<HttpClient>();
    pokeApiVersionService = new PokeApiVersionService(pokeApiHttpClient);
    mockedFetchOk.mockReset();
  });

  describe("getOneById", () => {
    it("returns a found version", async () => {
      const expected = generateMockPokeApiVersion();
      when(pokeApiHttpClient.get(`version/${expected.id}`)).thenResolve(
        expected
      );
      const gotten = await pokeApiVersionService.getOneById(expected.id);
      expect(gotten).toEqual(expected);
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
      expect(gotten).toEqual(pokedex);
    });
  });
});
