import Router from "@koa/router";
import { SessionRequest } from "./session-request";
import { SessionService } from "./session.service";
import { CREATED } from "http-status";
import { isProduction } from "../environment";

export const REFRESH_TOKEN_HEADER = "ninjask_refresh-token"

export class SessionRouter extends Router {
  constructor(private readonly sessionService: SessionService) {
    super();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.post("/sessions", async (ctx) => {
      const createdSession = await this.sessionService.createOne(
        ctx.request.body as SessionRequest
      );
      ctx.body = { accessToken: createdSession };
      ctx.cookies.set(REFRESH_TOKEN_HEADER, createdSession.refreshToken, {
        httpOnly: true,
        secure: isProduction()
      })
      ctx.status = CREATED;
    });
  }
}
