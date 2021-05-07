import Router from "@koa/router";
import { ParameterizedContext } from "koa";
import { DraftService } from "../draft/draft.service";
import { ContextState } from "../types/state";
import { ChallengeService } from "./challenge.service";

export class ChallengeRouter extends Router {
  constructor(
    private readonly challengeService: ChallengeService,
    private readonly draftService: DraftService
  ) {
    super();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.get("/challenges", async (ctx: ParameterizedContext<ContextState>) => {
      ctx.body = await this.challengeService.getAllForUserWithId(
        ctx.state.session.userId
      );
    });

    this.get(
      "/challenges/:id",
      async (ctx: ParameterizedContext<ContextState>) => {
        ctx.body = await this.challengeService.getAllForUserWithId(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          Number(ctx.params.id)
        );
      }
    );

    this.get(
      "/challenges/:id/draft",
      async (ctx: ParameterizedContext<ContextState>) => {
        ctx.body = await this.draftService.getOneForChallengeId(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          Number(ctx.params.id)
        );
      }
    );
  }
}
