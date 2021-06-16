import { Context, Middleware } from "koa";
import route from "koa-route";
import KoaWebsocket from "koa-websocket";
import { LiveSessionService } from "../live-session";
import { ContextState } from "../types/state";
import { DraftSelectionService } from "./draft-selection.service";

export const liveDraftSelectionMiddleware = (
  liveSessionService: LiveSessionService,
  draftSelectionService: DraftSelectionService,
  app: KoaWebsocket.App<ContextState>
): Middleware =>
  route.all("/drafts/:id/live-selections", (ctx: Context, id: string) => {
    ctx.websocket.send('FOO')
  });
