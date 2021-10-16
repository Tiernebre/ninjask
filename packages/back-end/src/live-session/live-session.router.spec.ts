import Koa from "koa";
import Application from "koa";
import bodyParser from "koa-bodyparser";
import { Server } from "http";
import supertest from "supertest";
import { object, when } from "testdouble";
import { LiveSessionService, LiveSessionRouter } from ".";
import { generateMockSessionPayload } from "../session/session.mock";
import { SessionPayload } from "../session";
import { generateMockLiveSession } from "./live-session.mock";
import { CREATED } from "http-status";

describe("Live Session Router (integration)", () => {
  let app: Application;
  let server: Server;
  let request: supertest.SuperTest<supertest.Test>;
  let liveSessionService: LiveSessionService;
  let session: SessionPayload;

  beforeAll(() => {
    app = new Koa();
    app.use(bodyParser());
    liveSessionService = object<LiveSessionService>();
    const router = new LiveSessionRouter(liveSessionService);
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

  describe("POST /live-sessions", () => {
    const uri = "/live-sessions";

    it("returns with 201 CREATED status", async () => {
      when(liveSessionService.createOne(session)).thenResolve(
        generateMockLiveSession()
      );
      const response = await request.post(uri).send();
      expect(response.status).toEqual(CREATED);
    });

    it("returns with the created live session in the response body", async () => {
      const expected = generateMockLiveSession();
      when(liveSessionService.createOne(session)).thenResolve(expected);
      const response = await request.post(uri).send();
      expect(response.body).toEqual(expected);
    });
  });
});
