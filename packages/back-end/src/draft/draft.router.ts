import Router from "@koa/router";
import { DraftSelectionService } from "../draft-selection";
import { DraftPoolService } from "./draft-pool.service";

export class DraftRouter extends Router {
  constructor(
    private readonly draftPoolService: DraftPoolService,
    private readonly draftSelectionService: DraftSelectionService
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

    this.get("/drafts/:id/selections", async (ctx) => {
      ctx.body = await this.draftSelectionService.getAllForDraft(Number(ctx.params.id))
    })
  }
}
