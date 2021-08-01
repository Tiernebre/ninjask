import Router from "@koa/router";
import { NO_CONTENT } from "http-status";
import { Context } from "vm";
import { ContextState } from "../types/state";
import { VersionService } from "./version.service";

export class VersionRouter extends Router<ContextState, Context> {
  constructor(private readonly versionService: VersionService) {
    super();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.get("/versions", async (ctx) => {
      ctx.body = await this.versionService.getAll();
    });

    this.post("/versions/cache", async (ctx) => {
      await this.versionService.cacheAll();
      ctx.status = NO_CONTENT;
    });
  }
}
