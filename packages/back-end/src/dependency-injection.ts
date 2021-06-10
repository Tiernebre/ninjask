import Koa from "koa";
import KoaWebsocket from "koa-websocket";
import { Logger } from "./logger";
import {
  getConnectionOptions,
  getRepository,
  createConnection,
  getCustomRepository,
} from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import {
  ChallengeEntity,
  ChallengeService,
  ChallengeRouter,
} from "./challenge";
import {
  ChallengeParticipantService,
  ChallengeParticipantEntity,
  ChallengeParticipantsRouter,
} from "./challenge-participant";
import { BCryptPasswordEncoder } from "./crypto";
import {
  DraftService,
  DraftEntity,
  DraftPoolService,
  LiveDraftPoolService,
  DraftRouter,
  liveDraftPoolMiddleware,
  DraftPokemonEntity,
} from "./draft";
import { stageMockData } from "./environment";
import { HttpClient, FetchHttpClient } from "./http";
import { LeagueEntity, LeagueService, LeagueRouter } from "./leagues";
import { PokemonService, PokeApiPokemonService } from "./pokemon";
import { JwtSessionService, SessionRouter, sessionMiddleware } from "./session";
import { ContextState } from "./types/state";
import { UserEntity, UserRouter, UserService } from "./user";
import {
  VersionDeniedPokemonEntity,
  VersionService,
  PokeApiVersionService,
} from "./version";
import { DraftSelectionRouter, DraftSelectionService } from "./draft-selection";
import { DraftSelectionRepository } from "./draft-selection/draft-selection.repository";
import { DraftPokemonService } from "./draft-pokemon";

const setupTypeOrmConnection = async (): Promise<void> => {
  const existingConfiguration = await getConnectionOptions();
  const connection = await createConnection({
    ...existingConfiguration,
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: false,
  });
  await connection.runMigrations();
};

const buildPokeApiHttpClient = (): HttpClient => {
  return new FetchHttpClient("https://pokeapi.co/api/v2");
};

const buildPokemonService = (logger: Logger): PokemonService => {
  return new PokeApiPokemonService(buildPokeApiHttpClient(), logger);
};

const buildLeagueRouter = (logger: Logger) => {
  const leagueRepository = getRepository(LeagueEntity);
  const leagueService = new LeagueService(leagueRepository, logger);
  return new LeagueRouter(leagueService);
};

const buildDraftService = (logger: Logger) => {
  return new DraftService(getRepository(DraftEntity), logger);
};

const buildDraftPoolService = (logger: Logger) => {
  const versionDeniedPokemonRepository = getRepository(
    VersionDeniedPokemonEntity
  );
  const versionService: VersionService = new PokeApiVersionService(
    buildPokeApiHttpClient(),
    versionDeniedPokemonRepository,
    logger
  );
  return new DraftPoolService(
    buildDraftService(logger),
    getRepository(DraftEntity),
    versionService,
    buildPokemonService(logger),
    logger
  );
};

const buildLiveDraftPoolService = (logger: Logger) => {
  return new LiveDraftPoolService(
    buildDraftService(logger),
    buildPokemonService(logger)
  );
};

const buildUserService = () => {
  const passwordEncoder = new BCryptPasswordEncoder();
  const userRepository = getRepository(UserEntity);
  return new UserService(passwordEncoder, userRepository);
};

const buildSessionService = (logger: Logger) => {
  return new JwtSessionService(
    buildUserService(),
    logger,
    process.env.API_JWT_ACCESS_TOKEN_SECRET,
    process.env.API_JWT_REFRESH_TOKEN_SECRET
  );
};

const buildSessionRouter = (logger: Logger) => {
  const sessionRouter = new SessionRouter(buildSessionService(logger));
  return sessionRouter;
};

const buildUserRouter = () => {
  return new UserRouter(
    buildUserService(),
    process.env.API_USERS_AUTH_USERNAME,
    process.env.API_USERS_AUTH_PASSWORD
  );
};

const buildSessionMiddleware = (logger: Logger) => {
  return sessionMiddleware(buildSessionService(logger));
};

const buildChallengeParticipantsService = () => {
  return new ChallengeParticipantService(
    getRepository(ChallengeParticipantEntity)
  );
};

const buildChallengesRouter = (logger: Logger) => {
  const challengeRepository = getRepository(ChallengeEntity);
  const challengeService = new ChallengeService(challengeRepository);
  return new ChallengeRouter(
    challengeService,
    buildDraftService(logger),
    buildChallengeParticipantsService()
  );
};

const buildChallengeParticipantsRouter = () => {
  return new ChallengeParticipantsRouter(buildChallengeParticipantsService());
};

const buildDraftPokemonService = () => {
  return new DraftPokemonService(getRepository(DraftPokemonEntity))
}

const buildDraftSelectionService = (logger: Logger) => {
  const draftSelectionRepository = getCustomRepository(
    DraftSelectionRepository
  );
  return new DraftSelectionService(
    draftSelectionRepository,
    buildPokemonService(logger),
    buildDraftPokemonService()
  );
};

const buildDraftRouter = (logger: Logger) => {
  return new DraftRouter(
    buildDraftPoolService(logger),
    buildDraftSelectionService(logger)
  );
};

const buildDraftSelectionsRouter = (logger: Logger) => {
  return new DraftSelectionRouter(buildDraftSelectionService(logger))
}

/**
 * Sets up dependencies that are needed to run the various appliations and wires
 * them together.
 *
 * @param logger The application logger, which is on its own a dependency but needed in other spots.
 * @returns Fully dependency injected Koa routers that can then be used in a Koa application.
 */
export const injectDependencies = async (
  app: KoaWebsocket.App<ContextState>,
  logger: Logger
): Promise<Koa<ContextState>> => {
  try {
    await setupTypeOrmConnection();
  } catch (error) {
    logger.error(error);
  }
  // routes below this are public and can be pinged by anyone
  app.use(buildSessionRouter(logger).routes());
  app.use(buildUserRouter().routes());
  // routes below this are protected behind session checks
  const sessionMiddleware = buildSessionMiddleware(logger);
  app.use(sessionMiddleware);
  const routers = [
    buildLeagueRouter(logger),
    buildDraftRouter(logger),
    buildChallengesRouter(logger),
    buildChallengeParticipantsRouter(),
    buildDraftSelectionsRouter(logger)
  ];
  routers.forEach((router) => {
    app.use(router.routes());
  });

  app.ws.use(liveDraftPoolMiddleware(buildLiveDraftPoolService(logger), app));
  await stageMockData(logger);
  return app;
};
