import { useCallback, useState } from "react";
import { useDidMount } from "rooks";
import { Challenge, HttpChallengeService } from "../api/challenge";
import { HttpClient } from "../api/http";
import { ChallengeTable } from "../components/challenge/challenge-table";
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
  });

  return (
    <main className="Home p-5">
      <h1 className="title">Challenges</h1>
      <ChallengeTable challenges={challenges} />
    </main>
  );
};
