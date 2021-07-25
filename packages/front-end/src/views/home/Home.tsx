import "./Home.scss";
import { useCallback, useState } from "react";
import { useDidMount } from "@tiernebre/kecleon";
import { Challenge, HttpChallengeService } from "../../api";
import { ChallengeTable } from "../../components";
import { useHttp } from "../../hooks";

export const Home = (): JSX.Element => {
  const { httpClient } = useHttp();
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
      <h1 className="title">Your Current Challenges</h1>
      <ChallengeTable challenges={challenges} />
    </main>
  );
};
