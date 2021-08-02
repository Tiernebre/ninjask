import Router from "@koa/router";
import { Context } from "koa";
import { ContextState } from "../types/state";
import { SeasonService } from "./season.service";

export class SeasonRouter extends Router<ContextState, Context> {
  constructor(private readonly seasonService: SeasonService) {
    super();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.get("/seasons", async (ctx) => {
      ctx.body = await this.seasonService.getAll();
    });
  }
}
