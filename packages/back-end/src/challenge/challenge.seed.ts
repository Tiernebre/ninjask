import { getRepository, Repository } from "typeorm";
import { generateRandomString } from "../random";
import { UserEntity } from "../user/user.entity";
import { ChallengeEntity } from "./challenge.entity";
import { seedUsers } from '../user/user.seed';

export const seedChallenges = async (
  repository: Repository<ChallengeEntity>,
  count = 20
): Promise<ChallengeEntity[]> => {
  const userRepository = getRepository(UserEntity)
  const [user] = await seedUsers(userRepository, 1)

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
