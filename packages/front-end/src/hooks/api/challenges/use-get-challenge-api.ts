import { useState, useMemo, useCallback } from "react";
import { Challenge, HttpChallengeService } from "../../../api";
import { useHttp } from "../../http";
import { useSessionPayload } from "../../session";

export type ChallengeApiHookParameters = {
  challengeId: number;
};

export type ChallengeApiHookReturnValue = {
  challenge: Challenge | undefined;
  userOwnsChallenge: boolean;
  fetchChallenge: () => Promise<void>;
};

export const useGetChallengeApi = ({
  challengeId,
}: ChallengeApiHookParameters): ChallengeApiHookReturnValue => {
  const sessionPayload = useSessionPayload();
  const { httpClient } = useHttp();
  const [challenge, setChallenge] = useState<Challenge>();

  const challengeService = useMemo(
    () => new HttpChallengeService(httpClient),
    [httpClient]
  );

  const userOwnsChallenge = challenge?.creatorId === sessionPayload.userId;

  const fetchChallenge = useCallback(async () => {
    setChallenge(await challengeService.getOneById(challengeId));
  }, [challengeService, challengeId]);

  return {
    challenge,
    fetchChallenge,
    userOwnsChallenge,
  };
};
