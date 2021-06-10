import Koa from "koa";
import supertest from "supertest";
import { Server } from "http";
import Application from "koa";
import { matchers, object, when } from "testdouble";
import { DraftSelectionService } from "../draft-selection";
import {
  generateMockDraftSelection,
  generateMockFinalizeDraftSelectionRequest,
} from "../draft-selection/draft-selection.mock";
import { DraftSelectionRouter } from "./draft-selection.router";
import { SessionPayload } from "../session/session-payload";
import { generateMockSessionPayload } from "../session/session.mock";
import bodyParser from "koa-bodyparser";
import { OK } from "http-status";

describe("Draft Selection Router", () => {
  let app: Application;
  let server: Server;
  let request: supertest.SuperTest<supertest.Test>;
  let draftSelectionService: DraftSelectionService;
  let session: SessionPayload;

  beforeAll(() => {
    app = new Koa();
    draftSelectionService = object<DraftSelectionService>();
    session = generateMockSessionPayload();
    const router = new DraftSelectionRouter(draftSelectionService);
    app.use(bodyParser());
    app.use((ctx, next) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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

  describe("POST /draft-selections/:id", () => {
    const id = 1;
    const uri = `/draft-selections/${id}`;

    it("returns with 200 OK status", async () => {
      const postRequest = generateMockFinalizeDraftSelectionRequest();
      when(
        draftSelectionService.finalizeOneForUser(
          id,
          session.userId,
          matchers.contains(postRequest)
        )
      ).thenResolve(generateMockDraftSelection());
      const response = await request.post(uri).send(postRequest);
      expect(response.status).toEqual(OK);
    });

    it("returns with the finalized draft pick in the response", async () => {
      const postRequest = generateMockFinalizeDraftSelectionRequest();
      const expectedFinalizedDraftSelection = generateMockDraftSelection();
      when(
        draftSelectionService.finalizeOneForUser(
          id,
          session.userId,
          matchers.contains(postRequest)
        )
      ).thenResolve(expectedFinalizedDraftSelection);
      const response = await request.post(uri).send(postRequest);
      expect(response.body).toEqual(expectedFinalizedDraftSelection);
    });
  });
});
