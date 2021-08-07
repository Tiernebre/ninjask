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
import { ChallengeService, ChallengeRouter } from "./challenge";
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
import { PokeApiVersionService, VersionRouter, VersionEntity } from "./version";
import {
  DraftSelectionRouter,
  DraftSelectionService,
  liveDraftSelectionMiddleware,
} from "./draft-selection";
import { DraftSelectionRepository } from "./draft-selection/draft-selection.repository";
import { DraftPokemonService } from "./draft-pokemon";
import {
  LiveSessionRouter,
  LiveSessionService,
  LiveSessionTicketEntity,
} from "./live-session";
import { createAdminAuthenticationMiddleware } from "./middleware";
import { SeasonRepository, SeasonRouter, SeasonService } from "./season";
import { ChallengeRepository } from "./challenge/challenge.repository";

const setupTypeOrmConnection = async (): Promise<void> => {
  const existingConfiguration = await getConnectionOptions();
  const connection = await createConnection({
    ...existingConfiguration,
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: false,
  });
  await connection.runMigrations();
};

const buildAdminAuthenticationMiddleware = (): Koa.Middleware => {
  return createAdminAuthenticationMiddleware(
    process.env.API_USERS_AUTH_USERNAME,
    process.env.API_USERS_AUTH_PASSWORD
  );
};

const buildPokeApiHttpClient = (): HttpClient => {
  return new FetchHttpClient("https://pokeapi.co/api/v2");
};

const buildPokemonService = (logger: Logger): PokemonService => {
  return new PokeApiPokemonService(buildPokeApiHttpClient(), logger);
};

const buildSeasonService = (): SeasonService => {
  const seasonsRepository = getCustomRepository(SeasonRepository);
  return new SeasonService(seasonsRepository);
};

const buildChallengeService = () => {
  const challengeRepository = getCustomRepository(ChallengeRepository);
  return new ChallengeService(challengeRepository);
};

const buildLeagueRouter = (logger: Logger) => {
  const leagueRepository = getRepository(LeagueEntity);
  const leagueService = new LeagueService(leagueRepository, logger);
  return new LeagueRouter(
    leagueService,
    buildSeasonService(),
    buildChallengeService()
  );
};

const buildDraftService = (logger: Logger) => {
  return new DraftService(getRepository(DraftEntity), logger);
};

const buildVersionService = (logger: Logger) => {
  return new PokeApiVersionService(
    buildPokeApiHttpClient(),
    logger,
    getRepository(VersionEntity)
  );
};

const buildDraftPoolService = (logger: Logger) => {
  return new DraftPoolService(
    buildDraftService(logger),
    getRepository(DraftEntity),
    buildVersionService(logger),
    buildPokemonService(logger),
    logger,
    buildChallengeService()
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
    buildAdminAuthenticationMiddleware()
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
  return new ChallengeRouter(
    buildChallengeService(),
    buildDraftService(logger),
    buildChallengeParticipantsService()
  );
};

const buildChallengeParticipantsRouter = () => {
  return new ChallengeParticipantsRouter(buildChallengeParticipantsService());
};

const buildDraftPokemonService = () => {
  return new DraftPokemonService(getRepository(DraftPokemonEntity));
};

const buildDraftSelectionService = (logger: Logger) => {
  const draftSelectionRepository = getCustomRepository(
    DraftSelectionRepository
  );
  return new DraftSelectionService(
    draftSelectionRepository,
    buildPokemonService(logger),
    buildDraftPokemonService(),
    buildDraftService(logger),
    buildChallengeParticipantsService()
  );
};

const buildDraftRouter = (logger: Logger) => {
  return new DraftRouter(
    buildDraftPoolService(logger),
    buildDraftSelectionService(logger)
  );
};

const buildDraftSelectionsRouter = (logger: Logger) => {
  return new DraftSelectionRouter(buildDraftSelectionService(logger));
};

const buildLiveSessionService = () => {
  return new LiveSessionService(getRepository(LiveSessionTicketEntity));
};

const buildLiveSessionRouter = () => {
  return new LiveSessionRouter(buildLiveSessionService());
};

const buildVersionRouter = (logger: Logger) => {
  return new VersionRouter(buildVersionService(logger));
};

const buildSeasonsRouter = () => {
  return new SeasonRouter(buildSeasonService(), buildChallengeService());
};

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
    buildDraftSelectionsRouter(logger),
    buildLiveSessionRouter(),
    buildVersionRouter(logger),
    buildSeasonsRouter(),
  ];
  routers.forEach((router) => {
    app.use(router.routes());
  });

  app.ws.use(liveDraftPoolMiddleware(buildLiveDraftPoolService(logger), app));
  app.ws.use(
    liveDraftSelectionMiddleware(
      buildLiveSessionService(),
      buildDraftSelectionService(logger),
      logger
    )
  );
  await stageMockData(logger);
  return app;
};
