import httpStatus, {
  BAD_REQUEST,
  CONFLICT,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  UNAUTHORIZED,
} from "http-status";
import { Context, Next } from "koa";
import { z } from "zod";
import { NotFoundError, UnauthorizedError, ForbiddenError } from ".";
import { BadRequestError } from "./bad-request-error";
import { ConflictError } from "./conflict-error";
import { ErrorResponse } from "./error-response";

const parseJson = (json: string): Record<string, unknown> | null => {
  try {
    return JSON.parse(json) as Record<string, unknown>
  } catch {
    return null
  }
}

const formatErrorMessage = (
  ctx: Context,
  error: Error
): ErrorResponse => ({
  status: httpStatus[ctx.status] as string,
  code: ctx.status,
  message: parseJson(error.message) || error.message,
})

export const errorMiddleware = async (
  ctx: Context,
  next: Next
): Promise<void> => {
  try {
    await next();
  } catch (error) {
    if (error instanceof z.ZodError || error instanceof BadRequestError) {
      ctx.status = BAD_REQUEST;
    } else if (error instanceof NotFoundError) {
      ctx.status = NOT_FOUND;
    } else if (error instanceof UnauthorizedError) {
      ctx.status = UNAUTHORIZED;
    } else if (error instanceof ForbiddenError) {
      ctx.status = FORBIDDEN;
    } else if (error instanceof ConflictError) {
      ctx.status = CONFLICT;
    } else {
      ctx.status = INTERNAL_SERVER_ERROR;
    }

    if (error instanceof Error) {
      ctx.body = formatErrorMessage(ctx, error)
    }
  }
};
