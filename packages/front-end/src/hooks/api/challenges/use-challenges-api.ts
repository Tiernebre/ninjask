import { Challenge, HttpChallengeService } from "../../../api";
import { useHttp } from "../../";
import { useState, useMemo } from "react";

export type UseGetChallengesReturnValue = {
  challenges: Challenge[];
};

export const useGetChallengesApi = (): UseGetChallengesReturnValue => {
  const { httpClient } = useHttp();
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  const challengeService = useMemo(
    () => new HttpChallengeService(httpClient),
    [httpClient]
  );

  return {
    challenges: [],
  };
};
