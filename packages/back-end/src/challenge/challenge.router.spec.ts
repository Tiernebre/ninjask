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
import { generateMockDraft } from "../draft/draft.mock";
import { DraftService } from "../draft/draft.service";

describe("Challenge Router (integration)", () => {
  let app: Application;
  let server: Server;
  let request: supertest.SuperTest<supertest.Test>;
  let challengeService: ChallengeService;
  let draftService: DraftService;
  let session: SessionPayload;

  beforeAll(() => {
    app = new Koa();
    challengeService = object<ChallengeService>();
    draftService = object<DraftService>();
    const router = new ChallengeRouter(challengeService, draftService);
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

  describe("GET /challenges/:id/draft", () => {
    const id = 1;
    const uri = `/challenges/${id.toString()}/draft`;

    it("returns with 200 OK status", async () => {
      const draft = generateMockDraft();
      when(draftService.getOneForChallengeId(id)).thenResolve(draft);
      const response = await request.get(uri).send();
      expect(response.status).toEqual(200);
    });

    it("returns with found draft in the response body", async () => {
      const draft = generateMockDraft();
      when(draftService.getOneForChallengeId(id)).thenResolve(draft);
      const response = await request.get(uri).send();
      expect(response.body).toEqual(draft);
    });
  });
});
