import { useCallback } from "react";
import { Challenge, League, Season } from "../../../api";
import { useHttp } from "../../http";

type LeaguesApi = {
  getLeagues: () => Promise<League[]>;
  getLeagueById: (id: number) => Promise<League>;
  getSeasonsForOne: (id: number) => Promise<Season[]>;
  getChallengesForOne: (id: number) => Promise<Challenge[]>;
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

  const getChallengesForOne = useCallback(
    (id: number) => {
      return httpClient.get<Challenge[]>(`leagues/${id}/challenges`);
    },
    [httpClient]
  );

  return {
    getLeagues,
    getLeagueById,
    getSeasonsForOne,
    getChallengesForOne,
  };
};
