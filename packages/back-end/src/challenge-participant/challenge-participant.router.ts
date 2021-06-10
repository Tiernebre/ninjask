import Router from "@koa/router";
import { Context } from "koa";
import { ContextState } from "../types/state";
import { ChallengeParticipantUpdateRequest } from "./challenge-participant-update-request";
import { ChallengeParticipantService } from "./challenge-participant.service";

export class ChallengeParticipantsRouter extends Router<ContextState, Context> {
  private readonly URI = "/challenge-participants";

  constructor(
    private readonly challengeParticipantService: ChallengeParticipantService
  ) {
    super();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.patch(`${this.URI}/:id`, async (ctx) => {
      const request = {
        ...(<ChallengeParticipantUpdateRequest>ctx.request.body),
        id: Number(ctx.params.id),
        userId: ctx.state.session.userId,
      };
      ctx.body = await this.challengeParticipantService.updateOne(request);
    });
  }
}
