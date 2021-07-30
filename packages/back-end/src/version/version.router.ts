import Router from "@koa/router";
import { NO_CONTENT } from "http-status";
import Koa from "koa";
import { Context } from "vm";
import { ContextState } from "../types/state";
import { VersionService } from "./version.service";

export class VersionRouter extends Router<ContextState, Context> {
  constructor(
    private readonly versionService: VersionService,
    private readonly adminAuthMiddleware: Koa.Middleware
  ) {
    super();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.get("/versions", async (ctx) => {
      ctx.body = await this.versionService.getAll();
    });

    this.post("/versions-cache", this.adminAuthMiddleware, async (ctx) => {
      await this.versionService.fetchAndCacheAll();
      ctx.status = NO_CONTENT;
    });
  }
}
