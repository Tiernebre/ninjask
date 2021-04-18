import { FetchHttpClient } from "./http/fetch-http-client";
import { HttpClient } from "./http/http-client";
import { PokeApiPokemonService } from "./pokemon/poke-api-pokemon.service";
import { PokemonService } from "./pokemon/pokemon.service";
import Router from "@koa/router";
import { PokemonRouter } from "./pokemon/pokemon.router";
import { createConnection, getConnectionOptions, getRepository } from "typeorm";
import { LeagueEntity } from "./leagues/league.entity";
import { LeagueService } from "./leagues/league.service";
import { LeagueRouter } from "./leagues/league.router";
import { Logger } from "./logger";
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const setupTypeOrmConnection = async (): Promise<void> => {
  const existingConfiguration = await getConnectionOptions()
  await createConnection({
    ...existingConfiguration,
    namingStrategy: new SnakeNamingStrategy()
  });
}

const buildPokemonRouter = (logger: Logger) => {
  const pokeApiHttpClient: HttpClient = new FetchHttpClient(
    "https://pokeapi.co/api/v2"
  );
  const pokemonService: PokemonService = new PokeApiPokemonService(
    pokeApiHttpClient,
    logger
  );
  return new PokemonRouter(pokemonService);
};

const buildLeagueRouter = (logger: Logger) => {
  const leagueRepository = getRepository(LeagueEntity);
  const leagueService = new LeagueService(leagueRepository, logger);
  return new LeagueRouter(leagueService);
};

/**
 * Sets up dependencies that are needed to run the various appliations and wires
 * them together.
 *
 * @param logger The application logger, which is on its own a dependency but needed in other spots.
 * @returns Fully dependency injected Koa routers that can then be used in a Koa application.
 */
export const injectDependencies = async (logger: Logger): Promise<Router[]> => {
  await setupTypeOrmConnection()
  return [buildPokemonRouter(logger), buildLeagueRouter(logger)];
};
