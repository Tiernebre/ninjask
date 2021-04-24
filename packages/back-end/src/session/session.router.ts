import Router from "@koa/router";
import { SessionRequest } from "./session-request";
import { SessionService } from "./session.service";
import { CREATED, FORBIDDEN } from "http-status";
import { isProduction } from "../environment";
import { ParameterizedContext } from "koa";
import { SessionTokenBag } from "./session-token-bag";

export const REFRESH_TOKEN_COOKIE_KEY = "ninjask_refresh-token";

export class SessionRouter extends Router {
  private readonly URI = "/sessions";

  constructor(private readonly sessionService: SessionService) {
    super();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.post(this.URI, async (ctx) => {
      const createdSession = await this.sessionService.createOne(
        ctx.request.body as SessionRequest
      );
      this.prepareSessionInResponse(ctx, createdSession);
    });

    this.put(this.URI, async (ctx) => {
      const refreshToken = ctx.cookies.get(REFRESH_TOKEN_COOKIE_KEY);
      if (!refreshToken) {
        ctx.status = FORBIDDEN;
      } else {
        const refreshedSession = await this.sessionService.refreshOne(
          refreshToken
        );

        this.prepareSessionInResponse(ctx, refreshedSession);
      }
    });
  }

  private prepareSessionInResponse(
    ctx: ParameterizedContext,
    createdSession: SessionTokenBag
  ): void {
    ctx.body = createdSession;
    ctx.cookies.set(REFRESH_TOKEN_COOKIE_KEY, createdSession.refreshToken, {
      httpOnly: true,
      path: this.URI,
      secure: isProduction(),
    });
    ctx.status = CREATED;
  }
}
