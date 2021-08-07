import { Challenge, League } from "../../../src/api";
import { Writeable } from "../../types";
import { generateMockChallenges } from "../challenge/generate";
import { generateLeague } from "./generate";

const createLeagues = (): Record<number, Writeable<League>> => {
  const leagues: Record<number, Writeable<League>> = {};
  for (let i = 0; i < 10; i++) {
    const league = generateLeague();
    leagues[league.id] = league;
  }
  return leagues;
};

const leagues: Record<number, Writeable<League>> = createLeagues();

const createLeagueChallenges = (): Record<number, Writeable<Challenge[]>> => {
  const leagueChallenges: Record<number, Writeable<Challenge[]>> = {};
  Object.values(leagues).forEach((league) => {
    const challenges = generateMockChallenges();
    leagueChallenges[league.id] = challenges;
  });
  return leagueChallenges;
};

const leagueChallenges: Record<
  number,
  Writeable<Challenge[]>
> = createLeagueChallenges();

export { leagues, leagueChallenges };
