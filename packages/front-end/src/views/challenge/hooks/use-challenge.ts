import { useAlerts } from "@tiernebre/kecleon";
import { useState, useMemo, useCallback } from "react";
import {
  Challenge,
  ChallengeResult,
  HttpChallengeParticipantService,
  HttpChallengeService,
  HttpClient,
  SessionPayload,
} from "../../../api";
import { ChallengeParticipantUpdateRequest } from "../../../api/challenge/ChallengeParticipantUpdateRequest";

export type ChallengeHookParameters = {
  challengeId: number;
  httpClient: HttpClient;
  session: SessionPayload;
};

export type ChallengeHookReturnValue = {
  challenge: Challenge | undefined;
  results: ChallengeResult[] | undefined;
  userIsInChallenge: boolean;
  userOwnsChallenge: boolean;
  submitResult: (request: ChallengeParticipantUpdateRequest) => Promise<void>;
};

export const useChallenge = ({
  challengeId,
  httpClient,
  session,
}: ChallengeHookParameters): ChallengeHookReturnValue => {
  const [challenge, setChallenge] = useState<Challenge>();
  const [results, setResults] = useState<ChallengeResult[]>([]);
  const { showAlert } = useAlerts();

  const challengeService = useMemo(
    () => new HttpChallengeService(httpClient),
    [httpClient]
  );
  const challengeParticipantService = useMemo(
    () => new HttpChallengeParticipantService(httpClient),
    [httpClient]
  );

  const existingResultForUser = results.find(
    (result) => result.participantId === session.userId
  );
  const userIsInChallenge = !!existingResultForUser;
  const userOwnsChallenge = challenge?.creatorId === session.userId;

  const fetchChallenge = useCallback(async () => {
    setChallenge(await challengeService.getOneById(challengeId));
    setResults(await challengeService.getResultsForChallenge(challengeId));
  }, [challengeService, challengeId]);

  const submitResult = useCallback(
    async (request: ChallengeParticipantUpdateRequest) => {
      if (existingResultForUser) {
        await challengeParticipantService.updateOne(
          existingResultForUser.resultId,
          request
        );
        await fetchChallenge();
        showAlert({
          message: "Challenge Submission Successfully Submitted",
          color: "success",
        });
      }
    },
    [
      challengeParticipantService,
      existingResultForUser,
      showAlert,
      fetchChallenge,
    ]
  );

  return {
    challenge,
    results,
    userIsInChallenge,
    userOwnsChallenge,
    submitResult,
  };
};
