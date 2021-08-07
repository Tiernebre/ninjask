import { useCallback } from "react";
import { Challenge, Season } from "../../../api";
import { useHttp } from "../../http";

type SeasonsApi = {
  getSeasons: () => Promise<Season[]>;
  getSeasonById: (id: number) => Promise<Season>;
  getChallengesForOne: (id: number) => Promise<Challenge[]>;
};

export const useSeasonsApi = (): SeasonsApi => {
  const { httpClient } = useHttp();

  const getSeasons = useCallback(() => {
    return httpClient.get<Season[]>("seasons");
  }, [httpClient]);

  const getSeasonById = useCallback(
    (id: number) => {
      return httpClient.get<Season>(`seasons/${id}`);
    },
    [httpClient]
  );

  const getChallengesForOne = useCallback(
    (id: number) => {
      return httpClient.get<Challenge[]>(`seasons/${id}/challenges`);
    },
    [httpClient]
  );

  return {
    getSeasons,
    getSeasonById,
    getChallengesForOne,
  };
};
