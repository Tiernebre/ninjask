import Koa from "koa";
import { FetchHttpClient } from "./http/fetch-http-client";
import { HttpClient } from "./http/http-client";
import { PokeApiPokemonService } from "./pokemon/poke-api-pokemon-service";
import { PokemonService } from "./pokemon/pokemon-service";

const app = new Koa();

const pokeApiHttpClient: HttpClient = new FetchHttpClient(
  "https://pokeapi.co/api/v2"
);

const pokemonService: PokemonService = new PokeApiPokemonService(
  pokeApiHttpClient
);

// response
app.use(async (ctx) => {
  ctx.body = "Hello Koa UPDATED AGAIN hopefully it works";
  const testResponse = await pokemonService.getARandomOne();
  ctx.body = JSON.stringify(testResponse);
});

export { app };
