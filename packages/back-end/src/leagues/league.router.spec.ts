import Koa from "koa";
import supertest from "supertest";
import { Server } from "http";
import Application from "koa";
import { LeagueRouter } from "./league.router";
import { LeagueService } from "./league.service";
import { matchers, object, when } from "testdouble";
import {
  generateMockLeague,
  generateMockCreateLeagueRequest,
} from "./league.mock";
import { SessionPayload } from "../session";
import { generateMockSessionPayload } from "../session/session.mock";
import { CREATED, OK } from "http-status";
import bodyParser from "koa-bodyparser";

describe("League Router", () => {
  let app: Application;
  let server: Server;
  let request: supertest.SuperTest<supertest.Test>;
  let leagueService: LeagueService;
  let session: SessionPayload;

  beforeAll(() => {
    app = new Koa();
    leagueService = object<LeagueService>();
    const router = new LeagueRouter(leagueService);
    session = generateMockSessionPayload();
    app.use(bodyParser());
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

  describe("GET /leagues", () => {
    const uri = "/leagues";

    it("returns with 200 OK status", async () => {
      when(leagueService.getAll()).thenResolve([
        generateMockLeague(),
        generateMockLeague(),
      ]);
      const response = await request.get(uri).send();
      expect(response.status).toEqual(OK);
    });

    it("returns with the a league as the response", async () => {
      const expected = [generateMockLeague(), generateMockLeague()];
      when(leagueService.getAll()).thenResolve(expected);
      const response = await request.get(uri).send();
      expect(response.body).toEqual(expected);
    });
  });

  describe("POST /leagues", () => {
    const uri = "/leagues";

    it("returns with 201 CREATED status", async () => {
      const createLeagueRequest = generateMockCreateLeagueRequest();
      when(
        leagueService.createOne(createLeagueRequest, session.userId)
      ).thenResolve(generateMockLeague());
      const response = await request.post(uri).send(createLeagueRequest);
      expect(response.status).toEqual(CREATED);
    });

    it("returns with the created league in the response body", async () => {
      const createLeagueRequest = generateMockCreateLeagueRequest();
      const expectedLeague = generateMockLeague();
      when(
        leagueService.createOne(createLeagueRequest, session.userId)
      ).thenResolve(expectedLeague);
      const response = await request.post(uri).send(createLeagueRequest);
      expect(response.body).toEqual(expectedLeague);
    });
  });
});
