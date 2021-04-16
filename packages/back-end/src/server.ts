import Koa from "koa";
import { FetchHttpClient } from "./http/fetch-http-client";
import { HttpClient } from "./http/http-client";
import { PokeApiPokemonService } from "./pokemon/poke-api-pokemon-service";
import { PokemonService } from "./pokemon/pokemon-service";
import Router from '@koa/router';

const app = new Koa();
const router = new Router()

const pokeApiHttpClient: HttpClient = new FetchHttpClient(
  "https://pokeapi.co/api/v2"
);

const pokemonService: PokemonService = new PokeApiPokemonService(
  pokeApiHttpClient
);

router.get('/random-pokemon', async (ctx) => {
  const randomPokemon = await pokemonService.getARandomOne();
  ctx.body = randomPokemon
})

app.use(router.routes())

export { app };
