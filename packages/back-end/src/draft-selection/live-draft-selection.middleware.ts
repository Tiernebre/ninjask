import { Context, Middleware } from "koa";
import route from "koa-route";
import { LiveSessionPayload, LiveSessionService } from "../live-session";
import { Logger } from "../logger";
import { DraftSelectionService } from "./draft-selection.service";
import { FinalizeDraftSelectionRequest } from "./finalize-draft-selection-request";
import { v4 as uuid } from "uuid";
import WebSocket from "ws";

export enum LiveDraftSelectionMessageType {
  FINALIZE_SELECTION = "FINALIZE_SELECTION",
}

export interface LiveDraftSelectionMessage
  extends FinalizeDraftSelectionRequest {
  type: LiveDraftSelectionMessageType;
  selectionId: number;
}

// TODO: Super not ideal to store this in-memory, this should go on a database
// but this is a very proof-of-concept type of feature :).
const draftRoomIds: Map<number, string> = new Map();
const draftRoomClients: Map<string, WebSocket[]> = new Map();

const registerOrGetExistingDraftRoomId = (draftId: number): string => {
  if (!draftRoomIds.has(draftId)) {
    draftRoomIds.set(draftId, uuid());
  }
  return draftRoomIds.get(draftId) as string;
};

const registerClientForDraftRoomId = (
  draftRoomId: string,
  client: WebSocket
): void => {
  if (!draftRoomClients.has(draftRoomId)) {
    draftRoomClients.set(draftRoomId, []);
  }
  draftRoomClients.get(draftRoomId)?.push(client);
};

export const liveDraftSelectionMiddleware = (
  liveSessionService: LiveSessionService,
  draftSelectionService: DraftSelectionService,
  logger: Logger
): Middleware =>
  route.all(
    "/drafts/:id/live-selections",
    async (ctx: Context, id: string): Promise<void> => {
      let liveSession: LiveSessionPayload;

      try {
        liveSession = await liveSessionService.redeemOne(
          ctx.query.ticket as string
        );
      } catch (error) {
        logger.error(
          "There was an attempt to handshake with the live session for draft selections that failed due to an invalid ticket."
        );
        ctx.websocket.send(
          "Could not connect to the live session for draft selection."
        );
        ctx.websocket.close();
        return;
      }
      const draftRoomId = registerOrGetExistingDraftRoomId(Number(id));
      logger.info(
        `User with id = ${liveSession.userId} has entered the draft live selection room with id = ${draftRoomId}. Welcome!`
      );
      registerClientForDraftRoomId(draftRoomId, ctx.websocket);
      void draftSelectionService
        .getAllForDraft(Number(id))
        .then((selections) => {
          ctx.websocket.send(JSON.stringify(selections));
        });

      ctx.websocket.on("message", (message: string) => {
        const receivedMessage = JSON.parse(
          message
        ) as LiveDraftSelectionMessage;

        switch (receivedMessage.type) {
          case LiveDraftSelectionMessageType.FINALIZE_SELECTION:
            logger.info(
              `User with id = ${liveSession.userId} has submitted a finalized draft selection: ${message}`
            );
            void draftSelectionService
              .finalizeOneForUser(
                receivedMessage.selectionId,
                liveSession.userId,
                receivedMessage
              )
              .then(() =>
                draftSelectionService
                  .getAllForDraft(Number(id))
                  .then((updatedDraftSelections) => {
                    draftRoomClients.get(draftRoomId)?.forEach((client) => {
                      client.send(JSON.stringify(updatedDraftSelections));
                    });
                  })
                  .catch((error: Error) => {
                    logger.error(
                      `User with id = ${liveSession.userId} had their attempt to finalize a draft selection fail due to ${error.message}`
                    );
                    ctx.websocket.send(
                      "Your attempt to finalize a draft selection failed, potentially because the pick has already been made or it is not your turn."
                    );
                  })
              );
            break;
        }
      });
    }
  );
