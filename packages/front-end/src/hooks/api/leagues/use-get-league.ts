import { useCallback, useState } from "react";
import { Challenge, League, Season } from "../../../api";
import { useLeaguesApi } from "./use-leagues-api";

type GetLeagueHookReturnValue = {
  league: League | undefined;
  seasons: Season[];
  challenges: Challenge[];
  fetchLeague: () => Promise<void>;
  loaded: boolean;
};

type GetLeagueHookParameters = {
  id: number;
};

export const useGetLeague = ({
  id,
}: GetLeagueHookParameters): GetLeagueHookReturnValue => {
  const [league, setLeague] = useState<League>();
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  const { getLeagueById, getSeasonsForOne, getChallengesForOne } =
    useLeaguesApi();

  const fetchLeague = useCallback(async () => {
    const [league, seasons, challenges] = await Promise.all([
      getLeagueById(id),
      getSeasonsForOne(id),
      getChallengesForOne(id),
    ]);
    setLeague(league);
    setSeasons(seasons);
    setChallenges(challenges);
    setLoaded(true);
  }, [id, getLeagueById, getSeasonsForOne, getChallengesForOne]);

  return {
    league,
    seasons,
    fetchLeague,
    challenges,
    loaded,
  };
};
