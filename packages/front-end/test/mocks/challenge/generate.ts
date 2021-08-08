import { Challenge } from "../../../src/api";
import { v4 as uuid } from "uuid";
import { generateRandomNumber } from "../../random/random";
import { ChallengeStatus } from "../../../src/api/challenge/ChallengeStatus";

export const generateMockChallenge = (): Challenge => ({
  id: generateRandomNumber(),
  name: `Challenge - ${uuid()}`,
  description: `Challenge Description - ${uuid()}`,
  versionId: generateRandomNumber(),
  creatorId: generateRandomNumber(),
  status: ChallengeStatus.CREATED,
});

export const generateMockChallenges = (): Challenge[] => {
  const challenges = [];
  for (let i = 0; i < 20; i++) {
    challenges.push(generateMockChallenge());
  }
  return challenges;
};
