import Router from "@koa/router";
import { ParameterizedContext } from "koa";
import { ContextState } from "../types/state";
import { ChallengeService } from "./challenge.service";

export class ChallengeRouter extends Router {
  constructor(private readonly challengeService: ChallengeService) {
    super();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.get("/challenges", async (ctx: ParameterizedContext<ContextState>) => {
      ctx.body = await this.challengeService.getAllForUserWithId(
        ctx.state.session.userId
      );
    });
  }
}
