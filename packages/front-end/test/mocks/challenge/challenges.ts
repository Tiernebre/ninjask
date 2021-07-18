import { Challenge } from "../../../src/api";
import { generateMockChallenge } from "./generate";

const createChallenges = (): Record<number, Challenge> => {
  const challenges = {};
  for (let i = 0; i < 10; i++) {
    challenges[i] = generateMockChallenge();
  }
  return challenges;
};

export const challenges = createChallenges();
