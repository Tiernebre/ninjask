import Router from "@koa/router";
import { CREATED } from "http-status";
import { Context } from "koa";
import { ContextState } from "../types/state";
import { CreateLeagueRequest } from "./create-league-request";
import { LeagueService } from "./league.service";

const URI = "/leagues";

export class LeagueRouter extends Router<ContextState, Context> {
  constructor(private readonly leagueService: LeagueService) {
    super();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.get(URI, async (ctx) => {
      ctx.body = await this.leagueService.getAll();
    });

    this.get(`${URI}/:id`, async (ctx) => {
      ctx.body = await this.leagueService.getOneById(Number(ctx.params.id));
    });

    this.post(URI, async (ctx) => {
      ctx.body = await this.leagueService.createOne(
        ctx.request.body as CreateLeagueRequest,
        ctx.state.session.userId
      );
      ctx.status = CREATED;
    });
  }
}
