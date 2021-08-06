import Koa from "koa";
import supertest from "supertest";
import { Server } from "http";
import Application from "koa";
import { object, when } from "testdouble";
import { SessionPayload } from "../session/session-payload";
import { generateMockSessionPayload } from "../session/session.mock";
import { SeasonService, SeasonRouter } from ".";
import { createSeason, createSeasons } from "./season.mock";
import { OK } from "http-status";
import { generateRandomNumber } from "../random";

describe("Challenge Router", () => {
  let app: Application;
  let server: Server;
  let request: supertest.SuperTest<supertest.Test>;
  let seasonService: SeasonService;
  let session: SessionPayload;

  beforeAll(() => {
    app = new Koa();
    seasonService = object<SeasonService>();
    const router = new SeasonRouter(seasonService);
    session = generateMockSessionPayload();
    app.use((ctx, next) => {
      ctx.state.session = session;
      void next();
    });
    app.use(router.routes());

    server = app.listen();
    request = supertest(server);
  });

  afterAll(() => {
    server.close();
  });

  describe("GET /seasons", () => {
    const uri = "/seasons";

    it("returns 200 OK status", async () => {
      when(seasonService.getAll()).thenResolve(createSeasons());
      const response = await request.get(uri).send();
      expect(response.status).toEqual(OK);
    });

    it("returns with the found seasons in the body", async () => {
      const seasons = createSeasons();
      when(seasonService.getAll()).thenResolve(seasons);
      const response = await request.get(uri).send();
      expect(response.body).toEqual(seasons);
    });
  });

  describe("GET /seasons/:id", () => {
    const id = generateRandomNumber();
    const uri = `/seasons/${id}`;

    it("returns 200 OK status", async () => {
      when(seasonService.getOneById(id)).thenResolve(createSeason());
      const response = await request.get(uri).send();
      expect(response.status).toEqual(OK);
    });

    it("returns with the found seasons in the body", async () => {
      const season = createSeason();
      when(seasonService.getOneById(id)).thenResolve(season);
      const response = await request.get(uri).send();
      expect(response.body).toEqual(season);
    });
  });
});
