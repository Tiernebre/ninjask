import Koa from "koa";
import { FetchHttpClient } from "./http/fetch-http-client";
import { HttpClient } from "./http/http-client";
import { PokeApiPokemonService } from "./pokemon/poke-api-pokemon.service";
import { PokemonService } from "./pokemon/pokemon.service";
import Router from "@koa/router";
import { PokemonRouter } from "./pokemon/pokemon.router";
import { Logger, PinoLogger } from "./logger";

const app = new Koa();

const logger: Logger = new PinoLogger()

const pokeApiHttpClient: HttpClient = new FetchHttpClient(
  "https://pokeapi.co/api/v2"
);

const pokemonService: PokemonService = new PokeApiPokemonService(
  pokeApiHttpClient,
  logger
);

const pokemonRouter: Router = new PokemonRouter(pokemonService);

app.use(pokemonRouter.routes());

app.listen(3000);
