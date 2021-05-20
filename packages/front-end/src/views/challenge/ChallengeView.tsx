import "./ChallengeView.scss";
import { useState, useCallback, useMemo } from "react";
import { useParams } from "react-router";
import { useDidMount } from "rooks";
import { Challenge, HttpChallengeService } from "../../api/challenge";
import { HttpClient } from "../../api/http";
import { HeadingGroup } from "../../components/heading-group";
import { ChallengeResults } from "../../components/challenge/challenge-results";
import { ChallengeResult } from "../../api/challenge/ChallengeResult";
import { ChallengeResultAction } from "../../components/challenge/challenge-results/ChallengeResultAction";
import { SessionPayload } from "../../api/session";
import { HttpChallengeParticipantService } from "../../api/challenge/HttpChallengeParticipantService";
import { ChallengeParticipantUpdateRequest } from "../../api/challenge/ChallengeParticipantUpdateRequest";

type ChallengeViewParams = {
  id?: string;
};

type ChallengeViewProps = {
  httpClient: HttpClient;
  sessionPayload?: SessionPayload;
};

export const ChallengeView = ({
  httpClient,
  sessionPayload,
}: ChallengeViewProps) => {
  const { id } = useParams<ChallengeViewParams>();
  const [challenge, setChallenge] = useState<Challenge>();
  const [results, setResults] = useState<ChallengeResult[]>();

  const challengeService = useMemo(
    () => new HttpChallengeService(httpClient),
    [httpClient]
  );
  const challengeParticipantService = useMemo(
    () => new HttpChallengeParticipantService(httpClient),
    [httpClient]
  );

  const fetchChallenge = useCallback(async () => {
    setChallenge(await challengeService.getOneById(Number(id)));
    setResults(await challengeService.getResultsForChallenge(Number(id)));
  }, [challengeService, id]);

  const updateChallengeResult = useCallback(
    async (id: number, data: ChallengeParticipantUpdateRequest) => {
      await challengeParticipantService.updateOne(id, data);
      await fetchChallenge();
    },
    [challengeParticipantService, fetchChallenge]
  );

  useDidMount(() => {
    fetchChallenge();
  });

  return challenge && results && sessionPayload ? (
    <div className="ChallengeView">
      <HeadingGroup title={challenge.name} subtitle={challenge.description} />
      <div className="columns">
        <div className="column is-6">
          <ChallengeResults results={results} />
        </div>
        <div className="column is-6">
          <ChallengeResultAction
            results={results}
            sessionPayload={sessionPayload}
            onSubmit={updateChallengeResult}
          />
        </div>
      </div>
    </div>
  ) : (
    <p>Loading Challenge...</p>
  );
};
