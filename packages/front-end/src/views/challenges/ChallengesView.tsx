import { Container, useDidMount } from "@tiernebre/kecleon";
import { useGetChallengesApi } from "../../hooks";

export const ChallengesView = (): JSX.Element => {
  const { challenges, fetchChallenges } = useGetChallengesApi();

  return (
    <Container>
      <div>Challenges w00t!</div>
    </Container>
  );
};
