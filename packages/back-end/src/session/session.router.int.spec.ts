/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Koa from "koa";
import Application from "koa";
import bodyParser from "koa-bodyparser";
import { Server } from "http";
import supertest from "supertest";
import { object, when } from "testdouble";
import { generateRandomNumber, generateRandomString } from "../random";
import {
  REFRESH_TOKEN_COOKIE_KEY,
  SessionRouter,
} from "../session/session.router";
import { SessionService } from "../session/session.service";
import { CREATED, FORBIDDEN, NO_CONTENT } from "http-status";
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
        generateRandomString(),
        generateRandomNumber()
      );
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
        generateRandomString(),
        generateRandomNumber()
      );
      when(sessionService.createOne(createSessionRequest)).thenResolve(
        expected
      );
      const response = await request.post(uri).send(createSessionRequest);
      expect(response.body).toEqual(expected.toJSON());
      expect(response.body.refreshToken).toBeFalsy();
      const [refreshTokenCookie] = response.headers["set-cookie"];
      expect(refreshTokenCookie).toContain(REFRESH_TOKEN_COOKIE_KEY);
      expect(refreshTokenCookie).toContain("httponly");
    });
  });

  describe("PUT /sessions/current-session", () => {
    const uri = "/sessions/current-session";

    it("returns with 201 CREATED status", async () => {
      const refreshToken = generateRandomString();
      const tokenPayload = new SessionTokenBag(
        generateRandomString(),
        generateRandomString(),
        generateRandomNumber()
      );
      when(sessionService.refreshOne(refreshToken)).thenResolve(tokenPayload);
      const httpRequest = request.put(uri);
      await httpRequest.set("Cookie", [
        `${REFRESH_TOKEN_COOKIE_KEY}=${refreshToken}`,
      ]);
      const response = await httpRequest.send();

      expect(response.status).toEqual(CREATED);
    });

    it("returns with 403 FORBIDDEN status if no cookie is provided", async () => {
      const refreshToken = generateRandomString();
      const tokenPayload = new SessionTokenBag(
        generateRandomString(),
        generateRandomString(),
        generateRandomNumber()
      );
      when(sessionService.refreshOne(refreshToken)).thenResolve(tokenPayload);
      const httpRequest = request.put(uri);
      const response = await httpRequest.send();

      expect(response.status).toEqual(FORBIDDEN);
    });

    it("returns with the a session as the response", async () => {
      const refreshToken = generateRandomString();
      const tokenPayload = new SessionTokenBag(
        generateRandomString(),
        generateRandomString(),
        generateRandomNumber()
      );
      when(sessionService.refreshOne(refreshToken)).thenResolve(tokenPayload);
      const httpRequest = request.put(uri);
      await httpRequest.set("Cookie", [
        `${REFRESH_TOKEN_COOKIE_KEY}=${refreshToken}`,
      ]);
      const response = await httpRequest.send();
      expect(response.body).toEqual(tokenPayload.toJSON());
      expect(response.body.refreshToken).toBeFalsy();
      const [refreshTokenCookie] = response.headers["set-cookie"];
      expect(refreshTokenCookie).toContain(REFRESH_TOKEN_COOKIE_KEY);
      expect(refreshTokenCookie).toContain("httponly");
    });
  });

  describe("DELETE /sessions/current-session", () => {
    const uri = "/sessions/current-session";

    it("returns with 204 NO_CONTENT status", async () => {
      const response = await request.delete(uri).send();
      expect(response.status).toEqual(NO_CONTENT);
    });

    it("returns with the refresh token set to be nulled", async () => {
      const response = await request.delete(uri).send();
      const [refreshTokenCookie] = response.headers["set-cookie"];
      expect(refreshTokenCookie).toContain(`${REFRESH_TOKEN_COOKIE_KEY}=;`);
      expect(refreshTokenCookie).toContain("httponly");
    });
  });
});
