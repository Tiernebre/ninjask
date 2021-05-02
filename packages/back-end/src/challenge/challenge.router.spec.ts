import Koa from "koa";
import supertest from "supertest";
import { Server } from "http";
import Application from "koa";
import { ChallengeRouter } from "./challenge.router";
import { ChallengeService } from "./challenge.service";
import { object, when } from "testdouble";
import { SessionPayload } from "../session/session-payload";
import { generateRandomNumber, generateRandomString } from "../random";
import { Challenge } from "./challenge";

describe("Challenge Router (integration)", () => {
  let app: Application;
  let server: Server;
  let request: supertest.SuperTest<supertest.Test>;
  let challengeService: ChallengeService;
  let session: SessionPayload;

  beforeAll(() => {
    app = new Koa();
    challengeService = object<ChallengeService>();
    const router = new ChallengeRouter(challengeService);
    session = {
      userId: generateRandomNumber(),
      accessKey: generateRandomString(),
    };
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

  describe("GET /challenges", () => {
    const uri = "/challenges";

    it("returns with 200 OK status", async () => {
      const challenges: Challenge[] = [
        {
          id: generateRandomNumber(),
          name: generateRandomString(),
          description: generateRandomString(),
          versionId: generateRandomNumber(),
        },
      ];
      when(challengeService.getAllForUserWithId(session.userId)).thenResolve(
        challenges
      );
      const response = await request.get(uri).send();
      expect(response.status).toEqual(200);
    });

    it("returns with found challenges in the response body", async () => {
      const challenges: Challenge[] = [
        {
          id: generateRandomNumber(),
          name: generateRandomString(),
          description: generateRandomString(),
          versionId: generateRandomNumber(),
        },
      ];
      when(challengeService.getAllForUserWithId(session.userId)).thenResolve(
        challenges
      );
      const response = await request.get(uri).send();
      expect(response.body).toEqual(challenges);
    });
  });
});
