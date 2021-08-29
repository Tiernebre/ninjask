import {
  Container,
  HeadingGroup,
  IconButton,
  Level,
  useDidMount,
} from "@tiernebre/kecleon";
import { ChallengeTable } from "../../components";
import { useGetChallenges } from "../../hooks";

export const ChallengesView = (): JSX.Element => {
  const { challenges, fetchChallenges } = useGetChallenges();

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
              to: "/create-challenge",
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
