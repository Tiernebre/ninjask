import { Challenge, Draft } from "../../../src/api";
import { generateMockChallenge } from "./generate";
import { Writeable } from "../../types";
import { generateDraft } from "../draft";

const createChallenges = (): Record<number, Writeable<Challenge>> => {
  const challenges: Record<number, Writeable<Challenge>> = {};
  for (let i = 0; i < 10; i++) {
    const challenge = generateMockChallenge();
    challenges[challenge.id] = challenge;
  }
  return challenges;
};

const challenges: Record<number, Writeable<Challenge>> = createChallenges();

const createChallengeDrafts = (): Record<number, Writeable<Draft>> => {
  const challengeDrafts: Record<number, Writeable<Draft>> = {};
  Object.values(challenges).forEach((challenge) => {
    const draft = generateDraft();
    challengeDrafts[challenge.id] = draft;
  });
  return challengeDrafts;
};

const challengeDrafts: Record<
  number,
  Writeable<Draft>
> = createChallengeDrafts();

export { challenges, challengeDrafts };
