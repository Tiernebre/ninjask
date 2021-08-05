import { useCallback } from "react";
import { League, Season } from "../../../api";
import { useHttp } from "../../http";

type LeaguesApi = {
  getLeagues: () => Promise<League[]>;
  getLeagueById: (id: number) => Promise<League>;
  getSeasonsForOne: (id: number) => Promise<Season[]>;
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

  const getSeasonsForOne = useCallback(
    (id: number) => {
      return httpClient.get<Season[]>(`leagues/${id}/seasons`);
    },
    [httpClient]
  );

  return {
    getLeagues,
    getLeagueById,
    getSeasonsForOne,
  };
};
