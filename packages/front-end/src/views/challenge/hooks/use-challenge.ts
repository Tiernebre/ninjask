import { useAlerts } from "@tiernebre/kecleon";
import { useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
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
  const history = useHistory();
  const { id } = useParams<ChallengeViewParams>();
  const { showAlert } = useAlerts();
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

  const deleteChallenge = useCallback(async () => {
    await challengeApi.deleteChallenge();
    showAlert({ color: "success", message: "Successfully Deleted Challenge" });
    history.push("/");
  }, [challengeApi, showAlert, history]);

  return {
    ...challengeResultsApi,
    ...challengeApi,
    deleteChallenge,
  };
};
