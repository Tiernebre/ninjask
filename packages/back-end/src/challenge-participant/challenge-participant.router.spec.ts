import Koa from "koa";
import supertest from "supertest";
import { Server } from "http";
import Application from "koa";
import { ChallengeParticipantsRouter } from "./challenge-participant.router";
import { object, when } from "testdouble";
import { SessionPayload } from "../session/session-payload";
import { generateMockSessionPayload } from "../session/session.mock";
import { ChallengeParticipantService } from "./challenge-participant.service";
import { generateMockChallengeParticipant } from "./challenge-participant.mock";
import { generateRandomNumber } from "../random";
import { OK } from "http-status";
import bodyParser from "koa-bodyparser";

describe("ChallengeParticipantRouter", () => {
  let app: Application;
  let server: Server;
  let request: supertest.SuperTest<supertest.Test>;
  let session: SessionPayload;
  let challengeParticipantService: ChallengeParticipantService;

  beforeAll(() => {
    app = new Koa();
    challengeParticipantService = object<ChallengeParticipantService>();
    const router = new ChallengeParticipantsRouter(challengeParticipantService);
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

  describe("PATCH /challenge-participants/:id", () => {
    const id = generateRandomNumber();
    const uri = `/challenge-participants/${id}`;

    it("returns with 200 OK status", async () => {
      const completionTimeHour = generateRandomNumber();
      const completionTimeMinutes = generateRandomNumber();
      const updateRequest = {
        completionTimeHour,
        completionTimeMinutes,
      };
      const expectedRequest = {
        completionTimeHour,
        completionTimeMinutes,
        id,
        userId: session.userId,
      };
      when(challengeParticipantService.updateOne(expectedRequest)).thenResolve(
        generateMockChallengeParticipant()
      );
      const response = await request.patch(uri).send(updateRequest);
      expect(response.status).toEqual(OK);
    });

    it("returns with the updated challenge participant", async () => {
      const completionTimeHour = generateRandomNumber();
      const completionTimeMinutes = generateRandomNumber();
      const updateRequest = {
        completionTimeHour,
        completionTimeMinutes,
      };
      const expectedRequest = {
        completionTimeHour,
        completionTimeMinutes,
        id,
        userId: session.userId,
      };
      const updatedParticipant = generateMockChallengeParticipant();
      when(challengeParticipantService.updateOne(expectedRequest)).thenResolve(
        updatedParticipant
      );
      const response = await request.patch(uri).send(updateRequest);
      expect(response.body).toEqual(updatedParticipant);
    });
  });
});
