import { Season } from "../../../src/api";
import { generateSeason } from "./generate";

export const createMockSeasons = (): Season[] => {
  const seasons = [];
  for (let i = 0; i < 20; i++) {
    seasons.push(generateSeason());
  }
  return seasons;
};

export const seasons = createMockSeasons();
