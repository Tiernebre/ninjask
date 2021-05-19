import "./ChallengeView.scss";
import { useState, useCallback } from "react";
import { useParams } from "react-router";
import { useDidMount } from "rooks";
import { Challenge, HttpChallengeService } from "../../api/challenge";
import { HttpClient } from "../../api/http"

type ChallengeViewParams = {
  id?: string;
};

type ChallengeViewProps = {
  httpClient: HttpClient
}

export const ChallengeView = ({ httpClient }: ChallengeViewProps) => {
  const { id }= useParams<ChallengeViewParams>()
  const [challenge, setChallenge] = useState<Challenge>();

  const fetchChallenge = useCallback(async () => {
    const challengeService = new HttpChallengeService(httpClient);
    setChallenge(await challengeService.getOneById(Number(id)));
  }, [httpClient, id]);

  useDidMount(() => {
    fetchChallenge();
  });

  return challenge ? (
    <div className="ChallengeView">
      <header>
        <h1 className="title">{challenge.name}</h1>
        <p className="subtitle">{challenge.description}</p>
      </header>
    </div>
  ) : (
    <p>Loading Challenge...</p>
  )
}