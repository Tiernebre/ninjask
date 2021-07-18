import { useState, useMemo, useCallback } from "react";
import {
  Challenge,
  HttpChallengeService,
  HttpClient,
  SessionPayload,
} from "../../../api";
import { useHttp } from "../../http";
import { useSession } from "../../session";

export type ChallengeApiHookParameters = {
  challengeId: number;
  httpClient: HttpClient;
  session: SessionPayload;
};

export type ChallengeApiHookReturnValue = {
  challenge: Challenge | undefined;
  userOwnsChallenge: boolean;
  fetchChallenge: () => Promise<void>;
};

export const useChallengeApi = ({
  challengeId,
}: ChallengeApiHookParameters): ChallengeApiHookReturnValue => {
  const { sessionPayload: session } = useSession();
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
