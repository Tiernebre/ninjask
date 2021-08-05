import { Challenge, Season } from "../../../src/api";
import { Writeable } from "../../types";
import { generateSeason } from "./generate";
import { challenges } from "../challenge";

export const createMockSeasons = (): Writeable<Season>[] => {
  const seasons = [];
  for (let i = 0; i < 20; i++) {
    seasons.push(generateSeason());
  }
  return seasons;
};

export const createMockChallengeSeasons = (): Record<
  number,
  Writeable<Season>[]
> => {
  const challengeSeasons: Record<number, Writeable<Season>[]> = {};
  Object.values(challenges).forEach((challenge: Challenge) => {
    const seasons = createMockSeasons();
    challengeSeasons[challenge.id] = seasons;
  });
  return challengeSeasons;
};

export const mockSeasons = createMockSeasons();
export const mockChallengeSeasons = createMockChallengeSeasons();
