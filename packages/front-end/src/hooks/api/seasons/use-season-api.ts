import { useCallback } from "react";
import { Season } from "../../../api";
import { useHttp } from "../../http";

type SeasonApi = {
  getSeasons: () => Promise<Season[]>;
};

export const useSeasonApi = (): SeasonApi => {
  const { httpClient } = useHttp();

  const getSeasons = useCallback(() => {
    return httpClient.get<Season[]>("seasons");
  }, [httpClient]);

  return {
    getSeasons,
  };
};
