import Koa from "koa";
import supertest from "supertest";
import { Server } from "http";
import Application from "koa";
import { DraftRouter } from "./draft.router";
import { DraftService } from "./draft.service";
import { object, when } from "testdouble";
import { generateMockPokemon } from "../pokemon/pokemon.mock";

describe("Draft Router (integration)", () => {
  let app: Application;
  let server: Server;
  let request: supertest.SuperTest<supertest.Test>;
  let draftService: DraftService;

  beforeAll(() => {
    app = new Koa();
    draftService = object<DraftService>();
    const router = new DraftRouter(draftService);
    app.use(router.routes());

    server = app.listen();

    request = supertest(server);
  });

  afterAll(() => {
    server.close();
  });

  describe("POST /drafts/:id/pool", () => {
    const id = 1;
    const uri = `/drafts/${id}/pool`;

    it("returns with 204 NO CONTENT status", async () => {
      when(draftService.generatePoolOfPokemonForOneWithId(id)).thenResolve();
      const response = await request.post(uri).send();
      expect(response.status).toEqual(204);
    });
  });

  describe("GET /drafts/:id/pool", () => {
    const id = 2;
    const uri = `/drafts/${id}/pool`;

    it("returns with 200 OK status", async () => {
      when(draftService.getPoolOfPokemonForOneWithId(id)).thenResolve([
        generateMockPokemon(),
      ]);
      const response = await request.get(uri).send();
      expect(response.status).toEqual(200);
    });

    it("returns with a list of pokemon", async () => {
      const expected = [generateMockPokemon(), generateMockPokemon()];
      when(draftService.getPoolOfPokemonForOneWithId(id)).thenResolve(expected);
      const response = await request.get(uri).send();
      expect(response.body).toEqual(expected);
    });
  });
});
