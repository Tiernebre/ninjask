import { FetchHttpClient } from "./http/fetch-http-client";
import { HttpClient } from "./http/http-client";
import { PokeApiPokemonService } from "./pokemon/poke-api-pokemon.service";
import { PokemonService } from "./pokemon/pokemon.service";
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
import { VersionDeniedPokemonEntity } from "./version/version-denied-pokemon.entity";
import Koa from "koa";
import KoaWebsocket from "koa-websocket";
import { liveDraftSocketMiddleware } from "./draft/draft.middleware";
import { UserService } from "./user/user.service";
import { BCryptPasswordEncoder } from "./crypto/bcrypt-password-encoder";
import { UserEntity } from "./user/user.entity";
import { JwtSessionService } from "./session/jwt-session.service";
import { SessionRouter } from "./session/session.router";
import { UserRouter } from "./user/user.router";

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
  return new PokeApiPokemonService(buildPokeApiHttpClient(), logger);
};

const buildPokemonRouter = (logger: Logger) => {
  return new PokemonRouter(buildPokemonService(logger));
};

const buildLeagueRouter = (logger: Logger) => {
  const leagueRepository = getRepository(LeagueEntity);
  const leagueService = new LeagueService(leagueRepository, logger);
  return new LeagueRouter(leagueService);
};

const buildDraftService = (logger: Logger) => {
  const versionDeniedPokemonRepository = getRepository(
    VersionDeniedPokemonEntity
  );
  const versionService: VersionService = new PokeApiVersionService(
    buildPokeApiHttpClient(),
    versionDeniedPokemonRepository,
    logger
  );
  const draftRepository = getRepository(DraftEntity);
  return new DraftService(
    draftRepository,
    versionService,
    buildPokemonService(logger),
    logger
  );
};

const buildDraftRouter = (logger: Logger) => {
  return new DraftRouter(buildDraftService(logger));
};

const buildUserService = () => {
  const passwordEncoder = new BCryptPasswordEncoder()
  const userRepository = getRepository(UserEntity)
  return new UserService(passwordEncoder, userRepository)
}

const buildSessionRouter = () => {
  const sessionService = new JwtSessionService(buildUserService(), process.env.API_JWT_SECRET)
  const sessionRouter = new SessionRouter(sessionService)
  return sessionRouter
}

const buildUserRouter = () => {
  return new UserRouter(buildUserService())
}

/**
 * Sets up dependencies that are needed to run the various appliations and wires
 * them together.
 *
 * @param logger The application logger, which is on its own a dependency but needed in other spots.
 * @returns Fully dependency injected Koa routers that can then be used in a Koa application.
 */
export const injectDependencies = async (
  app: KoaWebsocket.App,
  logger: Logger
): Promise<Koa> => {
  try {
    await setupTypeOrmConnection();
  } catch (error) {
    logger.error(error)
  }
  const routers = [
    buildPokemonRouter(logger),
    buildLeagueRouter(logger),
    buildDraftRouter(logger),
    buildSessionRouter(),
    buildUserRouter()
  ];
  routers.forEach((router) => {
    app.use(router.routes());
  });
  app.ws.use(liveDraftSocketMiddleware(buildDraftService(logger), logger, app));
  return app;
};
