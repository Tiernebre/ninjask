/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Router from "@koa/router";
import { CREATED } from "http-status";
import { ParameterizedContext } from "koa";
import { ChallengeParticipantService } from "../challenge-participant/challenge-participant.service";
import { DraftService } from "../draft/draft.service";
import { ContextState } from "../types/state";
import { ChallengeService } from "./challenge.service";

export class ChallengeRouter extends Router {
  private readonly URI = "/challenges";

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
          Number(ctx.params.id)
        );
      }
    );

    this.get(
      `${this.URI}/:id/draft`,
      async (ctx: ParameterizedContext<ContextState>) => {
        ctx.body = await this.draftService.getOneForChallengeId(
          Number(ctx.params.id)
        );
      }
    );

    this.post(
      `${this.URI}/:id/participants`,
      async (ctx: ParameterizedContext<ContextState>) => {
        ctx.body = await this.challengeParticipantService.createOne(
          ctx.state.session.userId,
          Number(ctx.params.id)
        );
        ctx.status = CREATED;
      }
    );

    this.get(
      `${this.URI}/:id/participants/me`,
      async (ctx: ParameterizedContext<ContextState>) => {
        ctx.body =
          await this.challengeParticipantService.getOneForUserOnChallenge(
            ctx.state.session.userId,
            Number(ctx.params.id)
          );
      }
    );

    this.get(
      `${this.URI}/:id/results`,
      async (ctx: ParameterizedContext<ContextState>) => {
        ctx.body =
          await this.challengeParticipantService.getCompletedResultsForChallengeInOrder(
            Number(ctx.params.id)
          );
      }
    );

    this.delete(
      `${this.URI}/:id/participants/me`,
      async (ctx: ParameterizedContext<ContextState>) => {
        ctx.body = await this.challengeParticipantService.removeOneForChallenge(
          ctx.state.session.userId,
          Number(ctx.params.id)
        );
      }
    );
  }
}
