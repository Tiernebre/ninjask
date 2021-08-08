import { useCallback } from "react";
import { Draft } from "../../../api";
import { useHttp } from "../../http";

type DraftApi = {
  getOneForChallengeId(challengeId: number): Promise<Draft>;
};

export const useDraftApi = (): DraftApi => {
  const { httpClient } = useHttp();

  const getOneForChallengeId = useCallback(
    (challengeId: number) => {
      return httpClient.get<Draft>(`challenges/${challengeId}/draft`);
    },
    [httpClient]
  );

  return {
    getOneForChallengeId,
  };
};
