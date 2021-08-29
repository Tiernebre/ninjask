import { useCallback, useState } from "react";
import { Container, HeadingGroup, useDidMount } from "@tiernebre/kecleon";
import { Challenge } from "../../api";
import { ChallengeTable } from "../../components";
import { useChallengesApi } from "../../hooks";

export const Home = (): JSX.Element => {
  const { getChallengesForCurrentUser } = useChallengesApi();
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  const fetchChallenges = useCallback(async () => {
    setChallenges(await getChallengesForCurrentUser());
  }, [getChallengesForCurrentUser]);

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
