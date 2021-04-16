import Koa from "koa";
import supertest from "supertest";
import { Server } from "http";
import Application from "koa";
import { PokemonRouter } from './pokemon.router'
import { PokemonService } from "./pokemon.service";
import { object } from 'testdouble'

describe("Server (E2E)", () => {
  let app: Application;
  let server: Server;
  let request: supertest.SuperTest<supertest.Test>;
  let pokemonService: PokemonService;

  beforeAll(() => {
    app = new Koa()
    pokemonService = object<PokemonService>()
    const router = new PokemonRouter(pokemonService)
    app.use(router.routes())

    server = app.listen();

    request = supertest(server);
  });

  afterAll(() => {
    server.close();
  });

  describe('GET /random-pokemon', () => {
    it("returns with 2xx successful status", (done) => {
      void request
        .get("/")
        .expect(200)
        .end((err, res) => {
          if (err) throw err;

          expect(res.status).toEqual(200);
          done();
        });
    });
  })
});