/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Koa from "koa";
import Application from "koa";
import bodyParser from "koa-bodyparser";
import { Server } from "http";
import supertest from "supertest";
import { object, when } from "testdouble";
import { generateRandomString } from "../random";
import { REFRESH_TOKEN_COOKIE_KEY, SessionRouter } from "../session/session.router";
import { SessionService } from "../session/session.service";
import { CREATED } from "http-status";
import { SessionTokenBag } from "./session-token-bag";

describe("Session Router (integration)", () => {
  let app: Application;
  let server: Server;
  let request: supertest.SuperTest<supertest.Test>;
  let sessionService: SessionService;

  beforeAll(() => {
    app = new Koa();
    app.use(bodyParser());
    sessionService = object<SessionService>();
    const router = new SessionRouter(sessionService);
    app.use(router.routes());

    server = app.listen();

    request = supertest(server);
  });

  afterAll(() => {
    server.close();
  });

  describe("POST /sessions", () => {
    const uri = "/sessions";

    it("returns with 201 CREATED status", async () => {
      const createSessionRequest = {
        accessKey: generateRandomString(),
        password: generateRandomString(),
      };
      const tokenPayload = new SessionTokenBag(
        generateRandomString(),
        generateRandomString()
      )
      when(sessionService.createOne(createSessionRequest)).thenResolve(
        tokenPayload
      );
      const response = await request.post(uri).send(createSessionRequest);
      expect(response.status).toEqual(CREATED);
    });

    it("returns with the a session as the response", async () => {
      const createSessionRequest = {
        accessKey: generateRandomString(),
        password: generateRandomString(),
      };
      const expected = new SessionTokenBag(
        generateRandomString(),
        generateRandomString()
      )
      when(sessionService.createOne(createSessionRequest)).thenResolve(
        expected
      );
      const response = await request.post(uri).send(createSessionRequest);
      expect(response.body).toEqual(expected.toJSON());
      expect(response.body.refreshToken).toBeFalsy()
      const [refreshTokenCookie] = response.headers['set-cookie']
      expect(refreshTokenCookie).toContain(REFRESH_TOKEN_COOKIE_KEY)
      expect(refreshTokenCookie).toContain('httponly')
    });
  });
});
