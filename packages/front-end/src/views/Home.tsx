import "./Home.scss";
import { useCallback, useState } from "react";
import { useDidMount } from "rooks";
import { Challenge, HttpClient, HttpChallengeService } from "../api";
import { ChallengeTable } from "../components";

type HomeProps = {
  httpClient: HttpClient;
};

export const Home = ({ httpClient }: HomeProps): JSX.Element => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  const fetchChallenges = useCallback(async () => {
    const challengeService = new HttpChallengeService(httpClient);
    setChallenges(await challengeService.getAllForCurrentUser());
  }, [httpClient]);

  useDidMount(() => {
    void fetchChallenges();
  });

  return (
    <main className="Home container p-5">
      <h1 className="title">Challenges</h1>
      <ChallengeTable challenges={challenges} />
    </main>
  );
};
