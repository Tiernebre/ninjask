import { Context } from "koa";
import { Logger } from "../logger";

export const liveDraftSocketMiddleware = (
  logger: Logger,
) => (ctx: Context): void => {
  logger.info(`WebSocket Request Received for ctx = ${JSON.stringify(ctx)}`)

  ctx.websocket.on("message", (message: string) => {
    logger.info(`Received WebSocket Message ${message}`);
    switch (message.toUpperCase()) {
      case "NEXT":
        logger.info(`NEXT called for ${ctx.url}`)
        break;
      default:
        logger.info(
          `Message received was unparseable -- skipping doing any logic.`
        );
    }
  });
};
