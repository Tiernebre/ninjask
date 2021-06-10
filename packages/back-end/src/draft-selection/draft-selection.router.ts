import Router from "@koa/router";
import { Context } from "koa";
import { DraftSelectionService } from "../draft-selection";
import { ContextState } from "../types/state";
import { FinalizeDraftSelectionRequest } from "./finalize-draft-selection-request";

export class DraftSelectionRouter extends Router<ContextState, Context> {
  constructor(
    private readonly draftSelectionService: DraftSelectionService
  ) {
    super();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.post("/draft-selections/:id", async (ctx) => {
      ctx.body = await this.draftSelectionService.finalizeOneForUser(
        Number(ctx.params.id),
        ctx.state.session.userId,
        ctx.request.body as FinalizeDraftSelectionRequest
      )
    });
  }
}
