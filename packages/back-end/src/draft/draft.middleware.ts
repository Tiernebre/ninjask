import { Context } from "koa";
import { Logger } from "../logger";
import { Pokemon } from "../pokemon/pokemon";
import { DraftService } from "./draft.service";
import KoaWebsocket from 'koa-websocket'

let currentDraftPokemon: Pokemon[] = [];
let currentIndex = 0;

export const liveDraftSocketMiddleware = (
  draftService: DraftService,
  logger: Logger,
  app: KoaWebsocket.App
) => (ctx: Context): void => {
  const generateDraftPoolMessage = (): string => JSON.stringify(({
    currentPokemon: currentDraftPokemon[currentIndex] || null,
    pooledPokemon: currentDraftPokemon.slice(0, currentIndex)
  }))
  const sendCurrentDraftPoolMessage = () =>
    ctx.websocket.send(generateDraftPoolMessage());
  const broadcastCurrentDraftPool = () => {
    logger.info(`Broadcasting the next announced Pokemon.`);
    app.ws.server?.clients.forEach((client) => {
      client.send(generateDraftPoolMessage());
    });
  }

  sendCurrentDraftPoolMessage();

  if (!currentDraftPokemon.length) {
    void draftService.getPoolOfPokemonForOneWithId(1).then((draftPokemon) => {
      currentDraftPokemon = draftPokemon;
    });
  }

  ctx.websocket.on("message", (message: string) => {
    logger.info(`Received WebSocket Message ${message}`);
    switch (message.toUpperCase()) {
      case "RESTART":
        currentIndex = 0;
        broadcastCurrentDraftPool()
        break;
      case "NEXT":
        currentIndex++;
        broadcastCurrentDraftPool()
        break;
      default:
        logger.info(
          `Message received was unparseable -- skipping doing any logic.`
        );
    }
  });
};
