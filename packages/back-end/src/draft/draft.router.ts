import Router from "@koa/router";
import { DraftService } from "./draft.service";

export class DraftRouter extends Router {
  constructor(private readonly draftService: DraftService) {
    super();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.post("/drafts/:id/pool", async (ctx) => {
      await this.draftService.generatePoolOfPokemonForOneWithId(
        Number(ctx.params.id)
      );
      ctx.status = 204;
    });

    this.get("/drafts/:id/pool", async (ctx) => {
      const pokemon = await this.draftService.getPoolOfPokemonForOneWithId(
        Number(ctx.params.id)
      );
      ctx.body = pokemon;
    });

    // this.get("/drafts/:id/live-pool", async (ctx) => {
    //   ctx.body = await this.draftService.getLiveDraftPoolForOneWithId(
    //     Number(ctx.params.id)
    //   );
    // });

    this.post("/drafts/:id/live-pool/pokemon", async (ctx) => {
      ctx.body = await this.draftService.revealNextPokemonInLivePoolForId(
        Number(ctx.params.id)
      );
    });
  }
}
