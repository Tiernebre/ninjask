import { getRepository } from "typeorm";
import { UserEntity } from "../user/user.entity";
import { isProduction } from "./environment";
import { LeagueEntity } from "../leagues/league.entity";
import { SeasonEntity } from "../season/season.entity";
import { ChallengeEntity } from "../challenge/challenge.entity";
import { DraftEntity } from "../draft/draft.entity";
import { Logger } from "../logger";
import bcrypt from "bcrypt";

// Test Data to make local development and test environments
// easier to stand up.
export const stageMockData = async (logger: Logger): Promise<void> => {
  if (isProduction()) {
    logger.info(
      "Skipping staging / seeding of mock test data, as we are in production."
    );
    return;
  }

  const userRepository = getRepository(UserEntity);
  const users = await userRepository.find();
  if (users.length) {
    logger.info(
      "Staging / Seeding of Mock test Data has already occurred, and thus we will skip it."
    );
    return;
  }

  let testUser = userRepository.create();
  testUser.nickname = "Test-User";
  testUser.password = await bcrypt.hash("NinjaskTestPassword", 12);
  testUser.accessKey = "0b86b703-a01f-4549-8b46-d4caa30662e2";
  testUser = await userRepository.save(testUser);

  const leagueRepository = getRepository(LeagueEntity);
  let testLeague = leagueRepository.create();
  testLeague.name = "Test League";
  testLeague.description = "Test League";
  testLeague = await leagueRepository.save(testLeague);

  const seasonRepository = getRepository(SeasonEntity);
  let testSeason = seasonRepository.create();
  testSeason.name = "Test Season";
  testSeason.description = "Test Season";
  testSeason.league = Promise.resolve(testLeague);
  testSeason = await seasonRepository.save(testSeason);

  const challengeRepository = getRepository(ChallengeEntity);
  let testChallenge = challengeRepository.create();
  testChallenge.name = "Test Challenge";
  testChallenge.description = "Test Challenge";
  testChallenge.users = Promise.resolve([testUser]);
  testChallenge.season = Promise.resolve(testSeason);
  testChallenge.versionId = 1;
  testChallenge = await challengeRepository.save(testChallenge);

  const draftRepository = getRepository(DraftEntity);
  let testDraft = draftRepository.create();
  testDraft.challenge = Promise.resolve(testChallenge);
  testDraft.poolSize = 20;
  testDraft = await draftRepository.save(testDraft);

  logger.info("Seeding of test data has completed!");
};
