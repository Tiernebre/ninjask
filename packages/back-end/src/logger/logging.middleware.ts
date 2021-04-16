import { Context, Next } from "koa";
import { Logger } from "./logger";

export const loggingMiddleware = (
  logger: Logger
) => async (ctx: Context, next: Next): Promise<void> => {
  logger.info(`Received ${ctx.method} Request.`)
  try {
    await next()
    logger.info(`Finished ${ctx.method} Request.`)
  } catch (error) {
    logger.error(error)
  }
}
