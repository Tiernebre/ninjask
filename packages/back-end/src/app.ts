import Koa from "koa";
import { FetchHttpClient } from "./http/fetch-http-client";
import { HttpClient } from "./http/http-client";
import { PokeApiPokemonService } from "./pokemon/poke-api-pokemon.service";
import { PokemonService } from "./pokemon/pokemon.service";
import Router from "@koa/router";
import { PokemonRouter } from "./pokemon/pokemon.router";
import { Logger, PinoLogger } from "./logger";
import { loggingMiddleware } from "./logger/logging.middleware";
import cors from "@koa/cors";
import websockify from "koa-websocket";
import dotenv from "dotenv";
import "reflect-metadata";
import { createConnection, getRepository } from "typeorm";
import { LeagueEntity } from "./leagues/league.entity";
import { LeagueService } from "./leagues/league.service";
import { LeagueRouter } from "./leagues/league.router";

dotenv.config();

const app = websockify(new Koa());
const logger: Logger = new PinoLogger();

app.use(
  cors({
    // not great CORS API design -- but we'll stick with it for now to get something we can iterate on. :)
    origin: "*",
  })
);
app.use(loggingMiddleware(logger));

app.ws.use((ctx) => {
  ctx.websocket.send("Hello World FROM WEB SOCKET LAND WOOO");
  ctx.websocket.on("message", (message) => {
    logger.info(`WebSocket Message Received: ${message.toString()}`);
    ctx.websocket.send("Thanks for saying hi back :)");
  });
});

const injectDependencies = async (): Promise<Router[]> => {
  await createConnection()

  const pokeApiHttpClient: HttpClient = new FetchHttpClient(
    "https://pokeapi.co/api/v2"
  );
  const pokemonService: PokemonService = new PokeApiPokemonService(
    pokeApiHttpClient,
    logger
  );
  const pokemonRouter: Router = new PokemonRouter(pokemonService);

  const leagueRepository = getRepository(LeagueEntity);
  const leagueService = new LeagueService(leagueRepository, logger);
  const leagueRouter: Router = new LeagueRouter(leagueService);

  return [pokemonRouter, leagueRouter]
}

void injectDependencies().then((routers) => {
  routers.forEach(router => {
    app.use(router.routes())
  })

  const PORT = Number(process.env.API_SERVER_PORT);

  app.listen(PORT, () => {
    logger.info(`Pokemon Random API Has Started on Port: ${PORT}`);
  });
})