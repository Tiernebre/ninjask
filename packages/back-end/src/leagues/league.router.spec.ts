import Koa from "koa";
import supertest from "supertest";
import { Server } from "http";
import Application from "koa";
import { LeagueRouter } from "./league.router";
import { LeagueService } from "./league.service";
import { object, when } from "testdouble";
import {
  generateMockLeague,
  generateMockCreateLeagueRequest,
} from "./league.mock";
import { SessionPayload } from "../session";
import { generateMockSessionPayload } from "../session/session.mock";
import { CREATED, OK } from "http-status";
import bodyParser from "koa-bodyparser";
import { generateRandomNumber } from "../random";
import { SeasonService } from "../season";
import { createSeason } from "../season/season.mock";

describe("League Router", () => {
  let app: Application;
  let server: Server;
  let request: supertest.SuperTest<supertest.Test>;
  let leagueService: LeagueService;
  let seasonService: SeasonService;
  let session: SessionPayload;

  beforeAll(() => {
    app = new Koa();
    leagueService = object<LeagueService>();
    seasonService = object<SeasonService>();
    const router = new LeagueRouter(leagueService, seasonService);
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

  describe("GET /leagues", () => {
    const id = generateRandomNumber();
    const uri = `/leagues/${id}`;

    it("returns with 200 OK status", async () => {
      when(leagueService.getOneById(id)).thenResolve(generateMockLeague());
      const response = await request.get(uri).send();
      expect(response.status).toEqual(OK);
    });

    it("returns with found league in the response body", async () => {
      const league = generateMockLeague();
      when(leagueService.getOneById(id)).thenResolve(league);
      const response = await request.get(uri).send();
      expect(response.body).toEqual(league);
    });
  });

  describe("GET /leagues/:id/seasons", () => {
    const id = generateRandomNumber();
    const uri = `/leagues/${id}/seasons`;

    it("returns with 200 OK status", async () => {
      when(seasonService.getAllForLeague(id)).thenResolve([
        createSeason(),
        createSeason(),
      ]);
      const response = await request.get(uri).send();
      expect(response.status).toEqual(OK);
    });

    it("returns with the found seasons in the response", async () => {
      const seasons = [createSeason(), createSeason()];
      when(seasonService.getAllForLeague(id)).thenResolve(seasons);
      const response = await request.get(uri).send();
      expect(response.body).toEqual(seasons);
    });
  });
});
