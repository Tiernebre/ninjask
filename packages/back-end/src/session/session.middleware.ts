import { Next, ParameterizedContext } from "koa";
import { SessionService } from "./session.service";
import { UNAUTHORIZED, FORBIDDEN } from "http-status";
import { ContextState } from "../types/state";

export const sessionMiddleware = (sessionService: SessionService) => async (
  ctx: ParameterizedContext<ContextState>,
  next: Next
): Promise<void> => {
  if (!ctx.header.authorization) {
    ctx.status = UNAUTHORIZED;
    throw new Error("Authentication must be provided.");
  }

  try {
    const session = sessionService.verifyOne(ctx.header.authorization);
    ctx.state.session = session;
  } catch (error) {
    ctx.status = FORBIDDEN;
    throw new Error("Authentication provided was invalid.");
  }
  await next();
};
