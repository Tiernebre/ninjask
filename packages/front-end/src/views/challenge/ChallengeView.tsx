import { Box, Column, Columns, Container, Title } from "@tiernebre/kecleon";
import { HttpClient, SessionPayload } from "../../api";
import { ChallengeResultsTable, ChallengeResultForm } from "./components";
import { ChallengeViewHeader } from "./components/ChallengeViewHeader";
import { useChallenge } from "./hooks";

type ChallengeProps = {
  httpClient: HttpClient;
  session: SessionPayload;
};

export const ChallengeView = ({
  httpClient,
  session,
}: ChallengeProps): JSX.Element | null => {
  const {
    challenge,
    results,
    userIsInChallenge,
    userOwnsChallenge,
    existingResultForUser,
    submitResult,
  } = useChallenge({ httpClient, session });

  const participantsColumnSize = userIsInChallenge ? 8 : 12;

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
          <Column size={participantsColumnSize}>
            <Box>
              <Title level={4}>Participants</Title>
              <ChallengeResultsTable results={results} />
            </Box>
          </Column>
          <Column size={4}>
            <Box>
              <Title level={4}>Submit Your Result</Title>
              <ChallengeResultForm
                onSubmit={submitResult}
                existingResult={existingResultForUser}
              />
            </Box>
          </Column>
        </Columns>
      </Container>
    </section>
  ) : null;
};
