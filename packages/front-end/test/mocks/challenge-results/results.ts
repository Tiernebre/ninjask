import { ChallengeResult } from "../../../src/api/challenge/ChallengeResult";
import { Writeable } from "../../types";
import { challenges } from "../challenge";
import { generateChallengeResult } from "./generate";

const createMockChallengeResults = (): Record<
  number,
  Writeable<ChallengeResult>
> => {
  const challengeResults = {};
  Object.keys(challenges).forEach((challengeId) => {
    challengeResults[challengeId] = generateChallengeResult();
  });
  return challengeResults;
};

export const challengeResults = createMockChallengeResults();
