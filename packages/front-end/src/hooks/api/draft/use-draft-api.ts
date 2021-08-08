import { useCallback } from "react";
import { Pokemon } from "../../../api";
import { useHttp } from "../../http";

type DraftApi = {
  getPoolForDraft: (draftId: number) => Promise<Pokemon[]>;
};

export const useDraftApi = (): DraftApi => {
  const { httpClient } = useHttp();

  const getPoolForDraft = useCallback(
    (draftId: number) => {
      return httpClient.get<Pokemon[]>(`draft/${draftId}/pool`);
    },
    [httpClient]
  );

  return {
    getPoolForDraft,
  };
};
