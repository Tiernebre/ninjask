import { useCallback, useEffect, useState } from "react";
import { Season } from "../../../api";
import { useSeasonsApi } from "./use-season-api";

type GetSeasonsHookReturnValue = {
  seasons: Season[];
  fetchSeasons: () => Promise<void>;
};

export const useGetSeasons = (): GetSeasonsHookReturnValue => {
  const { getSeasons } = useSeasonsApi();
  const [seasons, setSeasons] = useState<Season[]>([]);

  const fetchSeasons = useCallback(async () => {
    setSeasons(await getSeasons());
  }, [getSeasons]);

  useEffect(() => {
    void fetchSeasons();
  }, [fetchSeasons]);

  return {
    seasons,
    fetchSeasons,
  };
};
