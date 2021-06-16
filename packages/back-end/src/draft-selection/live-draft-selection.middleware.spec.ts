import Koa from "koa";
import websockify from "koa-websocket";
import KoaWebsocket from "koa-websocket";
import { ContextState } from "../types/state";
import { AddressInfo } from "net";
import WebSocket from "ws";
import { Server } from "http";
import { matchers, object, reset, when } from "testdouble";
import {
  LiveDraftSelectionMessage,
  LiveDraftSelectionMessageType,
  liveDraftSelectionMiddleware,
} from "./live-draft-selection.middleware";
import { LiveSessionService } from "../live-session";
import { DraftSelectionService } from "./draft-selection.service";
import { Logger } from "../logger";
import { v4 as uuid } from "uuid";
import { generateRandomNumber } from "../random";
import {
  generateMockDraftSelection,
  generateMockDraftSelections,
} from "./draft-selection.mock";

describe("live-draft-selection-middleware", () => {
  let app: KoaWebsocket.App<ContextState>;
  let server: Server;
  let ws: WebSocket;
  const id = 1;
  let url: string;
  let liveSessionService: LiveSessionService;
  let draftSelectionService: DraftSelectionService;

  beforeAll(() => {
    app = websockify(new Koa());
    liveSessionService = object<LiveSessionService>();
    draftSelectionService = object<DraftSelectionService>();
    app.ws.use(
      liveDraftSelectionMiddleware(
        liveSessionService,
        draftSelectionService,
        object<Logger>()
      )
    );
    server = app.listen();
    const address = server.address() as AddressInfo;
    url = `ws://localhost:${address.port}/drafts/${id}/live-selections`;
  });

  afterAll(() => {
    server.close();
  });

  afterEach(() => {
    ws.close();
    reset();
  });

  it("closes the websocket connection if an invalid ticket is provided", (done) => {
    const ticket = uuid();
    const urlToUse = `${url}?ticket=${ticket}`;
    when(liveSessionService.redeemOne(ticket)).thenReject(
      new Error("Invalid Ticket")
    );
    ws = new WebSocket(urlToUse);
    ws.on("open", () => {
      ws.send("NEXT");
    });
    ws.on("message", (message: string) => {
      expect(message).toEqual(
        "Could not connect to the live session for draft selection."
      );
      done();
    });
  });

  it("processes a finalize draft selection message for a valid ticket", (done) => {
    const ticket = uuid();
    const urlToUse = `${url}?ticket=${ticket}`;
    const userId = generateRandomNumber();
    const draftPokemonId = generateRandomNumber();
    const selectionId = generateRandomNumber();
    const message: LiveDraftSelectionMessage = {
      type: LiveDraftSelectionMessageType.FINALIZE_SELECTION,
      selectionId,
      draftPokemonId,
    };
    when(liveSessionService.redeemOne(ticket)).thenResolve({ userId });
    when(
      draftSelectionService.finalizeOneForUser(
        matchers.anything(),
        matchers.anything(),
        matchers.anything()
      )
    ).thenResolve(generateMockDraftSelection());
    const expectedDraftSelections = generateMockDraftSelections();
    when(draftSelectionService.getAllForDraft(id)).thenResolve(
      expectedDraftSelections
    );
    ws = new WebSocket(urlToUse);
    ws.on("open", () => {
      ws.send(JSON.stringify(message));
    });
    ws.on("message", (message: string) => {
      expect(message).toEqual(JSON.stringify(expectedDraftSelections));
      done();
    });
  });
});
