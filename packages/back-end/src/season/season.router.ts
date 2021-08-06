import Router from "@koa/router";
import { Context } from "koa";
import { ChallengeService } from "../challenge";
import { ContextState } from "../types/state";
import { SeasonService } from "./season.service";

const URI = "/seasons";

export class SeasonRouter extends Router<ContextState, Context> {
  constructor(
    private readonly seasonService: SeasonService,
    private readonly challengeService: ChallengeService
  ) {
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

    this.get(`${URI}/:id/challenges`, async (ctx) => {
      ctx.body = await this.challengeService.getAllForSeason(
        Number(ctx.params.id)
      );
    });
  }
}
