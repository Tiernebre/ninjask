import { getRepository, Repository } from "typeorm";
import { generateRandomString, getRandomInt } from "../random";
import { UserEntity } from "../user/user.entity";
import { ChallengeEntity } from "./challenge.entity";
import { seedUsers } from "../user/user.seed";
import { ChallengeParticipantEntity } from "../challenge-participant/challenge-participant.entity";

export const seedChallenges = async (
  repository: Repository<ChallengeEntity>,
  seasonId?: number,
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
    if (seasonId) {
      challenge.seasonId = seasonId;
    }
    challenges.push(challenge);
  }
  return repository.save(challenges);
};

export const seedChallenge = async (
  repository: Repository<ChallengeEntity>,
  seasonId?: number
): Promise<ChallengeEntity> => {
  const [challenge] = await seedChallenges(repository, seasonId, 1);
  return challenge;
};

export const seedChallengeParticipant = async (
  repository: Repository<ChallengeParticipantEntity>,
  challenge: ChallengeEntity,
  user: UserEntity
): Promise<ChallengeParticipantEntity> => {
  const challengeParticipant = repository.create();
  challengeParticipant.challenge = Promise.resolve(challenge);
  challengeParticipant.user = Promise.resolve(user);
  challengeParticipant.completionTimeHour = getRandomInt(1, 25);
  challengeParticipant.completionTimeMinutes = getRandomInt(0, 60);
  return repository.save(challengeParticipant);
};
