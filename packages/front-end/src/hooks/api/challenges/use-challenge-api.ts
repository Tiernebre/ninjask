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
  deleteChallenge: () => Promise<void>;
};

/**
 * useGetChallengeApi is a hook that fetches a challenge
 * and its result into state and provides an API of operations
 * on that specific challenge and its results.
 *
 * This hook is used for a singular Challenge ID and requires
 * a given challenge ID. If you're looking to retrieve multiple
 * challenges use {@link use-get-challenges-api.ts} instead.
 */
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

  const deleteChallenge = useCallback(async () => {
    await challengeService.deleteOneById(challengeId);
    setChallenge(undefined);
  }, [challengeService, challengeId]);

  return {
    challenge,
    fetchChallenge,
    userOwnsChallenge,
    deleteChallenge,
  };
};
