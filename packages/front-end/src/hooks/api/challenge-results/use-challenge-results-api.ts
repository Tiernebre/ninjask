import { useAlerts } from "@tiernebre/kecleon";
import { useState, useMemo, useCallback } from "react";
import { ChallengeResult, HttpChallengeParticipantService } from "../../../api";
import { ChallengeParticipantUpdateRequest } from "../../../api/challenge/ChallengeParticipantUpdateRequest";
import { useHttp } from "../../http";
import { useSessionPayload } from "../../session";

export type ChallengeResultsApiHookReturnValue = {
  results: ChallengeResult[] | undefined;
  userIsInChallenge: boolean;
  existingResultForUser: ChallengeResult | undefined;
  submitResult: (request: ChallengeParticipantUpdateRequest) => Promise<void>;
  fetchChallengeResults: () => Promise<void>;
  addUserToChallenge: () => Promise<void>;
  removeUserFromChallenge: () => Promise<void>;
};

export type ChallengeResultsApiHookParameters = {
  challengeId: number;
};

export const useChallengeResultsApi = ({
  challengeId,
}: ChallengeResultsApiHookParameters): ChallengeResultsApiHookReturnValue => {
  const { httpClient } = useHttp();
  const session = useSessionPayload();
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

  const fetchChallengeResults = useCallback(async () => {
    setResults(
      await challengeParticipantService.getAllForChallenge(challengeId)
    );
  }, [challengeParticipantService, challengeId]);

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
        await fetchChallengeResults();
      }
    },
    [
      challengeParticipantService,
      existingResultForUser,
      showAlert,
      fetchChallengeResults,
    ]
  );

  return {
    results,
    existingResultForUser,
    userIsInChallenge,
    submitResult,
    fetchChallengeResults,
    addUserToChallenge: async () => {
      await challengeParticipantService.addMeToChallenge(challengeId);
      await fetchChallengeResults();
    },
    removeUserFromChallenge: async () => {
      await challengeParticipantService.removeMeFromChallenge(challengeId);
      await fetchChallengeResults();
    },
  };
};
