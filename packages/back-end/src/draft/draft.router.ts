import Router from "@koa/router";
import { DraftPoolService } from "./draft-pool.service";

export class DraftRouter extends Router {
  constructor(
    private readonly draftPoolService: DraftPoolService
  ) {
    super();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.post("/drafts/:id/pool", async (ctx) => {
      await this.draftPoolService.generateOneForDraftWithId(
        Number(ctx.params.id)
      );
      ctx.status = 204;
    });

    this.get("/drafts/:id/pool", async (ctx) => {
      const pokemon = await this.draftPoolService.getOneForDraftWithId(
        Number(ctx.params.id)
      );
      ctx.body = pokemon;
    });
  }
}
