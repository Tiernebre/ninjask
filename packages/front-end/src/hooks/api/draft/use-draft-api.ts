import { useCallback } from "react";
import { Pokemon, DraftSelection, Draft } from "../../../api";
import { useHttp } from "../../http";

type DraftApi = {
  getPoolForDraft: (draftId: number) => Promise<Pokemon[]>;
  generatePoolForDraft: (draftId: number) => Promise<void>;
  getSelectionsForDraft: (draftId: number) => Promise<DraftSelection[]>;
  generateSelectionsForDraft: (draftId: number) => Promise<DraftSelection[]>;
  getDraftForChallenge: (challengeId: number) => Promise<Draft>;
};

export const useDraftApi = (): DraftApi => {
  const { httpClient } = useHttp();

  const getPoolForDraft = useCallback(
    (draftId: number) => {
      return httpClient.get<Pokemon[]>(`drafts/${draftId}/pool`);
    },
    [httpClient]
  );

  const generatePoolForDraft = useCallback(
    async (draftId: number) => {
      await httpClient.post(`drafts/${draftId}/pool`);
    },
    [httpClient]
  );

  const getSelectionsForDraft = useCallback(
    (draftId: number) => {
      return httpClient.get<DraftSelection[]>(`drafts/${draftId}/selections`);
    },
    [httpClient]
  );

  const generateSelectionsForDraft = useCallback(
    (draftId: number) => {
      return httpClient.post<DraftSelection[]>(`drafts/${draftId}/selections`);
    },
    [httpClient]
  );

  const getDraftForChallenge = useCallback(
    (challengeId: number) => {
      return httpClient.get<Draft>(`challenges/${challengeId}/draft`);
    },
    [httpClient]
  );

  return {
    getPoolForDraft,
    generatePoolForDraft,
    getSelectionsForDraft,
    generateSelectionsForDraft,
    getDraftForChallenge,
  };
};
