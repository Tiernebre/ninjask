import { HttpClient } from "../http/http-client";
import { PokeApiPokemonService } from "./poke-api-pokemon.service";
import { matchers, object, when } from "testdouble";
import { NamedAPIResourceList } from "../poke-api/named-api-resource-list";
import { generateMockPokemon } from "./pokemon.mock";
import { Logger } from "../logger";

describe("PokeApiPokemonService", () => {
  let pokeApiPokemonService: PokeApiPokemonService;
  let pokeApiHttpClient: HttpClient;

  beforeEach(() => {
    pokeApiHttpClient = object<HttpClient>();
    pokeApiPokemonService = new PokeApiPokemonService(
      pokeApiHttpClient,
      object<Logger>()
    );
  });

  describe("getAll", () => {
    it("returns a resource list of pokemon", async () => {
      const expected: NamedAPIResourceList = {
        count: 1,
        next: "",
        prev: "",
        results: [
          {
            name: "",
            url: "",
          },
        ],
      };
      when(pokeApiHttpClient.get("pokemon")).thenResolve(expected);
      const response = await pokeApiPokemonService.getAll();
      expect(response).toEqual(expected);
    });
  });

  describe("getOneById", () => {
    it("returns the found pokemon by given id", async () => {
      const expected = generateMockPokemon();
      when(pokeApiHttpClient.get(`pokemon/${expected.id}`)).thenResolve(
        expected
      );
      const response = await pokeApiPokemonService.getOneById(expected.id);
      expect(response).toEqual(expected);
    });
  });

  describe("getARandomOne", () => {
    it("returns a random pokemon", async () => {
      const expected = generateMockPokemon();
      when(pokeApiHttpClient.get(matchers.anything())).thenResolve(expected);
      const response = await pokeApiPokemonService.getARandomOne();
      expect(response).toEqual(expected);
    });
  });
});
