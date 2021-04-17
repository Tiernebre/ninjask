import Koa from "koa";
import supertest from "supertest";
import { Server } from "http";
import Application from "koa";
import { LeagueRouter } from "./league.router";
import { LeagueService } from "./league.service";
import { object, when } from "testdouble";
import { generateMockLeague } from "./league.mock";

describe("League Router (integration)", () => {
  let app: Application;
  let server: Server;
  let request: supertest.SuperTest<supertest.Test>;
  let leagueService: LeagueService;

  beforeAll(() => {
    app = new Koa();
    leagueService = object<LeagueService>();
    const router = new LeagueRouter(leagueService);
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
      expect(response.status).toEqual(200);
    });

    it("returns with the a league as the response", async () => {
      const expected = [generateMockLeague(), generateMockLeague()];
      when(leagueService.getAll()).thenResolve(expected);
      const response = await request.get(uri).send();
      expect(response.body).toEqual(expected);
    });
  });
});
