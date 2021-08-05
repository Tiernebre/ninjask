import { useCallback, useState } from "react";
import { League } from "../../../api";
import { useLeaguesApi } from "./use-leagues-api";

type GetLeaguesHookReturnValue = {
  leagues: League[];
  fetchLeagues: () => Promise<void>;
};

export const useGetLeagues = (): GetLeaguesHookReturnValue => {
  const [leagues, setLeagues] = useState<League[]>([]);
  const { getLeagues } = useLeaguesApi();

  const fetchLeagues = useCallback(async () => {
    setLeagues(await getLeagues());
  }, [getLeagues]);

  return {
    leagues,
    fetchLeagues,
  };
};
