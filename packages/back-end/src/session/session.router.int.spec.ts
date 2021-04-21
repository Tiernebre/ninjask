import Koa from "koa";
import Application from "koa";
import bodyParser from 'koa-bodyparser'
import { Server } from "http";
import supertest from "supertest";
import { object, when } from "testdouble";
import { generateRandomString } from "../random";
import { SessionRouter } from "../session/session.router";
import { SessionService } from "../session/session.service";
import { CREATED } from 'http-status'
import { SessionTokenBag } from "./session-token-bag";

describe("Session Router (integration)", () => {
  let app: Application;
  let server: Server;
  let request: supertest.SuperTest<supertest.Test>;
  let sessionService: SessionService;

  beforeAll(() => {
    app = new Koa();
    app.use(bodyParser())
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
        password: generateRandomString()
      }
      const tokenPayload: SessionTokenBag = {
        accessToken: generateRandomString()
      }
      when(sessionService.createOne(createSessionRequest)).thenResolve(tokenPayload)
      const response = await request.post(uri).send(createSessionRequest);
      expect(response.status).toEqual(CREATED);
    });

    it("returns with the a session as the response", async () => {
      const createSessionRequest = {
        accessKey: generateRandomString(),
        password: generateRandomString()
      }
      const expected: SessionTokenBag = {
        accessToken: generateRandomString()
      }
      when(sessionService.createOne(createSessionRequest)).thenResolve(expected)
      const response = await request.post(uri).send(createSessionRequest);
      expect(response.body).toEqual(expected);
    });
  });
});
