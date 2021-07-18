import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDidMount } from "rooks";
import {
  useHttp,
  ChallengeApiHookReturnValue,
  useChallengeApi,
  useSessionPayload,
} from "../../../hooks";
import {
  ChallengeResultsApiHookReturnValue,
  useChallengeResultsApi,
} from "./use-challenge-results-api";

type ChallengeViewParams = {
  id: string;
};

type ChallengeHookReturnValue = ChallengeResultsApiHookReturnValue &
  ChallengeApiHookReturnValue & {
    refreshChallenge: () => Promise<void>;
  };

export const useChallenge = (): ChallengeHookReturnValue => {
  const session = useSessionPayload();
  const { httpClient } = useHttp();
  const { id } = useParams<ChallengeViewParams>();
  const challengeId = Number(id);
  const challengeApi = useChallengeApi({
    challengeId,
  });
  const challengeResultsApi = useChallengeResultsApi({
    challengeId,
    httpClient,
    session,
  });

  const refreshChallenge = useCallback(async () => {
    await Promise.all([
      challengeApi.fetchChallenge(),
      challengeResultsApi.fetchChallengeResults(),
    ]);
  }, [challengeApi, challengeResultsApi]);

  useDidMount(() => {
    void refreshChallenge();
  });

  return {
    ...challengeResultsApi,
    ...challengeApi,
    refreshChallenge,
  };
};
