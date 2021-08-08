import { useCallback } from "react";
import { Pokemon } from "../../../api";
import { useHttp } from "../../http";

type DraftApi = {
  getPoolForDraft: (draftId: number) => Promise<Pokemon[]>;
  generatePoolForDraft: (draftId: number) => Promise<void>;
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

  return {
    getPoolForDraft,
    generatePoolForDraft,
  };
};
