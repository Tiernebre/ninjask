import { BAD_REQUEST, OK } from "http-status";
import { Context } from "koa";
import { object } from "testdouble";
import { errorMiddleware } from "./error.middleware";
import { z } from "zod";

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
});
