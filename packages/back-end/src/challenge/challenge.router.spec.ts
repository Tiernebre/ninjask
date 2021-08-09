import Koa from "koa";
import supertest from "supertest";
import { Server } from "http";
import Application from "koa";
import { ChallengeRouter } from "./challenge.router";
import { ChallengeService } from "./challenge.service";
import { matchers, object, when, verify } from "testdouble";
import { SessionPayload } from "../session/session-payload";
import { Challenge } from "./challenge";
import { generateMockDraft } from "../draft/draft.mock";
import { DraftService } from "../draft/draft.service";
import {
  generateCreateChallengeRequestDto,
  generateMockChallengeDto,
  generateMockChallengeResults,
} from "./challenge.mock";
import { generateMockSessionPayload } from "../session/session.mock";
import { generateRandomNumber } from "../random";
import { CREATED, NO_CONTENT, OK } from "http-status";
import { ChallengeParticipantService } from "../challenge-participant/challenge-participant.service";
import { generateMockChallengeParticipant } from "../challenge-participant/challenge-participant.mock";
import bodyParser from "koa-bodyparser";

describe("Challenge Router (integration)", () => {
  let app: Application;
  let server: Server;
  let request: supertest.SuperTest<supertest.Test>;
  let challengeService: ChallengeService;
  let draftService: DraftService;
  let session: SessionPayload;
  let challengeParticipantService: ChallengeParticipantService;

  beforeAll(() => {
    app = new Koa();
    challengeService = object<ChallengeService>();
    draftService = object<DraftService>();
    challengeParticipantService = object<ChallengeParticipantService>();
    const router = new ChallengeRouter(
      challengeService,
      draftService,
      challengeParticipantService
    );
    session = generateMockSessionPayload();
    app.use(bodyParser());
    app.use(async (ctx, next) => {
      ctx.state.session = session;
      await next();
    });
    app.use(router.routes());

    server = app.listen();

    request = supertest(server);
  });

  afterAll(() => {
    server.close();
  });

  describe("GET /me/challenges", () => {
    const uri = "/me/challenges";

    it("returns with 200 OK status", async () => {
      const challenges: Challenge[] = [generateMockChallengeDto()];
      when(challengeService.getAllForUserWithId(session.userId)).thenResolve(
        challenges
      );
      const response = await request.get(uri).send();
      expect(response.status).toEqual(200);
    });

    it("returns with found challenges in the response body", async () => {
      const challenges: Challenge[] = [generateMockChallengeDto()];
      when(challengeService.getAllForUserWithId(session.userId)).thenResolve(
        challenges
      );
      const response = await request.get(uri).send();
      expect(response.body).toEqual(challenges);
    });
  });

  describe("GET /challenges", () => {
    const uri = "/challenges";

    it("returns with 200 OK status", async () => {
      const challenges: Challenge[] = [generateMockChallengeDto()];
      when(challengeService.getAll()).thenResolve(challenges);
      const response = await request.get(uri).send();
      expect(response.status).toEqual(200);
    });

    it("returns with found challenges in the response body", async () => {
      const challenges: Challenge[] = [generateMockChallengeDto()];
      when(challengeService.getAll()).thenResolve(challenges);
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

  describe("GET /challenges/:id", () => {
    const id = 5;
    const uri = `/challenges/${id}`;

    it("returns with 200 OK status", async () => {
      const challenge = generateMockChallengeDto();
      when(challengeService.getOneById(id)).thenResolve(challenge);
      const response = await request.get(uri).send();
      expect(response.status).toEqual(200);
    });

    it("returns with found draft in the response body", async () => {
      const challenge = generateMockChallengeDto();
      when(challengeService.getOneById(id)).thenResolve(challenge);
      const response = await request.get(uri).send();
      expect(response.body).toEqual(challenge);
    });
  });

  describe("POST /challenges/:id/participants", () => {
    const id = generateRandomNumber();
    const uri = `/challenges/${id}/participants`;

    it("returns with 201 CREATED status", async () => {
      when(
        challengeParticipantService.createOne(session.userId, id)
      ).thenResolve(generateMockChallengeParticipant());
      const response = await request.post(uri).send();
      expect(response.status).toEqual(CREATED);
    });

    it("returns with created participant in the response body", async () => {
      const challengeParticipant = generateMockChallengeParticipant();
      when(
        challengeParticipantService.createOne(session.userId, id)
      ).thenResolve(challengeParticipant);
      const response = await request.post(uri).send();
      expect(response.body).toEqual(challengeParticipant);
    });
  });

  describe("GET /challenges/:id/results", () => {
    const id = 1;
    const uri = `/challenges/${id.toString()}/results`;

    it("returns with 200 OK status", async () => {
      when(
        challengeParticipantService.getCompletedResultsForChallengeInOrder(id)
      ).thenResolve(generateMockChallengeResults());
      const response = await request.get(uri).send();
      expect(response.status).toEqual(200);
    });

    it("returns with results in the response body", async () => {
      const results = generateMockChallengeResults();
      when(
        challengeParticipantService.getCompletedResultsForChallengeInOrder(id)
      ).thenResolve(results);
      const response = await request.get(uri).send();
      expect(response.body).toEqual(results);
    });
  });

  describe("GET /challenges/:id/participants/me", () => {
    const id = generateRandomNumber();
    const uri = `/challenges/${id}/participants/me`;

    it("returns with 200 OK status", async () => {
      when(
        challengeParticipantService.getOneForUserOnChallenge(session.userId, id)
      ).thenResolve(generateMockChallengeParticipant());
      const response = await request.get(uri).send();
      expect(response.status).toEqual(OK);
    });

    it("returns with found participant in the response body", async () => {
      const challengeParticipant = generateMockChallengeParticipant();
      when(
        challengeParticipantService.getOneForUserOnChallenge(session.userId, id)
      ).thenResolve(challengeParticipant);
      const response = await request.get(uri).send();
      expect(response.body).toEqual(challengeParticipant);
    });
  });

  describe("DELETE /challenges/:id/participants/me", () => {
    const id = generateRandomNumber();
    const uri = `/challenges/${id}/participants/me`;

    it("returns with 200 OK status", async () => {
      when(
        challengeParticipantService.removeOneForChallenge(session.userId, id)
      ).thenResolve(generateMockChallengeParticipant());
      const response = await request.delete(uri).send();
      expect(response.status).toEqual(OK);
    });

    it("returns with found participant in the response body", async () => {
      const challengeParticipant = generateMockChallengeParticipant();
      when(
        challengeParticipantService.removeOneForChallenge(session.userId, id)
      ).thenResolve(challengeParticipant);
      const response = await request.delete(uri).send();
      expect(response.body).toEqual(challengeParticipant);
    });
  });

  describe("DELETE /challenges/:id", () => {
    const id = 5;
    const uri = `/challenges/${id}`;

    it("returns with 204 NO_CONTENT status", async () => {
      when(challengeService.deleteOneById(id, session.userId)).thenResolve();
      const response = await request.delete(uri).send();
      expect(response.status).toEqual(NO_CONTENT);
    });
  });

  describe("POST /challenges", () => {
    const uri = "/challenges";

    it("returns with 201 CREATED status", async () => {
      const requestDto = generateCreateChallengeRequestDto();
      const createdChallenge = generateMockChallengeDto();
      when(challengeService.createOne(requestDto, session.userId)).thenResolve(
        createdChallenge
      );
      const response = await request.post(uri).send(requestDto);
      verify(
        draftService.createOne({
          challengeId: createdChallenge.id,
          extraPoolSize: 10,
        })
      );
      verify(
        challengeParticipantService.createOne(
          session.userId,
          createdChallenge.id
        )
      );
      expect(response.status).toEqual(CREATED);
    });

    it("returns with the created challenge in the response body", async () => {
      const requestDto = generateCreateChallengeRequestDto();
      const createdChallenge = generateMockChallengeDto();
      when(challengeService.createOne(requestDto, session.userId)).thenResolve(
        createdChallenge
      );
      const response = await request.post(uri).send(requestDto);
      verify(
        draftService.createOne({
          challengeId: createdChallenge.id,
          extraPoolSize: 10,
        })
      );
      verify(
        challengeParticipantService.createOne(
          session.userId,
          createdChallenge.id
        )
      );
      expect(response.body).toEqual(createdChallenge);
    });
  });
});
