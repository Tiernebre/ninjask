import { useCallback } from "react";
import { League } from "../../../api";
import { useHttp } from "../../http";

type LeaguesApi = {
  getLeagues: () => Promise<League[]>;
  getLeagueById: (id: number) => Promise<League>;
};

export const useLeaguesApi = (): LeaguesApi => {
  const { httpClient } = useHttp();

  const getLeagues = useCallback(() => {
    return httpClient.get<League[]>("leagues");
  }, [httpClient]);

  const getLeagueById = useCallback(
    (id: number) => {
      return httpClient.get<League>(`leagues/${id}`);
    },
    [httpClient]
  );

  return {
    getLeagues,
    getLeagueById,
  };
};
