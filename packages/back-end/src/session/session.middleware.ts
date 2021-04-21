import { Context, Next } from "koa";
import { SessionService } from "./session.service";
import { UNAUTHORIZED, FORBIDDEN } from 'http-status'

export const sessionMiddleware = (sessionService: SessionService) => (ctx: Context, next: Next): void => {
  if (!ctx.header.authorization) {
    ctx.status = UNAUTHORIZED
    throw new Error('Authentication must be provided.')
  }

  try {
    const user = sessionService.verifyOne(ctx.header.authorization)
    ctx.state.user = user
  } catch (error) {
    ctx.status = FORBIDDEN
    throw new Error('Authentication provided was invalid.')
  }
  void next()
}
