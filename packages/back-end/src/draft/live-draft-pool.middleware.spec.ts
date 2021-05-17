import { liveDraftPoolMiddleware } from './live-draft-pool.middleware'
import { LiveDraftPoolService } from './live-draft-pool.service'
import Koa from "koa";
import KoaWebsocket from "koa-websocket";
import { ContextState } from "../types/state";
import { object, when, verify } from 'testdouble'
import { generateMockLiveDraftStatus } from './draft.mock';
import flushPromises from 'flush-promises';

describe('LiveDraftPoolMiddleware', () => {
  let liveDraftPoolService: LiveDraftPoolService;
  let app: KoaWebsocket.App<ContextState>;
  let middleware: Koa.Middleware;

  beforeEach(() => {
    liveDraftPoolService = object<LiveDraftPoolService>()
    app = object<KoaWebsocket.App<ContextState>>()
    middleware = liveDraftPoolMiddleware(liveDraftPoolService, app)
  })

  it('immediately sends a response of the current live draft pool status when connection is established', async () => {
    const id = 1
    const liveDraftStatus = generateMockLiveDraftStatus()
    when(liveDraftPoolService.getLiveDraftPoolForOneWithId(id)).thenResolve(liveDraftStatus)
    const ctx = object<Koa.Context>()
    ctx.path = `/drafts/${id}/live-pool`
    const next = jest.fn()
    middleware(ctx, next)
    await flushPromises()
    verify(ctx.websocket.send(JSON.stringify(liveDraftStatus)), { times: 1 })
  })
})
