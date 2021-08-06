import Router from "@koa/router";
import { Context } from "koa";
import { ContextState } from "../types/state";
import { SeasonService } from "./season.service";

const URI = "/seasons";

export class SeasonRouter extends Router<ContextState, Context> {
  constructor(private readonly seasonService: SeasonService) {
    super();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.get(URI, async (ctx) => {
      ctx.body = await this.seasonService.getAll();
    });

    this.get(`${URI}/:id`, async (ctx) => {
      ctx.body = await this.seasonService.getOneById(Number(ctx.params.id));
    });
  }
}
