import { League } from "../../../src/api";
import { Writeable } from "../../types";
import { generateLeague } from "./generate";

const createLeagues = (): Record<number, Writeable<League>> => {
  const leagues: Record<number, Writeable<League>> = {};
  for (let i = 0; i < 10; i++) {
    const league = generateLeague();
    leagues[league.id] = league;
  }
  return leagues;
};

export const leagues: Record<number, Writeable<League>> = createLeagues();
