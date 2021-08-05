import { Season } from "../../../src/api";
import { Writeable } from "../../types";
import { generateSeason } from "./generate";
import { leagues } from "../league";

export const createMockSeasons = (): Writeable<Season>[] => {
  const seasons = [];
  for (let i = 0; i < 20; i++) {
    seasons.push(generateSeason());
  }
  return seasons;
};

export const createMockLeagueSeasons = (): Record<
  number,
  Writeable<Season>[]
> => {
  const challengeSeasons: Record<number, Writeable<Season>[]> = {};
  Object.values(leagues).forEach((league) => {
    const seasons = createMockSeasons();
    challengeSeasons[league.id] = seasons;
  });
  return challengeSeasons;
};

export const mockSeasons = createMockSeasons();
export const mockLeagueSeasons = createMockLeagueSeasons();
