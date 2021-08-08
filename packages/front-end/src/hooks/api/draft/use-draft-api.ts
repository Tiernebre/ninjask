import { useCallback } from "react";
import { Draft } from "../../../api";
import { useHttp } from "../../http";

type DraftApi = {
  getDraftForChallengeId: (challengeId: number) => Promise<Draft>;
};

export const useDraftApi = (): DraftApi => {
  const { httpClient } = useHttp();

  const getDraftForChallengeId = useCallback(
    (challengeId: number) => {
      return httpClient.get<Draft>(`challenges/${challengeId}/draft`);
    },
    [httpClient]
  );

  return {
    getDraftForChallengeId,
  };
};
