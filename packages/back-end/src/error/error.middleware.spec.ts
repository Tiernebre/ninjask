import {
  BAD_REQUEST,
  CONFLICT,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  OK,
  UNAUTHORIZED,
} from "http-status";
import { Context } from "koa";
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

describe("errorMiddleware", () => {
  it("does nothing if next is successful", async () => {
    const ctx = object<Context>();
    ctx.status = OK;
    const next = jest.fn();
    await errorMiddleware(ctx, next);
    expect(next).toHaveBeenCalled();
    expect(ctx.status).toEqual(OK);
  });

  it("handles a ZodError correctly", async () => {
    const ctx = object<Context>();
    ctx.status = OK;
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
    expect(next).toHaveBeenCalled();
    expect(ctx.status).toEqual(BAD_REQUEST);
    expect(ctx.body).toEqual(error.message);
  });

  it("handles a NotFoundError correctly", async () => {
    const ctx = object<Context>();
    ctx.status = OK;
    const error = new NotFoundError("Expected Test Error");
    const next = jest.fn().mockRejectedValue(error);
    await errorMiddleware(ctx, next);
    expect(next).toHaveBeenCalled();
    expect(ctx.status).toEqual(NOT_FOUND);
  });

  it("handles an UnauthorizedError correctly", async () => {
    const ctx = object<Context>();
    ctx.status = OK;
    const error = new UnauthorizedError("Expected Test Error");
    const next = jest.fn().mockRejectedValue(error);
    await errorMiddleware(ctx, next);
    expect(next).toHaveBeenCalled();
    expect(ctx.status).toEqual(UNAUTHORIZED);
  });

  it("handles a ForbiddenError correctly", async () => {
    const ctx = object<Context>();
    ctx.status = OK;
    const error = new ForbiddenError("Expected Test Error");
    const next = jest.fn().mockRejectedValue(error);
    await errorMiddleware(ctx, next);
    expect(next).toHaveBeenCalled();
    expect(ctx.status).toEqual(FORBIDDEN);
  });

  it("handles a BadRequestError correctly", async () => {
    const ctx = object<Context>();
    ctx.status = OK;
    const error = new BadRequestError("Expected Test Error");
    const next = jest.fn().mockRejectedValue(error);
    await errorMiddleware(ctx, next);
    expect(next).toHaveBeenCalled();
    expect(ctx.status).toEqual(BAD_REQUEST);
    expect(ctx.body).toEqual(error.message);
  });

  it("handles a ConflictError correctly", async () => {
    const ctx = object<Context>();
    ctx.status = OK;
    const error = new ConflictError("Expected Test Error");
    const next = jest.fn().mockRejectedValue(error);
    await errorMiddleware(ctx, next);
    expect(next).toHaveBeenCalled();
    expect(ctx.status).toEqual(CONFLICT);
  });

  it("handles a unhandled errors correctly", async () => {
    const ctx = object<Context>();
    ctx.status = OK;
    const error = new Error();
    const next = jest.fn().mockRejectedValue(error);
    await errorMiddleware(ctx, next);
    expect(next).toHaveBeenCalled();
    expect(ctx.status).toEqual(INTERNAL_SERVER_ERROR);
  });
});
