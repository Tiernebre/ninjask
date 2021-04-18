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
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { DraftEntity } from "./draft/draft.entity";
import { DraftService } from "./draft/draft.service";
import { PokeApiVersionService } from "./version/poke-api-version.service";
import { VersionService } from "./version/version.service";
import { DraftRouter } from "./draft/draft.router";

const setupTypeOrmConnection = async (): Promise<void> => {
  const existingConfiguration = await getConnectionOptions();
  await createConnection({
    ...existingConfiguration,
    namingStrategy: new SnakeNamingStrategy(),
  });
};

const buildPokeApiHttpClient = (): HttpClient => {
  return new FetchHttpClient("https://pokeapi.co/api/v2");
};

const buildPokemonService = (logger: Logger): PokemonService => {
  return new PokeApiPokemonService(
    buildPokeApiHttpClient(),
    logger
  );
}

const buildPokemonRouter = (logger: Logger) => {
  return new PokemonRouter(buildPokemonService(logger));
};

const buildLeagueRouter = (logger: Logger) => {
  const leagueRepository = getRepository(LeagueEntity);
  const leagueService = new LeagueService(leagueRepository, logger);
  return new LeagueRouter(leagueService);
};

const buildDraftRouter = (logger: Logger) => {
  const versionService: VersionService = new PokeApiVersionService(
    buildPokeApiHttpClient()
  );
  const draftRepository = getRepository(DraftEntity);
  const draftService = new DraftService(draftRepository, versionService, buildPokemonService(logger));
  return new DraftRouter(draftService);
};

/**
 * Sets up dependencies that are needed to run the various appliations and wires
 * them together.
 *
 * @param logger The application logger, which is on its own a dependency but needed in other spots.
 * @returns Fully dependency injected Koa routers that can then be used in a Koa application.
 */
export const injectDependencies = async (logger: Logger): Promise<Router[]> => {
  await setupTypeOrmConnection();
  return [
    buildPokemonRouter(logger),
    buildLeagueRouter(logger),
    buildDraftRouter(logger),
  ];
};
