import { getRepository, Repository } from "typeorm";
import { generateRandomString, getRandomInt } from "../random";
import { UserEntity } from "../user/user.entity";
import { ChallengeEntity } from "./challenge.entity";
import { seedUsers } from "../user/user.seed";
import { ChallengeResultEntity } from "./challenge-result.entity";

export const seedChallenges = async (
  repository: Repository<ChallengeEntity>,
  count = 20
): Promise<ChallengeEntity[]> => {
  const userRepository = getRepository(UserEntity);
  const [user] = await seedUsers(userRepository, 1);

  const challenges = [];
  for (let i = 0; i < count; i++) {
    const challenge = repository.create();
    challenge.name = generateRandomString();
    challenge.description = generateRandomString();
    challenge.versionId = i;
    challenge.creator = Promise.resolve(user);
    challenges.push(challenge);
  }
  return repository.save(challenges);
};

export const seedChallengeResults = async (
  repository: Repository<ChallengeResultEntity>,
  challenges: ChallengeEntity[],
  user: UserEntity
): Promise<ChallengeResultEntity[]> => {
  const challengeResults = challenges.map((challenge) => {
    const result = new ChallengeResultEntity();
    result.challenge = Promise.resolve(challenge);
    result.user = Promise.resolve(user);
    result.completionTimeHour = getRandomInt(1, 25);
    result.completionTimeMinutes = getRandomInt(0, 60);
    return result;
  });
  return repository.save(challengeResults);
};
