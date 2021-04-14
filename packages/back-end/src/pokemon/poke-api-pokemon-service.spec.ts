import { HttpClient } from "../http/http-client";
import { PokeApiPokemonService } from "./poke-api-pokemon-service";
import { object, when } from "testdouble";
import { NamedAPIResourceList } from "../poke-api/named-api-resource-list";
import { Pokemon } from "./pokemon";

describe("PokeApiPokemonService", () => {
  let pokeApiPokemonService: PokeApiPokemonService;
  let pokeApiHttpClient: HttpClient;

  beforeEach(() => {
    pokeApiHttpClient = object<HttpClient>();
    pokeApiPokemonService = new PokeApiPokemonService(pokeApiHttpClient);
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
      const expected: Pokemon = {
        id: 12,
        name: "butterfree",
        base_experience: 178,
        height: 11,
        is_default: true,
        order: 16,
        weight: 320,
      };
      when(pokeApiHttpClient.get(`pokemon/${expected.id}`)).thenResolve(
        expected
      );
      const response = await pokeApiPokemonService.getOneById(expected.id);
      expect(response).toEqual(expected);
    });
  });
});
