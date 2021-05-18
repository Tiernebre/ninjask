import { generateRandomNumber, generateRandomString } from "../random";
import { Challenge } from "./challenge";
import { ChallengeResultEntity } from "./challenge-result.entity";
import { ChallengeEntity } from "./challenge.entity";

export const generateMockChallenge = (): ChallengeEntity => {
  const challenge = new ChallengeEntity();
  challenge.id = generateRandomNumber();
  challenge.name = generateRandomString();
  challenge.description = generateRandomString();
  challenge.createdAt = new Date();
  challenge.updatedAt = new Date();
  challenge.versionId = generateRandomNumber();
  return challenge;
};

export const generateMockChallengeDto = (): Challenge => ({
  id: generateRandomNumber(),
  name: generateRandomString(),
  description: generateRandomString(),
  versionId: generateRandomNumber(),
  creatorId: generateRandomNumber(),
});

export const generateMockChallengeResultEntity = (): ChallengeResultEntity => {
  const challengeResultEntity = new ChallengeResultEntity()
  challengeResultEntity.id = generateRandomNumber()
  challengeResultEntity.userId = generateRandomNumber()
  challengeResultEntity.challengeId = generateRandomNumber()
  challengeResultEntity.completionTimeHour = generateRandomNumber()
  challengeResultEntity.completionTimeMinutes = generateRandomNumber()
  return challengeResultEntity;
}
