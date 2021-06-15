import Router from "@koa/router";
import { Context } from "vm";
import { ContextState } from "../types/state";
import { LiveSessionService } from "./live-session.service";

export class LiveSessionRouter extends Router<ContextState, Context>  {
  private readonly URI = "/live-sessions";

  constructor(
    private readonly liveSessionService: LiveSessionService
  ) {
    super()
  }

  private setupRoutes(): void {
    this.post(this.URI, async (ctx) => {
      ctx.body = await this.liveSessionService.createOne(ctx.state.session)
    });
  }
}