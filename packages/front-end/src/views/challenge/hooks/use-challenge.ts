import { useParams } from "react-router-dom";
import { useDidMount } from "rooks";
import {
  useHttp,
  ChallengeApiHookReturnValue,
  useGetChallengeApi,
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
  ChallengeApiHookReturnValue;

export const useChallenge = (): ChallengeHookReturnValue => {
  const session = useSessionPayload();
  const { httpClient } = useHttp();
  const { id } = useParams<ChallengeViewParams>();
  const challengeId = Number(id);
  const challengeApi = useGetChallengeApi({
    challengeId,
  });
  const challengeResultsApi = useChallengeResultsApi({
    challengeId,
    httpClient,
    session,
  });

  useDidMount(() => {
    void Promise.all([
      challengeApi.fetchChallenge(),
      challengeResultsApi.fetchChallengeResults(),
    ]);
  });

  return {
    ...challengeResultsApi,
    ...challengeApi,
  };
};
