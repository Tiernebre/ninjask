import {
  Container,
  HeadingGroup,
  IconButton,
  Level,
  useDidMount,
} from "@tiernebre/kecleon";
import { ChallengeTable } from "../../components";
import { useGetChallengesApi } from "../../hooks";

export const ChallengesView = (): JSX.Element => {
  const { challenges, fetchChallenges } = useGetChallengesApi();

  useDidMount(() => {
    void fetchChallenges();
  });

  return (
    <Container as="section">
      <Level
        as="header"
        left={
          <div>
            <HeadingGroup
              title="Challenges"
              subtitle="View and join challenges from other leagues"
            />
          </div>
        }
        right={
          <IconButton
            icon={{ name: "plus" }}
            color="success"
            link={{
              to: "/challenges/create",
            }}
          >
            Create Challenge
          </IconButton>
        }
      />
      <ChallengeTable challenges={challenges} />
    </Container>
  );
};
