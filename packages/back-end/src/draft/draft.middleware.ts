import { Context } from "koa";
import KoaWebsocket from "koa-websocket";
import { Logger } from "../logger";
import { Pokemon } from "../pokemon/pokemon";
import { DraftService } from "./draft.service";

let currentDraftPokemon: Pokemon[] = [];
let currentIndex = 0;

export const liveDraftSocketMiddleware = (
  draftService: DraftService,
  logger: Logger,
  app: KoaWebsocket.App
) => (ctx: Context): void => {
  const generateCurrentPokemonMessage = () =>
    JSON.stringify(currentDraftPokemon[currentIndex]);
  const sendCurrentPokemon = () =>
    ctx.websocket.send(generateCurrentPokemonMessage());

  sendCurrentPokemon();

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
        logger.info(`Restarting the Live Draft Pool Feed From the Beginning.`);
        break;
      case "NEXT":
        currentIndex++;
        logger.info(`Broadcasting the next announced Pokemon.`);
        sendCurrentPokemon();
        app.ws.server?.clients.forEach((client) => {
          client.send(generateCurrentPokemonMessage());
        });
        break;
      default:
        logger.info(
          `Message received was unparseable -- skipping doing any logic.`
        );
    }
  });
};
