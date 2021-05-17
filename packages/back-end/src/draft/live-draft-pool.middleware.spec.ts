import { LiveDraftPoolService } from "./live-draft-pool.service";
import Koa from "koa";
import websockify from "koa-websocket";
import KoaWebsocket from "koa-websocket";
import { liveDraftPoolMiddleware } from "./live-draft-pool.middleware";
import { ContextState } from "../types/state";
import { AddressInfo } from "net";
import WebSocket from "ws";
import { Server } from "http";
import { object, reset, verify, when } from "testdouble";
import { generateMockLiveDraftStatus } from "./draft.mock";

describe("LiveDraftPoolMiddleware", () => {
  let liveDraftPoolService: LiveDraftPoolService;
  let app: KoaWebsocket.App<ContextState>;
  let server: Server;
  let ws: WebSocket;
  const id = 1;
  let url: string;

  beforeAll(() => {
    liveDraftPoolService = object<LiveDraftPoolService>();
    app = websockify(new Koa());
    app.ws.use(liveDraftPoolMiddleware(liveDraftPoolService, app));
    server = app.listen();
    const address = server.address() as AddressInfo;
    url = `ws://localhost:${address.port}/drafts/${id}/live-pool`;
  });

  afterAll(() => {
    server.close();
  });

  afterEach(() => {
    ws.close();
    reset();
  });

  it("immediately sends a response of the current live draft pool status when connection is established", (done) => {
    const liveDraftPool = generateMockLiveDraftStatus();
    when(liveDraftPoolService.getLiveDraftPoolForOneWithId(id)).thenResolve(
      liveDraftPool
    );
    ws = new WebSocket(url);
    ws.on("open", () => {
      ws.send("hello");
    });
    ws.on("message", (data) => {
      expect(data).toEqual(JSON.stringify(liveDraftPool));
      done();
    });
  });

  it("advances to the next pokemon in the live draft pool when the NEXT message is received", (done) => {
    const liveDraftPool = generateMockLiveDraftStatus();
    const newLiveDraftPool = generateMockLiveDraftStatus();
    when(liveDraftPoolService.getLiveDraftPoolForOneWithId(id)).thenResolve(
      liveDraftPool
    );
    when(liveDraftPoolService.revealNextPokemonInLivePoolForId(id)).thenResolve(
      newLiveDraftPool
    );
    ws = new WebSocket(url);
    let numberOfMessages = 0;
    ws.on("open", () => {
      ws.send("NEXT");
    });
    ws.on("message", (data) => {
      numberOfMessages++;
      if (numberOfMessages === 2) {
        expect(data).toEqual(JSON.stringify(newLiveDraftPool));
        done();
      }
    });
  });

  it("does nothing if an unsupported message is received", (done) => {
    const liveDraftPool = generateMockLiveDraftStatus();
    when(liveDraftPoolService.getLiveDraftPoolForOneWithId(id)).thenResolve(
      liveDraftPool
    );
    ws = new WebSocket(url);
    ws.on("open", () => {
      for (let i = 0; i++; i < 3) {
        ws.send(`Some Random Message ${i}. Hello there!`);
      }
    });
    ws.on("message", () => {
      verify(liveDraftPoolService.revealNextPokemonInLivePoolForId(id), {
        times: 0,
      });
      done();
    });
  });
});
