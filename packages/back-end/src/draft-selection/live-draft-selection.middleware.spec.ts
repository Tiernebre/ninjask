
import Koa from "koa";
import websockify from "koa-websocket";
import KoaWebsocket from "koa-websocket";
import { ContextState } from "../types/state";
import { AddressInfo } from "net";
import WebSocket from "ws";
import { Server } from "http";
import { object, reset, verify, when } from "testdouble";
import { liveDraftSelectionMiddleware } from './live-draft-selection.middleware'
import { LiveSessionService } from "../live-session";
import { DraftSelectionService } from "./draft-selection.service";
import { Logger } from "../logger";
import { v4 as uuid } from 'uuid';

describe('live-draft-selection-middleware', () => {
  let app: KoaWebsocket.App<ContextState>;
  let server: Server;
  let ws: WebSocket;
  const id = 1;
  let url: string;
  let liveSessionService: LiveSessionService;
  let draftSelectionService: DraftSelectionService;

  beforeAll(() => {
    app = websockify(new Koa());
    liveSessionService = object<LiveSessionService>()
    draftSelectionService = object<DraftSelectionService>()
    app.ws.use(liveDraftSelectionMiddleware(liveSessionService, draftSelectionService, object<Logger>()));
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
    const ticket = uuid()
    const urlToUse = `${url}?ticket=${ticket}`
    when(liveSessionService.redeemOne(ticket)).thenReject(new Error('Invalid Ticket'))
    ws = new WebSocket(urlToUse);
    ws.on("open", () => {
      ws.send("NEXT");
    });
    ws.on("message", (message: string) => {
      expect(message).toEqual('Could not connect to the live session for draft selection.')
      done()
    })
  })
})