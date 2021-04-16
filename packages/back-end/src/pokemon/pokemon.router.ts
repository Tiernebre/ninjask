import Router from "@koa/router";
import { PokemonService } from "./pokemon-service";

export class PokemonRouter extends Router {
  constructor (
    private readonly pokemonService: PokemonService
  ) {
    super()
    this.setupRoutes()
  }

  private setupRoutes () {
    this.get('/random-pokemon', async (ctx) => {
      const randomPokemon = await this.pokemonService.getARandomOne();
      ctx.body = randomPokemon
    })
  }
}