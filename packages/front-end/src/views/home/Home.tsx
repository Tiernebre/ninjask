import { useCallback, useState } from "react";
import { Container, HeadingGroup, useDidMount } from "@tiernebre/kecleon";
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
    <Container className="p-5" as="section">
      <HeadingGroup title="Your Current Challenges" />
      <ChallengeTable challenges={challenges} />
    </Container>
  );
};
