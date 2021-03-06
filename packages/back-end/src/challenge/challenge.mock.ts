import {
  generateRandomNumber,
  generateRandomString,
  getRandomInt,
} from "../random";
import { Challenge, ChallengeResult, ChallengeEntity } from ".";
import { generateMockChallengeParticipantEntity } from "../challenge-participant/challenge-participant.mock";
import { ChallengeStatus } from "./challenge-status";
import { CreateChallengeRequest } from "./create-challenge-request";

export const generateMockChallenge = (): ChallengeEntity => {
  const challenge = new ChallengeEntity();
  challenge.id = generateRandomNumber();
  challenge.name = generateRandomString();
  challenge.description = generateRandomString();
  challenge.createdAt = new Date();
  challenge.updatedAt = new Date();
  challenge.versionId = generateRandomNumber();
  challenge.participants = Promise.resolve([
    generateMockChallengeParticipantEntity(),
    generateMockChallengeParticipantEntity(),
  ]);
  return challenge;
};

export const generateMockChallengeDto = (): Challenge => ({
  id: generateRandomNumber(),
  name: generateRandomString(),
  description: generateRandomString(),
  versionId: generateRandomNumber(),
  creatorId: generateRandomNumber(),
  status: ChallengeStatus.CREATED,
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

export const generateCreateChallengeRequestDto =
  (): CreateChallengeRequest => ({
    name: generateRandomString(),
    description: generateRandomString(),
    versionId: generateRandomNumber(),
    seasonId: generateRandomNumber(),
  });
