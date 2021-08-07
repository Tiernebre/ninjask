import { useCallback, useState } from "react";
import { Challenge, Season } from "../../../api";
import { useSeasonsApi } from "./use-season-api";

type GetSeasonHookReturnValue = {
  season?: Season;
  challenges: Challenge[];
  fetchSeason: () => Promise<void>;
};

export const useGetSeason = (id: number): GetSeasonHookReturnValue => {
  const [season, setSeason] = useState<Season>();
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  const { getSeasonById, getChallengesForOne } = useSeasonsApi();

  const fetchSeason = useCallback(async () => {
    const [season, challenges] = await Promise.all([
      getSeasonById(id),
      getChallengesForOne(id),
    ]);
    setSeason(season);
    setChallenges(challenges);
  }, [id, getSeasonById, getChallengesForOne]);

  return {
    season,
    challenges,
    fetchSeason,
  };
};
