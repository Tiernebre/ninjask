import { ChallengeResult } from "../../../src/api/challenge/ChallengeResult";
import { Writeable } from "../../types";
import { challenges } from "../challenge";
import { generateChallengeResults } from "./generate";

const createMockChallengeResults = (): Record<
  number,
  Writeable<ChallengeResult>[]
> => {
  const challengeResults: Record<number, Writeable<ChallengeResult>[]> = {};
  Object.keys(challenges)
    .map(Number)
    .forEach((challengeId) => {
      challengeResults[challengeId] = generateChallengeResults();
    });
  return challengeResults;
};

export const challengeResults = createMockChallengeResults();
