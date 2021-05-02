import { useCallback, useState } from "react";
import { useDidMount } from "rooks";
import { Challenge, HttpChallengeService } from "../api/challenge";
import { HttpClient } from "../api/http";
import { ChallengeTable } from "../components/challenge/ChallengeTable";
import "./Home.scss";

type HomeProps = {
  httpClient: HttpClient;
};

export const Home = ({ httpClient }: HomeProps) => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  const fetchChallenges = useCallback(async () => {
    const challengeService = new HttpChallengeService(httpClient);
    setChallenges(await challengeService.getAllForCurrentUser());
  }, [httpClient]);

  useDidMount(() => {
    fetchChallenges();
  })

  return (
    <main className="Home">
      <h1 className="title">Home</h1>
      <ChallengeTable challenges={challenges} />
    </main>
  );
};
