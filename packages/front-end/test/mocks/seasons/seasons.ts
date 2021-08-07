import { Season } from "../../../src/api";
import { Writeable } from "../../types";
import { generateSeason } from "./generate";

export const createMockSeasons = (): Record<number, Writeable<Season>> => {
  const seasons: Record<number, Writeable<Season>> = {};
  for (let i = 0; i < 20; i++) {
    const season = generateSeason();
    seasons[season.id] = season;
  }
  return seasons;
};

export const seasons = createMockSeasons();
