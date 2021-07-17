import { useState, useMemo, useCallback } from "react";
import {
  Challenge,
  HttpChallengeService,
  HttpClient,
  SessionPayload,
} from "../../../api";

export type ChallengeHookParameters = {
  challengeId: number;
  httpClient: HttpClient;
  session: SessionPayload;
};

export type ChallengeHookReturnValue = {
  challenge: Challenge | undefined;
  userOwnsChallenge: boolean;
  fetchChallenge: () => Promise<void>;
};

export const useChallengeApi = ({
  challengeId,
  httpClient,
  session,
}: ChallengeHookParameters): ChallengeHookReturnValue => {
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
