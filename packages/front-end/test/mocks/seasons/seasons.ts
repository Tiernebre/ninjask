import { Challenge, Season } from "../../../src/api";
import { Writeable } from "../../types";
import { generateMockChallenges } from "../challenge/generate";
import { generateSeason } from "./generate";

export const createMockSeasons = (): Record<number, Writeable<Season>> => {
  const seasons: Record<number, Writeable<Season>> = {};
  for (let i = 0; i < 20; i++) {
    const season = generateSeason();
    seasons[season.id] = season;
  }
  return seasons;
};

const seasons = createMockSeasons();

const createSeasonChallenges = (): Record<number, Writeable<Challenge[]>> => {
  const seasonChallenges: Record<number, Writeable<Challenge[]>> = {};
  Object.values(seasons).forEach((season) => {
    const challenges = generateMockChallenges();
    seasonChallenges[season.id] = challenges;
  });
  return seasonChallenges;
};

const seasonChallenges: Record<
  number,
  Writeable<Challenge[]>
> = createSeasonChallenges();

export { seasons, seasonChallenges };
