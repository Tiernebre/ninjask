import "./ChallengeView.scss";
import { useState, useCallback, useMemo } from "react";
import { useParams } from "react-router";
import { useDidMount } from "rooks";
import { Challenge, HttpChallengeService } from "../../api/challenge";
import { HttpClient } from "../../api/http";
import { HeadingGroup } from "../../components/heading-group";
import { ChallengeResult } from "../../api/challenge/ChallengeResult";
import { SessionPayload } from "../../api/session";
import { ChallengeParticipants } from "./components/participants/ChallengeParticipants";
import { ChallengeVersion } from "./components/version/ChallengeVersion";
import { ChallengeViewActions } from "./components/ChallengeViewActions";

type ChallengeViewParams = {
  id?: string;
};

type ChallengeViewProps = {
  httpClient: HttpClient;
  sessionPayload: SessionPayload;
};

export const ChallengeView = ({
  httpClient,
  sessionPayload,
}: ChallengeViewProps) => {
  const { id } = useParams<ChallengeViewParams>();
  const [challenge, setChallenge] = useState<Challenge>();
  const [results, setResults] = useState<ChallengeResult[]>([]);

  const challengeService = useMemo(
    () => new HttpChallengeService(httpClient),
    [httpClient]
  );

  const fetchChallenge = useCallback(async () => {
    setChallenge(await challengeService.getOneById(Number(id)));
    setResults(await challengeService.getResultsForChallenge(Number(id)));
  }, [challengeService, id]);

  useDidMount(() => {
    fetchChallenge();
  });

  return challenge ? (
    <div className="container px-4">
      <header className="ChallengeView__header mb-5">
        <HeadingGroup
          title={challenge.name}
          subtitle={challenge.description}
          alignment="left"
        />
        <div className="ChallengeView__header-buttons">
          <ChallengeViewActions
            isOwner={sessionPayload.userId === challenge.creatorId}
          />
        </div>
      </header>
      <div className="columns">
        <div className="column is-9">
          <div className="card">
            <div className="card-content">
              <ChallengeParticipants participants={results} />
            </div>
          </div>
        </div>
        <div className="column is-3">
          <div className="card">
            <div className="card-content">
              <ChallengeVersion versionId={challenge.versionId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
