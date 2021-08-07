import { useCallback, useState } from "react";
import { Season } from "../../../api";
import { useSeasonsApi } from "./use-season-api";

type GetSeasonHookReturnValue = {
  season?: Season;
  fetchSeason: () => Promise<void>;
};

export const useGetSeason = (id: number): GetSeasonHookReturnValue => {
  const [season, setSeason] = useState<Season>();

  const { getSeasonById } = useSeasonsApi();

  const fetchSeason = useCallback(async () => {
    setSeason(await getSeasonById(id));
  }, [id, getSeasonById]);

  return {
    season,
    fetchSeason,
  };
};
