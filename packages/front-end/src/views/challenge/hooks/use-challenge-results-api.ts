import { useAlerts } from "@tiernebre/kecleon";
import { useState, useMemo, useCallback } from "react";
import {
  ChallengeResult,
  HttpChallengeParticipantService,
  HttpClient,
  SessionPayload,
} from "../../../api";
import { ChallengeParticipantUpdateRequest } from "../../../api/challenge/ChallengeParticipantUpdateRequest";

export type ChallengeResultsApiHookReturnValue = {
  results: ChallengeResult[] | undefined;
  userIsInChallenge: boolean;
  existingResultForUser: ChallengeResult | undefined;
  submitResult: (request: ChallengeParticipantUpdateRequest) => Promise<void>;
  fetchChallengeResults: () => Promise<void>;
};

export type ChallengeResultsApiHookParameters = {
  challengeId: number;
  httpClient: HttpClient;
  session: SessionPayload;
};

export const useChallengeResultsApi = ({
  challengeId,
  httpClient,
  session,
}: ChallengeResultsApiHookParameters): ChallengeResultsApiHookReturnValue => {
  const [results, setResults] = useState<ChallengeResult[]>([]);
  const { showAlert } = useAlerts();

  const challengeParticipantService = useMemo(
    () => new HttpChallengeParticipantService(httpClient),
    [httpClient]
  );

  const existingResultForUser = results.find(
    (result) => result.participantId === session.userId
  );
  const userIsInChallenge = !!existingResultForUser;

  const submitResult = useCallback(
    async (request: ChallengeParticipantUpdateRequest) => {
      if (existingResultForUser) {
        await challengeParticipantService.updateOne(
          existingResultForUser.resultId,
          request
        );
        showAlert({
          message: "Challenge Submission Successfully Submitted",
          color: "success",
        });
      }
    },
    [challengeParticipantService, existingResultForUser, showAlert]
  );

  const fetchChallengeResults = useCallback(async () => {
    setResults(
      await challengeParticipantService.getAllForChallenge(challengeId)
    );
  }, [challengeParticipantService, challengeId]);

  return {
    results,
    existingResultForUser,
    userIsInChallenge,
    submitResult,
    fetchChallengeResults,
  };
};