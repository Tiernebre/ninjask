import { useCallback } from "react";
import { Season } from "../../../api";
import { useHttp } from "../../http";

type SeasonsApi = {
  getSeasons: () => Promise<Season[]>;
  getSeasonById: (id: number) => Promise<Season>;
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

  return {
    getSeasons,
    getSeasonById,
  };
};
