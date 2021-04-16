import Koa from "koa";
import supertest from "supertest";
import { Server } from "http";
import Application from "koa";
import { PokemonRouter } from "./pokemon.router";
import { PokemonService } from "./pokemon.service";
import { object, when } from "testdouble";
import { generateMockPokeApiPokemon } from "../poke-api";

describe("Server (E2E)", () => {
  let app: Application;
  let server: Server;
  let request: supertest.SuperTest<supertest.Test>;
  let pokemonService: PokemonService;

  beforeAll(() => {
    app = new Koa();
    pokemonService = object<PokemonService>();
    const router = new PokemonRouter(pokemonService);
    app.use(router.routes());

    server = app.listen();

    request = supertest(server);
  });

  afterAll(() => {
    server.close();
  });

  describe("GET /random-pokemon", () => {
    const uri = "/random-pokemon";

    it("returns with 200 OK status", async () => {
      when(pokemonService.getARandomOne()).thenResolve(
        generateMockPokeApiPokemon()
      );
      const response = await request.get(uri).send();
      expect(response.status).toEqual(200);
    });

    it("returns with the a pokemon as the response", async () => {
      const expected = generateMockPokeApiPokemon();
      when(pokemonService.getARandomOne()).thenResolve(expected);
      const response = await request.get(uri).send();
      expect(response.body).toEqual(expected);
    });
  });
});
