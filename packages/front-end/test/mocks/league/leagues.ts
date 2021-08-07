import { Challenge, League, Season } from "../../../src/api";
import { Writeable } from "../../types";
import { generateMockChallenges } from "../challenge/generate";
import { generateSeasons } from "../seasons";
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

const createLeagueSeasons = (): Record<number, Writeable<Season[]>> => {
  const leagueSeasons: Record<number, Writeable<Season[]>> = {};
  Object.values(leagues).forEach((league) => {
    const seasons = generateSeasons();
    leagueSeasons[league.id] = seasons;
  });
  return leagueSeasons;
};

const leagueSeasons: Record<
  number,
  Writeable<Season[]>
> = createLeagueSeasons();

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

export { leagues, leagueSeasons, leagueChallenges };
