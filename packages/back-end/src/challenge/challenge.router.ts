import Router from "@koa/router";
import { ParameterizedContext } from "koa";
import { DraftService } from "../draft/draft.service";
import { ContextState } from "../types/state";
import { ChallengeParticipantService } from "./challenge-participant.service";
import { ChallengeService } from "./challenge.service";

export class ChallengeRouter extends Router {
  private readonly URI = "/challenges"

  constructor(
    private readonly challengeService: ChallengeService,
    private readonly draftService: DraftService,
    private readonly challengeParticipantService: ChallengeParticipantService
  ) {
    super();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.get(this.URI, async (ctx: ParameterizedContext<ContextState>) => {
      ctx.body = await this.challengeService.getAllForUserWithId(
        ctx.state.session.userId
      );
    });

    this.get(
      `${this.URI}/:id`,
      async (ctx: ParameterizedContext<ContextState>) => {
        ctx.body = await this.challengeService.getOneById(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          Number(ctx.params.id)
        );
      }
    );

    this.get(
      `${this.URI}/:id/draft`,
      async (ctx: ParameterizedContext<ContextState>) => {
        ctx.body = await this.draftService.getOneForChallengeId(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          Number(ctx.params.id)
        );
      }
    );
    
    this.post(
      `${this.URI}/:id/participant`,
      async (ctx: ParameterizedContext<ContextState>) => {
        ctx.body = await this.challengeParticipantService.createOne(
          ctx.state.session.userId,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          Number(ctx.params.id)
        )
      }
    )
  }
}
