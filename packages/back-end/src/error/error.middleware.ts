import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND, UNAUTHORIZED } from "http-status";
import { Context, Next } from "koa";
import { z } from "zod";
import { NotFoundError, UnauthorizedError } from ".";

export const errorMiddleware = async (
  ctx: Context,
  next: Next
): Promise<void> => {
  try {
    await next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      ctx.status = BAD_REQUEST;
      ctx.body = error.message;
    } else if (error instanceof NotFoundError) {
      ctx.status = NOT_FOUND;
      ctx.body = null;
    } else if (error instanceof UnauthorizedError) {
      ctx.status = UNAUTHORIZED;
      ctx.body = null;
    } else {
      ctx.status = INTERNAL_SERVER_ERROR;
      ctx.body = null;
      throw error;
    }
  }
};
