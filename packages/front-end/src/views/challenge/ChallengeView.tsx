import {
  Box,
  Column,
  Columns,
  Container,
  Title,
  useDidMount,
} from "@tiernebre/kecleon";
import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { HttpClient, SessionPayload } from "../../api";
import { ChallengeResultsTable, ChallengeResultForm } from "./components";
import { ChallengeViewHeader } from "./components/ChallengeViewHeader";
import { useChallengeApi, useChallengeResultsApi } from "./hooks";

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
  const { challenge, fetchChallenge, userOwnsChallenge } = useChallengeApi({
    challengeId: Number(id),
    httpClient,
    session,
  });
  const {
    existingResultForUser,
    results,
    submitResult,
    userIsInChallenge,
    fetchChallengeResults,
  } = useChallengeResultsApi({
    challengeId: Number(id),
    httpClient,
    session,
  });

  const refreshChallenge = useCallback(async () => {
    await Promise.all([fetchChallenge(), fetchChallengeResults]);
  }, [fetchChallenge, fetchChallengeResults]);

  useDidMount(() => {
    void refreshChallenge();
  });

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
