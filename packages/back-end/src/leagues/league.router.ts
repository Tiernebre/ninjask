import Router from "@koa/router";
import { LeagueService } from "./league.service";

export class LeagueRouter extends Router {
  constructor(
    private readonly leagueService: LeagueService,
  ) {
    super();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.get("/leagues", async (ctx) => {
      console.log(await this.leagueService.getAll())
      ctx.body = await this.leagueService.getAll()
    });
  }
}
