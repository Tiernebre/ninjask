import Koa from "koa";
import supertest from "supertest";
import { Server } from "http";
import Application from "koa";
import { object, when } from "testdouble";
import { SessionPayload } from "../session/session-payload";
import { generateMockSessionPayload } from "../session/session.mock";
import { SeasonService, SeasonRouter } from ".";
import { createSeasons } from "./season.mock";
import { OK } from "http-status";

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
  });
});
