import "./ChallengeView.scss";
import { useState, useCallback } from "react";
import { useParams } from "react-router";
import { useDidMount } from "rooks";
import { Challenge, HttpChallengeService } from "../../api/challenge";
import { HttpClient } from "../../api/http";
import { HeadingGroup } from "../../components/heading-group";
import { ChallengeResults } from "../../components/challenge/challenge-results";
import { ChallengeResult } from "../../api/challenge/ChallengeResult";
import { ChallengeResultAction } from "../../components/challenge/challenge-results/ChallengeResultAction";

type ChallengeViewParams = {
  id?: string;
};

type ChallengeViewProps = {
  httpClient: HttpClient;
};

export const ChallengeView = ({ httpClient }: ChallengeViewProps) => {
  const { id } = useParams<ChallengeViewParams>();
  const [challenge, setChallenge] = useState<Challenge>();
  const [results, setResults] = useState<ChallengeResult[]>();

  const fetchChallenge = useCallback(async () => {
    const challengeService = new HttpChallengeService(httpClient);
    setChallenge(await challengeService.getOneById(Number(id)));
  }, [httpClient, id]);

  const fetchChallengeResults = useCallback(async () => {
    const challengeService = new HttpChallengeService(httpClient);
    setResults(await challengeService.getResultsForChallenge(Number(id)));
  }, [httpClient, id]);

  useDidMount(() => {
    fetchChallenge();
    fetchChallengeResults();
  });

  return challenge && results ? (
    <div className="ChallengeView">
      <HeadingGroup title={challenge.name} subtitle={challenge.description} />
      <div className="columns">
        <div className="column is-6">
          <ChallengeResults results={results} />
        </div>
        <div className="column is-6">
          <ChallengeResultAction />
        </div>
      </div>
    </div>
  ) : (
    <p>Loading Challenge...</p>
  );
};
