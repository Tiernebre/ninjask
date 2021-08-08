import { useCallback } from "react";
import { Pokemon, DraftSelection } from "../../../api";
import { useHttp } from "../../http";

type DraftApi = {
  getPoolForDraft: (draftId: number) => Promise<Pokemon[]>;
  generatePoolForDraft: (draftId: number) => Promise<void>;
  getSelectionsForDraft: (draftId: number) => Promise<DraftSelection[]>;
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

  return {
    getPoolForDraft,
    generatePoolForDraft,
    getSelectionsForDraft,
  };
};
