import { Repository, getRepository } from "typeorm";
import { establishDbConnection } from "../test/create-db-connection";
import { UserEntity } from "../user/user.entity";
import { seedUsers } from "../user/user.seed";
import { ChallengeParticipantEntity } from "./challenge-participant.entity";
import { ChallengeParticipantService } from './challenge-participant.service';
import { ChallengeEntity } from "./challenge.entity";
import { seedChallengeParticipants, seedChallenges } from "./challenge.seed";
import { orderBy } from 'lodash'
import { ChallengeResult } from "./challenge-result";

describe('ChallengeParticipantService (integration)', () => {
  let challengeParticipantService: ChallengeParticipantService;
  let challengeParticipantRepository: Repository<ChallengeParticipantEntity>;
  let challengeRepository: Repository<ChallengeEntity>;
  let userRepository: Repository<UserEntity>;

  let challenges: ChallengeEntity[]
  let users: UserEntity[]

  beforeAll(async () => {
    await establishDbConnection();
    challengeRepository = getRepository(ChallengeEntity);
    userRepository = getRepository(UserEntity);
    challengeParticipantRepository = getRepository(ChallengeParticipantEntity);
    challenges = await seedChallenges(challengeRepository);
    users = await seedUsers(userRepository, 5);
  });

  beforeEach(() => {
    challengeParticipantService = new ChallengeParticipantService(challengeParticipantRepository);
  });

  describe("getResultsInOrderForChallenge", () => {
    it("returns the participants in order from least to longest time", async () => {
      const [challenge] = challenges
      let expectedChallengeResults: ChallengeResult[] = []
      for (const user of users) {
        const [challengeParticipant] = await seedChallengeParticipants(challengeParticipantRepository, [challenge], user)
        expectedChallengeResults.push({
          participantId: challengeParticipant.id,
          completionTimeHour: challengeParticipant.completionTimeHour,
          completionTimeMinutes: challengeParticipant.completionTimeMinutes,
          nickname: user.nickname
        })
      }
      expectedChallengeResults = orderBy(expectedChallengeResults, ['completionTimeHour', 'completionTimeMinutes'], ['asc', 'asc'])
      const gottenResults = await challengeParticipantService.getResultsInOrderForChallenge(challenge.id)
      expect(gottenResults).toEqual(expectedChallengeResults)
    })
  })
})