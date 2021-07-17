import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDidMount } from "rooks";
import { HttpClient, SessionPayload } from "../../../api";
import {
  ChallengeApiHookReturnValue,
  useChallengeApi,
} from "./use-challenge-api";
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

type ChallengeHookParameters = {
  httpClient: HttpClient;
  session: SessionPayload;
};

export const useChallenge = ({
  httpClient,
  session,
}: ChallengeHookParameters): ChallengeHookReturnValue => {
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
      challengeResultsApi.fetchChallengeResults,
    ]);
  }, [challengeApi, challengeResultsApi]);

  useDidMount(() => {
    void refreshChallenge();
  });

  return {
    refreshChallenge,
    ...challengeResultsApi,
    ...challengeApi,
  };
};
