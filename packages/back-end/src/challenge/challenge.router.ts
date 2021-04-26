import Router from "@koa/router";
import { DraftService } from "../draft/draft.service";
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
    this.get("/challenges", async (ctx) => {
      ctx.body = await this.challengeService.getAllForCurrentUser(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        ctx.state.user
      );
    });

    this.get("/challenges/:challengeId/draft", async (ctx) => {
      ctx.body = await this.draftService.getOneForChallengeId(Number(ctx.params.challngeId))
    })
  }
}
