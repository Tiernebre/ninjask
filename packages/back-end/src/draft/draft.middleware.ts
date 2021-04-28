import { Context, Middleware } from "koa";
import route from "koa-route";
import { DraftService } from "./draft.service";
import KoaWebsocket from "koa-websocket";
import { Logger } from "../logger";

export const liveDraftSocketMiddleware = (
  draftService: DraftService,
  app: KoaWebsocket.App,
  logger: Logger
): Middleware =>
  route.all("/drafts/:id/live-pool", (ctx: Context, id: string) => {
    logger.info("RECEIVED REQUEST");

    void draftService
      .getLiveDraftPoolForOneWithId(Number(id))
      .then((draftStatus) => {
        logger.info(`EMITTING DRAFT STATUS = ${JSON.stringify(draftStatus)}`);
        ctx.websocket.send(JSON.stringify(draftStatus));
      });

    ctx.websocket.on("message", (message) => {
      logger.info("MESSAGE RECEIVED");
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
