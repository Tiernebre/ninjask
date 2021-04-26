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

    this.get("/drafts", async (ctx) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      ctx.body = await this.draftService.getDraftsForCurrentUser(ctx.state.user)
    })
  }
}
