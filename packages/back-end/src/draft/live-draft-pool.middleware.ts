import { Context, Middleware } from "koa";
import route from "koa-route";
import KoaWebsocket from "koa-websocket";
import { ContextState } from "../types/state";
import { LiveDraftPoolService } from "./live-draft-pool.service";

export const liveDraftPoolMiddleware = (
  liveDraftPoolService: LiveDraftPoolService,
  app: KoaWebsocket.App<ContextState>
): Middleware =>
  route.all("/drafts/:id/live-pool", (ctx: Context, id: string) => {
    void liveDraftPoolService 
      .getLiveDraftPoolForOneWithId(Number(id))
      .then((draftStatus) => {
        ctx.websocket.send(JSON.stringify(draftStatus));
      });

    ctx.websocket.on("message", (message) => {
      if (message === "NEXT") {
        void liveDraftPoolService 
          .revealNextPokemonInLivePoolForId(Number(id))
          .then((draftStatus) => {
            app.ws.server?.clients.forEach((client) => {
              client.send(JSON.stringify(draftStatus));
            });
          });
      }
    });
  });
