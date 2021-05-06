import { Context, Middleware } from "koa";
import route from "koa-route";
import { DraftService } from "./draft.service";
import KoaWebsocket from "koa-websocket";
import { ContextState } from "../types/state";

export const liveDraftSocketMiddleware = (
  draftService: DraftService,
  app: KoaWebsocket.App<ContextState>
): Middleware =>
  route.all("/drafts/:id/live-pool", (ctx: Context, id: string) => {
    void draftService
      .getLiveDraftPoolForOneWithId(Number(id))
      .then((draftStatus) => {
        ctx.websocket.send(JSON.stringify(draftStatus));
      });

    ctx.websocket.on("message", (message) => {
      if (message === "NEXT") {
        void draftService
          .revealNextPokemonInLivePoolForId(Number(id))
          .then((draftStatus) => {
            app.ws.server?.clients.forEach((client) => {
              client.send(JSON.stringify(draftStatus));
            });
          });
      }
    });
  });
