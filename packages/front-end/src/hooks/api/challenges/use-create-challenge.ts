import { useCallback, useMemo } from "react";
import {
  Challenge,
  CreateChallengeRequest,
  HttpChallengeService,
} from "../../../api";
import { useHttp } from "../../http";

type CreateChallengeReturnValue = {
  createChallenge: (request: CreateChallengeRequest) => Promise<Challenge>;
};

export const useCreateChallenge = (): CreateChallengeReturnValue => {
  const { httpClient } = useHttp();

  const challengeService = useMemo(
    () => new HttpChallengeService(httpClient),
    [httpClient]
  );

  const createChallenge = useCallback(
    (request: CreateChallengeRequest) => {
      return challengeService.createOne(request);
    },
    [challengeService]
  );

  return {
    createChallenge,
  };
};
