import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDidMount } from "rooks";
import {
  useHttp,
  useSession,
  ChallengeApiHookReturnValue,
  useChallengeApi,
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
  const { sessionPayload: session } = useSession();
  if (!session) {
    throw new Error("Session Payload is required for Challenge API.");
  }
  const { httpClient } = useHttp();
  const { id } = useParams<ChallengeViewParams>();
  const challengeId = Number(id);
  const challengeApi = useChallengeApi({
    challengeId,
    httpClient,
    session,
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
