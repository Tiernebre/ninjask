import { Repository, getRepository } from "typeorm";
import { establishDbConnection } from "../test/create-db-connection";
import { UserEntity } from "../user/user.entity";
import { seedUsers } from "../user/user.seed";
import { ChallengeParticipantEntity } from "./challenge-participant.entity";
import { ChallengeParticipantService } from "./challenge-participant.service";
import { ChallengeEntity } from "./challenge.entity";
import { seedChallengeParticipants, seedChallenges } from "./challenge.seed";
import { orderBy, sample } from "lodash";
import { ChallengeResult } from "./challenge-result";

describe("ChallengeParticipantService (integration)", () => {
  let challengeParticipantService: ChallengeParticipantService;
  let challengeParticipantRepository: Repository<ChallengeParticipantEntity>;
  let challengeRepository: Repository<ChallengeEntity>;
  let userRepository: Repository<UserEntity>;

  let challenges: ChallengeEntity[];
  let users: UserEntity[];

  beforeAll(async () => {
    await establishDbConnection();
    challengeRepository = getRepository(ChallengeEntity);
    userRepository = getRepository(UserEntity);
    challengeParticipantRepository = getRepository(ChallengeParticipantEntity);
    challenges = await seedChallenges(challengeRepository);
    users = await seedUsers(userRepository, 5);
  });

  beforeEach(() => {
    challengeParticipantService = new ChallengeParticipantService(
      challengeParticipantRepository
    );
  });

  afterEach(async () => {
    await challengeParticipantRepository
      .createQueryBuilder()
      .delete()
      .execute();
  });

  describe("getCompletedResultsForChallengeInOrder", () => {
    it("returns the participants in order from least to longest time", async () => {
      expect(users.length).toBeGreaterThan(2);
      const [challenge] = challenges;
      let expectedChallengeResults: ChallengeResult[] = [];
      for (const user of users) {
        const [challengeParticipant] = await seedChallengeParticipants(
          challengeParticipantRepository,
          [challenge],
          user
        );
        expectedChallengeResults.push({
          resultId: challengeParticipant.id,
          completionTimeHour: challengeParticipant.completionTimeHour,
          completionTimeMinutes: challengeParticipant.completionTimeMinutes,
          nickname: user.nickname,
          participantId: user.id,
        });
      }
      expectedChallengeResults = orderBy(
        expectedChallengeResults,
        ["completionTimeHour", "completionTimeMinutes"],
        ["asc", "asc"]
      );
      const gottenResults =
        await challengeParticipantService.getCompletedResultsForChallengeInOrder(
          challenge.id
        );
      expect(gottenResults).toHaveLength(users.length);
      expect(gottenResults).toEqual(expectedChallengeResults);
    });

    it("returns null participants as the last ones", async () => {
      expect(users.length).toBeGreaterThan(2);
      const userWithoutEnteredTime = sample(users) as UserEntity;
      const [challenge] = challenges;
      let expectedChallengeResults: ChallengeResult[] = [];
      for (const user of users) {
        const [challengeParticipant] = await seedChallengeParticipants(
          challengeParticipantRepository,
          [challenge],
          user
        );
        if (user === userWithoutEnteredTime) {
          challengeParticipant.completionTimeHour = null;
          challengeParticipant.completionTimeMinutes = null;
          await challengeParticipantRepository.save(challengeParticipant);
        }
        expectedChallengeResults.push({
          resultId: challengeParticipant.id,
          completionTimeHour: challengeParticipant.completionTimeHour,
          completionTimeMinutes: challengeParticipant.completionTimeMinutes,
          nickname: user.nickname,
          participantId: user.id,
        });
      }
      expectedChallengeResults = orderBy(
        expectedChallengeResults,
        ["completionTimeHour", "completionTimeMinutes"],
        ["asc", "asc"]
      );
      const gottenResults =
        await challengeParticipantService.getCompletedResultsForChallengeInOrder(
          challenge.id
        );
      expect(gottenResults).toHaveLength(users.length);
      const foundNonEnteredResult = expectedChallengeResults.find(
        (result) => result.nickname === userWithoutEnteredTime.nickname
      );
      expect(foundNonEnteredResult).toEqual(gottenResults.pop())
    });
  });
});
