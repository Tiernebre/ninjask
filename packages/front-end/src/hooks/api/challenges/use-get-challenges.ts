import { Challenge, HttpChallengeService } from "../../../api";
import { useHttp } from "../..";
import { useState, useMemo, useCallback } from "react";

export type UseGetChallengesReturnValue = {
  fetchChallenges: () => Promise<void>;
  challenges: Challenge[];
};

export const useGetChallenges = (): UseGetChallengesReturnValue => {
  const { httpClient } = useHttp();
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  const challengeService = useMemo(
    () => new HttpChallengeService(httpClient),
    [httpClient]
  );

  const fetchChallenges = useCallback(async () => {
    setChallenges(await challengeService.getAll());
  }, [challengeService]);

  return {
    challenges,
    fetchChallenges,
  };
};
