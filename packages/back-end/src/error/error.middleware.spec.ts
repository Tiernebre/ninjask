import httpStatus, {
  BAD_REQUEST,
  CONFLICT,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  OK,
  UNAUTHORIZED,
} from "http-status";
import { DefaultContext, ParameterizedContext } from "koa";
import { object } from "testdouble";
import { errorMiddleware } from "./error.middleware";
import { z } from "zod";
import {
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  BadRequestError,
  ConflictError,
} from ".";
import { ErrorResponse } from "./error-response";
import { ContextState } from "../types/state";

describe("errorMiddleware", () => {
  let ctx: ParameterizedContext<ContextState, DefaultContext, ErrorResponse>

  beforeEach(() => {
    ctx = object<ParameterizedContext<ContextState, DefaultContext, ErrorResponse>>();
    ctx.status = OK;
  })

  it("does nothing if next is successful", async () => {
    await errorMiddleware(ctx, jest.fn());
    expect(ctx.status).toEqual(OK);
  });

  it("handles a ZodError correctly", async () => {
    const error = new z.ZodError([
      {
        code: "too_small",
        minimum: 1,
        type: "string",
        inclusive: true,
        message: "Should be at least 1 characters",
        path: ["nickname"],
      },
    ]);
    const next = jest.fn().mockRejectedValue(error);
    await errorMiddleware(ctx, next);
    expect(ctx.status).toEqual(BAD_REQUEST);
    expect(ctx.body.code).toEqual(BAD_REQUEST);
    expect(ctx.body.status).toEqual(httpStatus[BAD_REQUEST]);
    expect(ctx.body.message).toEqual(JSON.parse(error.message));
  });

  it("handles a NotFoundError correctly", async () => {
    const error = new NotFoundError("Expected Test Error");
    const next = jest.fn().mockRejectedValue(error);
    await errorMiddleware(ctx, next);
    expect(next).toHaveBeenCalled();
    expect(ctx.status).toEqual(NOT_FOUND);
    expect(ctx.body.code).toEqual(NOT_FOUND);
    expect(ctx.body.status).toEqual(httpStatus[NOT_FOUND]);
    expect(ctx.body.message).toEqual(error.message);
  });

  it("handles an UnauthorizedError correctly", async () => {
    const error = new UnauthorizedError("Expected Test Error");
    const next = jest.fn().mockRejectedValue(error);
    await errorMiddleware(ctx, next);
    expect(next).toHaveBeenCalled();
    expect(ctx.status).toEqual(UNAUTHORIZED);
    expect(ctx.body.code).toEqual(UNAUTHORIZED);
    expect(ctx.body.status).toEqual(httpStatus[UNAUTHORIZED]);
    expect(ctx.body.message).toEqual(error.message);
  });

  it("handles a ForbiddenError correctly", async () => {
    const error = new ForbiddenError("Expected Test Error");
    const next = jest.fn().mockRejectedValue(error);
    await errorMiddleware(ctx, next);
    expect(next).toHaveBeenCalled();
    expect(ctx.status).toEqual(FORBIDDEN);
    expect(ctx.body.code).toEqual(FORBIDDEN);
    expect(ctx.body.status).toEqual(httpStatus[FORBIDDEN]);
    expect(ctx.body.message).toEqual(error.message);
  });

  it("handles a BadRequestError correctly", async () => {
    const error = new BadRequestError("Expected Test Error");
    const next = jest.fn().mockRejectedValue(error);
    await errorMiddleware(ctx, next);
    expect(next).toHaveBeenCalled();
    expect(ctx.status).toEqual(BAD_REQUEST);
    expect(ctx.body.code).toEqual(BAD_REQUEST);
    expect(ctx.body.status).toEqual(httpStatus[BAD_REQUEST]);
    expect(ctx.body.message).toEqual(error.message);
  });

  it("handles a ConflictError correctly", async () => {
    const error = new ConflictError("Expected Test Error");
    const next = jest.fn().mockRejectedValue(error);
    await errorMiddleware(ctx, next);
    expect(next).toHaveBeenCalled();
    expect(ctx.status).toEqual(CONFLICT);
    expect(ctx.body.code).toEqual(CONFLICT);
    expect(ctx.body.status).toEqual(httpStatus[CONFLICT]);
    expect(ctx.body.message).toEqual(error.message);
  });

  it("handles unhandled errors correctly", async () => {
    const error = new Error();
    const next = jest.fn().mockRejectedValue(error);
    await errorMiddleware(ctx, next);
    expect(next).toHaveBeenCalled();
    expect(ctx.status).toEqual(INTERNAL_SERVER_ERROR);
    expect(ctx.body.code).toEqual(INTERNAL_SERVER_ERROR);
    expect(ctx.body.status).toEqual(httpStatus[INTERNAL_SERVER_ERROR]);
    expect(ctx.body.message).toEqual(httpStatus[INTERNAL_SERVER_ERROR]);
  });

  it("handles unhandled errors correctly (error thrown is not a true error", async () => {
    const next = jest.fn().mockRejectedValue({});
    await errorMiddleware(ctx, next);
    expect(next).toHaveBeenCalled();
    expect(ctx.status).toEqual(INTERNAL_SERVER_ERROR);
    expect(ctx.body.code).toEqual(INTERNAL_SERVER_ERROR);
    expect(ctx.body.status).toEqual(httpStatus[INTERNAL_SERVER_ERROR]);
    expect(ctx.body.message).toEqual(httpStatus[INTERNAL_SERVER_ERROR]);
  });
});
