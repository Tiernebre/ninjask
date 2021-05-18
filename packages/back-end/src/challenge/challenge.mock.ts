import { generateRandomNumber, generateRandomString } from "../random";
import { Challenge } from "./challenge";
import { ChallengeParticipantEntity } from "./challenge-participant.entity";
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

export const generateMockChallengeParticipantEntity = (): ChallengeParticipantEntity => {
  const challengeResultEntity = new ChallengeParticipantEntity();
  challengeResultEntity.id = generateRandomNumber();
  challengeResultEntity.userId = generateRandomNumber();
  challengeResultEntity.challengeId = generateRandomNumber();
  challengeResultEntity.completionTimeHour = generateRandomNumber();
  challengeResultEntity.completionTimeMinutes = generateRandomNumber();
  return challengeResultEntity;
};
