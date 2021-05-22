import {
  BAD_REQUEST,
  FORBIDDEN,
  IM_A_TEAPOT,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  UNAUTHORIZED,
} from "http-status";
import { Context, Next } from "koa";
import { z } from "zod";
import { NotFoundError, UnauthorizedError } from ".";
import { ForbiddenError } from "./forbidden-error.";

export const errorMiddleware = async (
  ctx: Context,
  next: Next
): Promise<void> => {
  try {
    await next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      ctx.body = error.message;
      ctx.status = BAD_REQUEST;
    } else if (error instanceof NotFoundError) {
      ctx.status = NOT_FOUND;
    } else if (error instanceof UnauthorizedError) {
      ctx.status = UNAUTHORIZED;
    } else if (error instanceof ForbiddenError) {
      ctx.status = FORBIDDEN;
    } else {
      ctx.status = IM_A_TEAPOT;
    }
  }
};
