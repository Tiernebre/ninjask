import { useCallback } from "react";
import { Draft } from "../../../api";
import { useHttp } from "../../http";

type DraftApi = {
  getDraftForChallengeId: (challengeId: number) => Promise<Draft>;
  generatePoolForDraft: (draftId: number) => Promise<void>;
};

export const useDraftApi = (): DraftApi => {
  const { httpClient } = useHttp();

  const getDraftForChallengeId = useCallback(
    (challengeId: number) => {
      return httpClient.get<Draft>(`challenges/${challengeId}/draft`);
    },
    [httpClient]
  );

  const generatePoolForDraft = useCallback(
    async (draftId: number) => {
      await httpClient.post(`drafts/${draftId}/pool`);
    },
    [httpClient]
  );

  return {
    getDraftForChallengeId,
    generatePoolForDraft,
  };
};
