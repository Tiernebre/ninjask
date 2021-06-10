import httpStatus, {
  BAD_REQUEST,
  CONFLICT,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  UNAUTHORIZED,
} from "http-status";
import { DefaultContext, Next, ParameterizedContext } from "koa";
import { z } from "zod";
import { NotFoundError, UnauthorizedError, ForbiddenError } from ".";
import { ContextState } from "../types/state";
import { BadRequestError } from "./bad-request-error";
import { ConflictError } from "./conflict-error";
import { ErrorResponse } from "./error-response";

const parseJson = (json: string): Record<string, unknown> | null => {
  try {
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return null;
  }
};

const getErrorMessage = (
  ctx: ParameterizedContext<ContextState, DefaultContext, ErrorResponse>,
  error: Error
): Record<string, unknown> | string => {
  if (ctx.status < INTERNAL_SERVER_ERROR) {
    // Any 4xx level error is safe to be clear and concise about.
    return parseJson(error.message) || error.message;
  } else {
    // We should absolutely _NOT_ communicate publicly what caused a 500
    // level error, this can expose sensitive or insecure information.
    return httpStatus[ctx.status] as string;
  }
};

const formatErrorMessage = (
  ctx: ParameterizedContext<ContextState, DefaultContext, ErrorResponse>,
  error: Error
): ErrorResponse => ({
  status: httpStatus[ctx.status] as string,
  code: ctx.status,
  message: getErrorMessage(ctx, error),
});

export const errorMiddleware = async (
  ctx: ParameterizedContext<ContextState, DefaultContext, ErrorResponse>,
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
      ctx.body = formatErrorMessage(ctx, error);
    } else {
      ctx.status = INTERNAL_SERVER_ERROR;
      ctx.body = formatErrorMessage(ctx, new Error());
    }
  }
};
