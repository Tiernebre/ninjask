import Router from "@koa/router";
import { DraftService } from "./draft.service";

export class DraftRouter extends Router {
  constructor(private readonly draftService: DraftService) {
    super();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.post("/drafts/:id/pool", async (ctx) => {
      await this.draftService.generatePoolOfPokemonForOneWithId(Number(ctx.params.id))
      ctx.status = 204
    });
  }
}