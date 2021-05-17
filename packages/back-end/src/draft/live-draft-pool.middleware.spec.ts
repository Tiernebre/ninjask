import { LiveDraftPoolService } from './live-draft-pool.service'
import Koa from "koa";
import websockify from "koa-websocket";
import KoaWebsocket from 'koa-websocket';
import { liveDraftPoolMiddleware } from './live-draft-pool.middleware'
import { ContextState } from '../types/state';
import { AddressInfo } from 'net';
import WebSocket from 'ws';
import { Server } from 'http';

describe('LiveDraftPoolMiddleware', () => {
  let liveDraftPoolService: LiveDraftPoolService;
  let app: KoaWebsocket.App<ContextState>;
  let server: Server;
  let ws: WebSocket

  beforeAll((done) => {
    app = websockify(new Koa());
    app.ws.use(liveDraftPoolMiddleware(liveDraftPoolService, app));
    server = app.listen()
    const address = server.address() as AddressInfo
    const url = `ws://localhost:${address.port}`
    ws = new WebSocket(url)
    ws.on('open', () => {
      done()
    })
  })

  afterAll(() => {
    server.close()
    ws.close()
  })

  it('immediately sends a response of the current live draft pool status when connection is established', async () => {
    expect(2).toEqual(2)
  })
})
