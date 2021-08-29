import { Challenge } from "../../../api";
import { useState, useCallback } from "react";
import { useChallengesApi } from "./use-challenges-api";

export type UseGetChallengesReturnValue = {
  fetchChallenges: () => Promise<void>;
  challenges: Challenge[];
};

export const useGetChallenges = (): UseGetChallengesReturnValue => {
  const { getAllChallenges } = useChallengesApi();
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  const fetchChallenges = useCallback(async () => {
    setChallenges(await getAllChallenges());
  }, [getAllChallenges]);

  return {
    challenges,
    fetchChallenges,
  };
};
