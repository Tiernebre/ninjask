import Router from "@koa/router";
import { SessionRequest } from "./session-request";
import { SessionService } from "./session.service";
import { CREATED, FORBIDDEN, NO_CONTENT } from "http-status";
import { isProduction } from "../environment";
import { ParameterizedContext } from "koa";
import { Session } from "./session";

export const REFRESH_TOKEN_COOKIE_KEY = "ninjask_refresh-token";
export const USER_FINGERPRINT_COOKIE_KEY = "ninjask_user-fingerprint";

export class SessionRouter extends Router {
  private readonly URI = "/sessions";
  private readonly CURRENT_SESSION_URI = `${this.URI}/current-session`;

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

    this.put(this.CURRENT_SESSION_URI, async (ctx) => {
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

    this.delete(this.CURRENT_SESSION_URI, (ctx) => {
      this.setRefreshTokenCookie(ctx, new Date(), null);
      this.setUserFingerprintCookie(ctx, null);
      ctx.status = NO_CONTENT;
    });
  }

  private prepareSessionInResponse(
    ctx: ParameterizedContext,
    createdSession: Session
  ): void {
    ctx.body = createdSession;
    const expires = new Date();
    expires.setDate(expires.getDate() + 1);
    ctx.status = CREATED;
    this.setRefreshTokenCookie(ctx, expires, createdSession.refreshToken);
    this.setUserFingerprintCookie(ctx, createdSession.userFingerprint);
  }

  private setRefreshTokenCookie(
    ctx: ParameterizedContext,
    expires: Date,
    refreshToken: string | null
  ): void {
    ctx.cookies.set(REFRESH_TOKEN_COOKIE_KEY, refreshToken, {
      httpOnly: true,
      path: this.URI,
      secure: isProduction(),
      expires,
    });
  }

  private setUserFingerprintCookie(
    ctx: ParameterizedContext,
    userFingerprint: string | null
  ): void {
    ctx.cookies.set(USER_FINGERPRINT_COOKIE_KEY, userFingerprint, {
      httpOnly: true,
      secure: isProduction(),
    });
  }
}
