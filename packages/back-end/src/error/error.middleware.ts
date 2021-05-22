import { BAD_REQUEST } from "http-status";
import { Context, Next } from "koa";
import { z } from "zod"

export const errorMiddleware = async (ctx: Context, next: Next): Promise<void> => {
  try {
    await next()
  } catch (error) {
    if (error instanceof z.ZodError)  {
      ctx.status = BAD_REQUEST
      ctx.body = error.message
    }
  }
}