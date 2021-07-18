import { useState, useMemo, useCallback } from "react";
import {
  Challenge,
  HttpChallengeService,
  HttpClient,
  SessionPayload,
} from "../../../api";

export type ChallengeApiHookParameters = {
  challengeId: number;
  httpClient: HttpClient;
  sessionPayload: SessionPayload;
};

export type ChallengeApiHookReturnValue = {
  challenge: Challenge | undefined;
  userOwnsChallenge: boolean;
  fetchChallenge: () => Promise<void>;
};

export const useChallengeApi = ({
  challengeId,
  httpClient,
  session,
}: ChallengeApiHookParameters): ChallengeApiHookReturnValue => {
  const [challenge, setChallenge] = useState<Challenge>();

  const challengeService = useMemo(
    () => new HttpChallengeService(httpClient),
    [httpClient]
  );

  const userOwnsChallenge = challenge?.creatorId === session.userId;

  const fetchChallenge = useCallback(async () => {
    setChallenge(await challengeService.getOneById(challengeId));
  }, [challengeService, challengeId]);

  return {
    challenge,
    fetchChallenge,
    userOwnsChallenge,
  };
};
