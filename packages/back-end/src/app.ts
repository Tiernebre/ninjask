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
import { createConnection } from "typeorm";

dotenv.config();

const app = websockify(new Koa());

const logger: Logger = new PinoLogger();

const pokeApiHttpClient: HttpClient = new FetchHttpClient(
  "https://pokeapi.co/api/v2"
);

const pokemonService: PokemonService = new PokeApiPokemonService(
  pokeApiHttpClient,
  logger
);

const pokemonRouter: Router = new PokemonRouter(pokemonService);

app.use(
  cors({
    // not great CORS API design -- but we'll stick with it for now to get something we can iterate on. :)
    origin: "*",
  })
);
app.use(loggingMiddleware(logger));
app.use(pokemonRouter.routes());

app.ws.use((ctx) => {
  ctx.websocket.send("Hello World FROM WEB SOCKET LAND WOOO");
  ctx.websocket.on("message", (message) => {
    logger.info(`WebSocket Message Received: ${message.toString()}`);
    ctx.websocket.send("Thanks for saying hi back :)");
  });
});

const PORT = Number(process.env.API_SERVER_PORT);

const testDb = async () => {
  const connection = await createConnection()
  await connection.query('SELECT 1')
  console.log('YOO!')
}

void testDb()

app.listen(PORT, () => {
  logger.info(`Pokemon Random API Has Started on Port: ${PORT}`);
});
