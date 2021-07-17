import {
  Box,
  Column,
  Columns,
  Container,
  Title,
  useDidMount,
} from "@tiernebre/kecleon";
import { useParams } from "react-router-dom";
import { HttpClient, SessionPayload } from "../../api";
import { ChallengeResultsTable, ChallengeResultForm } from "./components";
import { ChallengeViewHeader } from "./components/ChallengeViewHeader";
import { useChallengeApi } from "./hooks";

type ChallengeViewParams = {
  id: string;
};

type ChallengeProps = {
  httpClient: HttpClient;
  session: SessionPayload;
};

export const ChallengeView = ({
  httpClient,
  session,
}: ChallengeProps): JSX.Element | null => {
  const { id } = useParams<ChallengeViewParams>();
  const {
    challenge,
    existingResultForUser,
    results,
    submitResult,
    fetchChallenge,
    userIsInChallenge,
    userOwnsChallenge,
  } = useChallengeApi({
    challengeId: Number(id),
    httpClient,
    session,
  });

  useDidMount(() => {
    void fetchChallenge();
  });

  return challenge && results ? (
    <section>
      <Container>
        <ChallengeViewHeader
          challenge={challenge}
          inChallenge={userIsInChallenge}
          ownsChallenge={userOwnsChallenge}
          onJoinChallenge={() => console.log("Join")}
          onLeaveChallenge={() => console.log("Leave")}
        />
        <Columns>
          <Column size={8}>
            <Box>
              <Title level={4}>Participants</Title>
              <ChallengeResultsTable results={results} />
            </Box>
          </Column>
          <Column size={4}>
            <Box>
              <Title level={4}>Submit Your Result</Title>
              <ChallengeResultForm
                onSubmit={(data) =>
                  submitResult({
                    completionTimeHour: data.hour,
                    completionTimeMinutes: data.minutes,
                  })
                }
                existingResult={existingResultForUser}
              />
            </Box>
          </Column>
        </Columns>
      </Container>
    </section>
  ) : null;
};
