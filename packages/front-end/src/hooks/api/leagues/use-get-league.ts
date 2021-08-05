import { useCallback, useState } from "react";
import { League, Season } from "../../../api";
import { useLeaguesApi } from "./use-leagues-api";

type GetLeagueHookReturnValue = {
  league: League | undefined;
  seasons: Season[];
  fetchLeague: () => Promise<void>;
};

type GetLeagueHookParameters = {
  id: number;
};

export const useGetLeague = ({
  id,
}: GetLeagueHookParameters): GetLeagueHookReturnValue => {
  const [league, setLeague] = useState<League>();
  const [seasons, setSeasons] = useState<Season[]>([]);
  const { getLeagueById, getSeasonsForOne } = useLeaguesApi();

  const fetchLeague = useCallback(async () => {
    const [league, seasons] = await Promise.all([
      getLeagueById(id),
      getSeasonsForOne(id),
    ]);
    setLeague(league);
    setSeasons(seasons);
  }, [id, getLeagueById, getSeasonsForOne]);

  return {
    league,
    seasons,
    fetchLeague,
  };
};
