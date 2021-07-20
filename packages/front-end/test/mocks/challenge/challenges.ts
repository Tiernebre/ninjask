import { Challenge } from "../../../src/api";
import { generateMockChallenge } from "./generate";
import { Writeable } from "../../types";

const createChallenges = (): Record<number, Writeable<Challenge>> => {
  const challenges: Record<number, Writeable<Challenge>> = {};
  for (let i = 0; i < 10; i++) {
    const challenge = generateMockChallenge();
    challenges[challenge.id] = challenge;
  }
  return challenges;
};

export const challenges: Record<
  number,
  Writeable<Challenge>
> = createChallenges();
