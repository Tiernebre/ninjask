import Router from "@koa/router";
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
  }
}
