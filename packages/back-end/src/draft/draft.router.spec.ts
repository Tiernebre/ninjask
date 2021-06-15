import Koa from "koa";
import supertest from "supertest";
import { Server } from "http";
import Application from "koa";
import { DraftRouter } from "./draft.router";
import { object, when } from "testdouble";
import { generateMockPokemon } from "../pokemon/pokemon.mock";
import { DraftPoolService } from "./draft-pool.service";
import { DraftSelectionService } from "../draft-selection";
import { generateRandomNumber } from "../random";
import { generateMockDraftSelection } from "../draft-selection/draft-selection.mock";

describe("Draft Router (integration)", () => {
  let app: Application;
  let server: Server;
  let request: supertest.SuperTest<supertest.Test>;
  let draftPoolService: DraftPoolService;
  let draftSelectionService: DraftSelectionService;

  beforeAll(() => {
    app = new Koa();
    draftPoolService = object<DraftPoolService>();
    draftSelectionService = object<DraftSelectionService>();
    const router = new DraftRouter(draftPoolService, draftSelectionService);
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
      when(draftPoolService.generateOneForDraftWithId(id)).thenResolve();
      const response = await request.post(uri).send();
      expect(response.status).toEqual(204);
    });
  });

  describe("GET /drafts/:id/pool", () => {
    const id = 2;
    const uri = `/drafts/${id}/pool`;

    it("returns with 200 OK status", async () => {
      when(draftPoolService.getOneForDraftWithId(id)).thenResolve([
        generateMockPokemon(),
      ]);
      const response = await request.get(uri).send();
      expect(response.status).toEqual(200);
    });

    it("returns with a list of pokemon", async () => {
      const expected = [generateMockPokemon(), generateMockPokemon()];
      when(draftPoolService.getOneForDraftWithId(id)).thenResolve(expected);
      const response = await request.get(uri).send();
      expect(response.body).toEqual(expected);
    });
  });

  describe("GET /drafts/:id/selections", () => {
    const id = generateRandomNumber();
    const uri = `/drafts/${id}/selections`;

    it("returns with 200 OK status", async () => {
      when(draftSelectionService.getAllForDraft(id)).thenResolve([]);
      const response = await request.get(uri).send();
      expect(response.status).toEqual(200);
    });

    it("returns with a list of draft selections", async () => {
      const expected = [
        generateMockDraftSelection(),
        generateMockDraftSelection(),
      ];
      when(draftSelectionService.getAllForDraft(id)).thenResolve(expected);
      const response = await request.get(uri).send();
      expect(response.body).toEqual(expected);
    });
  });

  describe("POST /drafts/:id/selections", () => {
    const id = generateRandomNumber();
    const uri = `/drafts/${id}/selections`;

    it("returns with 200 OK status", async () => {
      when(draftSelectionService.generateForDraft(id)).thenResolve([
        generateMockDraftSelection(),
        generateMockDraftSelection(),
      ]);
      const response = await request.post(uri).send();
      expect(response.status).toEqual(200);
    });

    it("returns with a list of draft selections", async () => {
      const expected = [
        generateMockDraftSelection(),
        generateMockDraftSelection(),
      ];
      when(draftSelectionService.generateForDraft(id)).thenResolve(expected);
      const response = await request.post(uri).send();
      expect(response.body).toEqual(expected);
    });
  });
});
