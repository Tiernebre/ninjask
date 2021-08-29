import { useAlerts, useDidMount } from "@tiernebre/kecleon";
import { useCallback, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  ChallengeApiHookReturnValue,
  useGetChallenge,
  ChallengeResultsApiHookReturnValue,
  useChallengeResultsApi,
  useDraftApi,
} from "../../../hooks";

type ChallengeViewParams = {
  id: string;
};

type ChallengeHookReturnValue = ChallengeResultsApiHookReturnValue &
  ChallengeApiHookReturnValue & {
    generateDraftPool: () => Promise<void>;
    loading: boolean;
  };

export const useChallenge = (): ChallengeHookReturnValue => {
  const { id } = useParams<ChallengeViewParams>();
  const [loading, setLoading] = useState<boolean>();
  const history = useHistory();
  const { showAlert } = useAlerts();
  const challengeId = Number(id);
  const challengeApi = useGetChallenge({
    challengeId,
  });
  const challengeResultsApi = useChallengeResultsApi({
    challengeId,
  });
  const { generatePoolForDraft } = useDraftApi();

  useDidMount(() => {
    void Promise.all([
      challengeApi.fetchChallenge(),
      challengeResultsApi.fetchChallengeResults(),
    ]);
  });

  const deleteChallenge = useCallback(async () => {
    setLoading(true);
    await challengeApi.deleteChallenge();
    setLoading(false);
    showAlert({ color: "success", message: "Successfully Deleted Challenge" });
    history.push("/home");
  }, [challengeApi, showAlert, history]);

  const generateDraftPool = useCallback(async () => {
    if (challengeApi.draft) {
      setLoading(true);
      await generatePoolForDraft(challengeApi.draft.id);
      await challengeApi.fetchChallenge();
      showAlert({ color: "success", message: "Generated Pool for Draft" });
      setLoading(false);
    }
  }, [challengeApi, generatePoolForDraft, showAlert]);

  return {
    ...challengeResultsApi,
    ...challengeApi,
    deleteChallenge,
    generateDraftPool,
    loading,
  };
};
