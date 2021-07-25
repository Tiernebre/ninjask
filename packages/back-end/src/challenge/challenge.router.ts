import Router from "@koa/router";
import { Context } from "koa";
import { CREATED, NO_CONTENT } from "http-status";
import { ParameterizedContext } from "koa";
import { ChallengeParticipantService } from "../challenge-participant/challenge-participant.service";
import { DraftService } from "../draft/draft.service";
import { ContextState } from "../types/state";
import { ChallengeService } from "./challenge.service";
import { CreateChallengeRequest } from "./create-challenge-request";

export class ChallengeRouter extends Router<ContextState, Context> {
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
    this.get(
      `/me/challenges`,
      async (ctx: ParameterizedContext<ContextState>) => {
        ctx.body = await this.challengeService.getAllForUserWithId(
          ctx.state.session.userId
        );
      }
    );

    this.get(this.URI, async (ctx) => {
      ctx.body = await this.challengeService.getAll();
    });

    this.post(this.URI, async (ctx) => {
      ctx.body = await this.challengeService.createOne(
        ctx.body as CreateChallengeRequest,
        ctx.state.session.userId
      );
      ctx.status = CREATED;
    });

    this.get(`${this.URI}/:id`, async (ctx) => {
      ctx.body = await this.challengeService.getOneById(Number(ctx.params.id));
    });

    this.get(`${this.URI}/:id/draft`, async (ctx) => {
      ctx.body = await this.draftService.getOneForChallengeId(
        Number(ctx.params.id)
      );
    });

    this.post(`${this.URI}/:id/participants`, async (ctx) => {
      ctx.body = await this.challengeParticipantService.createOne(
        ctx.state.session.userId,
        Number(ctx.params.id)
      );
      ctx.status = CREATED;
    });

    this.get(`${this.URI}/:id/participants/me`, async (ctx) => {
      ctx.body =
        await this.challengeParticipantService.getOneForUserOnChallenge(
          ctx.state.session.userId,
          Number(ctx.params.id)
        );
    });

    this.get(`${this.URI}/:id/results`, async (ctx) => {
      ctx.body =
        await this.challengeParticipantService.getCompletedResultsForChallengeInOrder(
          Number(ctx.params.id)
        );
    });

    this.delete(`${this.URI}/:id/participants/me`, async (ctx) => {
      ctx.body = await this.challengeParticipantService.removeOneForChallenge(
        ctx.state.session.userId,
        Number(ctx.params.id)
      );
    });

    this.delete(`${this.URI}/:id`, async (ctx) => {
      await this.challengeService.deleteOneById(
        Number(ctx.params.id),
        ctx.state.session.userId
      );
      ctx.status = NO_CONTENT;
    });
  }
}
