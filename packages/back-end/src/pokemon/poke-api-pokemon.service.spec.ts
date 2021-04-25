import { HttpClient } from "../http/http-client";
import { PokeApiPokemonService } from "./poke-api-pokemon.service";
import { object, when } from "testdouble";
import { generateMockPokeApiPokemonSpecies } from "../poke-api";
import { Logger } from "../logger";
import { mapFromPokeApi } from "./pokemon.mapper";

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

  describe("getOneById", () => {
    it("returns the found pokemon by given id", async () => {
      const expected = generateMockPokeApiPokemonSpecies();
      when(pokeApiHttpClient.get(`pokemon-species/${expected.id}`)).thenResolve(
        expected
      );
      const response = await pokeApiPokemonService.getOneById(expected.id);
      expect(response).toEqual(mapFromPokeApi(expected));
    });
  });
});
