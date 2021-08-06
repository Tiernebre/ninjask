import { getCustomRepository, getRepository, Repository } from "typeorm";
import { seedChallengeParticipant, seedChallenges } from "./challenge.seed";
import { UserEntity } from "../user/user.entity";
import { seedUser, seedUsers } from "../user/user.seed";
import { establishDbConnection } from "../test/create-db-connection";
import { ChallengeParticipantEntity } from "../challenge-participant/challenge-participant.entity";
import { ChallengeRepository } from "./challenge.repository";
import { seedSeason } from "../season/season.seed";
import { seedLeague } from "../leagues/league.seed";
import { SeasonRepository } from "../season";
import { LeagueEntity } from "../leagues";

describe("ChallengeRepository (integration)", () => {
  let challengeRepository: ChallengeRepository;
  let userRepository: Repository<UserEntity>;

  beforeAll(async () => {
    await establishDbConnection();
  });

  beforeEach(async () => {
    challengeRepository = getCustomRepository(ChallengeRepository);
    userRepository = getRepository(UserEntity);
    await seedChallenges(challengeRepository);
    await seedUsers(userRepository);
  });

  describe("findAllForUserWithId", () => {
    it("returns all of the challenges that are only tied to a user", async () => {
      const challenges = await challengeRepository.findByIds([1, 3]);
      const user = (await userRepository.findOne()) as UserEntity;
      for (const challenge of challenges) {
        await seedChallengeParticipant(
          getRepository(ChallengeParticipantEntity),
          challenge,
          user
        );
      }
      await challengeRepository.save(challenges);
      const challengesFound = await challengeRepository.findAllForUserWithId(
        user.id
      );
      expect(challengesFound).toHaveLength(2);
      const [firstChallenge, secondChallenge] = challengesFound;
      expect(firstChallenge.id).toEqual(challenges[0].id);
      expect(firstChallenge.name).toEqual(challenges[0].name);
      expect(secondChallenge.id).toEqual(challenges[1].id);
      expect(secondChallenge.name).toEqual(challenges[1].name);
    });
  });

  describe("findAllWithSeasonId", () => {
    it("returns all of the challenges tied to a given season", async () => {
      const user = await seedUser(getRepository(UserEntity));
      const league = await seedLeague(getRepository(LeagueEntity), user.id);
      const season = await seedSeason(
        getCustomRepository(SeasonRepository),
        league.id
      );
      const challenges = await seedChallenges(challengeRepository, season.id);
      const foundChallenges = await challengeRepository.findAllWithSeasonId(
        season.id
      );
      foundChallenges.forEach((foundChallenge, index) => {
        const correspondingChallenge = challenges[index];
        expect(foundChallenge.id).toEqual(correspondingChallenge.id);
        expect(foundChallenge.name).toEqual(correspondingChallenge.name);
        expect(foundChallenge.description).toEqual(
          correspondingChallenge.description
        );
        expect(foundChallenge.seasonId).toEqual(season.id);
        expect(foundChallenge.creatorId).toEqual(
          correspondingChallenge.creatorId
        );
      });
    });
  });
});
