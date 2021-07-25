import { Container, HeadingGroup, useDidMount } from "@tiernebre/kecleon";
import { ChallengeTable } from "../../components";
import { useGetChallengesApi } from "../../hooks";

export const ChallengesView = (): JSX.Element => {
  const { challenges, fetchChallenges } = useGetChallengesApi();

  useDidMount(() => {
    void fetchChallenges();
  });

  return (
    <Container as="section">
      <HeadingGroup
        title="Challenges"
        subtitle="View and join challenges from other leagues"
      />
      <ChallengeTable challenges={challenges} />
    </Container>
  );
};
