import { Next, ParameterizedContext } from "koa";
import { SessionService } from "./session.service";
import { UNAUTHORIZED, FORBIDDEN } from "http-status";
import { ContextState } from "../types/state";
import { USER_FINGERPRINT_COOKIE_KEY } from "./session.router";

export const sessionMiddleware =
  (sessionService: SessionService) =>
  async (
    ctx: ParameterizedContext<ContextState>,
    next: Next
  ): Promise<void> => {
    const userFingerprint = ctx.cookies.get(USER_FINGERPRINT_COOKIE_KEY);
    if (!ctx.header.authorization || !userFingerprint) {
      ctx.status = UNAUTHORIZED;
      throw new Error("Authentication must be provided.");
    }

    try {
      const session = sessionService.verifyOne(
        ctx.header.authorization,
        userFingerprint
      );
      ctx.state.session = session;
    } catch (error) {
      ctx.status = FORBIDDEN;
      throw new Error("Authentication provided was invalid.");
    }
    await next();
  };
