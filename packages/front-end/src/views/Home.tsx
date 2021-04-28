import { useCallback, useEffect, useState } from "react";
import { Challenge, HttpChallengeService } from "../api/challenge";
import { HttpClient } from "../api/http";
import { ChallengeTable } from "../components/challenge/ChallengeTable";
import './Home.scss'

type HomeProps = {
  accessToken?: string;
  httpClient: HttpClient;
};

export const Home = ({ accessToken, httpClient }: HomeProps) => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  const fetchChallenges = useCallback(async () => {
    const challengeService = new HttpChallengeService(httpClient);
    setChallenges(await challengeService.getAllForCurrentUser());
  }, [httpClient]);

  useEffect(() => {
    fetchChallenges();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="Home">
      <h1 className="title">Challenges</h1>
      <ChallengeTable challenges={challenges} />
    </main>
  );
};
