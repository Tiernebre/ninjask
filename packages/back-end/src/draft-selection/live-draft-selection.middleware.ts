import { Context, Middleware } from "koa";
import route from "koa-route";
import { LiveSessionPayload, LiveSessionService } from "../live-session";
import { Logger } from "../logger";
import { DraftSelectionService } from "./draft-selection.service";
import { FinalizeDraftSelectionRequest } from "./finalize-draft-selection-request";

enum LiveDraftSelectionMessageType {
  FINALIZE_SELECTION = "FINALIZE_SELECTION",
}

interface LiveDraftSelectionMessage extends FinalizeDraftSelectionRequest {
  type: LiveDraftSelectionMessageType;
  selectionId: number;
}

export const liveDraftSelectionMiddleware = (
  liveSessionService: LiveSessionService,
  draftSelectionService: DraftSelectionService,
  logger: Logger
): Middleware =>
  route.all(
    "/drafts/:id/live-selections",
    async (ctx: Context, id: string): Promise<void> => {
      let liveSession: LiveSessionPayload

      try {
        liveSession = await liveSessionService.redeemOne(
          ctx.query.ticket as string
        );
      } catch (error) {
        logger.error('There was an attempt to handshake with the live session for draft selections that failed due to an invalid ticket.')
        ctx.websocket.send('Could not connect to the live session for draft selection.')
        ctx.websocket.close()
        return
      }

      ctx.websocket.on("message", (message: string) => {
        const receivedMessage = JSON.parse(
          message
        ) as LiveDraftSelectionMessage;
        switch (receivedMessage.type) {
          case LiveDraftSelectionMessageType.FINALIZE_SELECTION:
            console.log("FINALIZE SELECTION received");
            void draftSelectionService
              .finalizeOneForUser(
                receivedMessage.selectionId,
                liveSession.userId,
                receivedMessage
              )
              .then((draftedPokemon) => {
                ctx.websocket.send(JSON.stringify(draftedPokemon));
              });
            break;
        }
      });
    }
  );
