import { useCallback, useState } from "react";
import { League } from "../../../api";
import { useLeaguesApi } from "./use-leagues-api";

type GetLeagueHookReturnValue = {
  league: League | undefined;
  fetchLeague: () => Promise<void>;
};

type GetLeagueHookParameters = {
  id: number;
};

export const useGetLeague = ({
  id,
}: GetLeagueHookParameters): GetLeagueHookReturnValue => {
  const [league, setLeague] = useState<League>();
  const { getLeagueById } = useLeaguesApi();

  const fetchLeague = useCallback(async () => {
    setLeague(await getLeagueById(id));
  }, [id, getLeagueById]);

  return {
    league,
    fetchLeague,
  };
};
