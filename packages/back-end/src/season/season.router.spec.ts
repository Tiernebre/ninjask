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
import { ChallengeService } from "../challenge";
import { generateMockChallengeDto } from "../challenge/challenge.mock";

describe("Challenge Router", () => {
  let app: Application;
  let server: Server;
  let request: supertest.SuperTest<supertest.Test>;
  let seasonService: SeasonService;
  let session: SessionPayload;
  let challengeService: ChallengeService;

  beforeAll(() => {
    app = new Koa();
    seasonService = object<SeasonService>();
    challengeService = object<ChallengeService>();
    const router = new SeasonRouter(seasonService, challengeService);
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

  describe("GET /seasons/:id/challenges", () => {
    const id = generateRandomNumber();
    const uri = `/seasons/${id}/challenges`;

    it("returns 200 OK status", async () => {
      when(challengeService.getAllForSeason(id)).thenResolve([
        generateMockChallengeDto(),
        generateMockChallengeDto(),
      ]);
      const response = await request.get(uri).send();
      expect(response.status).toEqual(OK);
    });

    it("returns with the found seasons in the body", async () => {
      const challenges = [
        generateMockChallengeDto(),
        generateMockChallengeDto(),
      ];
      when(challengeService.getAllForSeason(id)).thenResolve(challenges);
      const response = await request.get(uri).send();
      expect(response.body).toEqual(challenges);
    });
  });
});
