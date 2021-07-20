import { useParams } from "react-router-dom";
import { useDidMount } from "rooks";
import {
  ChallengeApiHookReturnValue,
  useGetChallengeApi,
  ChallengeResultsApiHookReturnValue,
  useChallengeResultsApi,
} from "../../../hooks";

type ChallengeViewParams = {
  id: string;
};

type ChallengeHookReturnValue = ChallengeResultsApiHookReturnValue &
  ChallengeApiHookReturnValue;

export const useChallenge = (): ChallengeHookReturnValue => {
  const { id } = useParams<ChallengeViewParams>();
  const challengeId = Number(id);
  const challengeApi = useGetChallengeApi({
    challengeId,
  });
  const challengeResultsApi = useChallengeResultsApi({
    challengeId,
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
