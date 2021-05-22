import {
  generateRandomNumber,
  generateRandomString,
  getRandomInt,
} from "../random";
import { Challenge, ChallengeResult, ChallengeEntity } from ".";

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

export const generateMockChallengeResult = (): ChallengeResult => ({
  participantId: generateRandomNumber(),
  completionTimeHour: getRandomInt(1, 25),
  completionTimeMinutes: getRandomInt(0, 59),
  nickname: generateRandomString(),
  resultId: generateRandomNumber(),
});

export const generateMockChallengeResults = (size = 20): ChallengeResult[] => {
  const results = [];
  for (let i = 0; i < size; i++) {
    results.push(generateMockChallengeResult());
  }
  return results;
};
