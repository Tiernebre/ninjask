import {
  Box,
  Column,
  Columns,
  Container,
  PageSpinner,
  Title,
} from "@tiernebre/kecleon";
import { ChallengeResultsTable, ChallengeResultForm } from "./components";
import { ChallengeViewHeader } from "./components/ChallengeViewHeader";
import { useChallenge } from "./hooks";

export const ChallengeView = (): JSX.Element | null => {
  const {
    challenge,
    results,
    userIsInChallenge,
    userOwnsChallenge,
    existingResultForUser,
    submitResult,
    addUserToChallenge,
    removeUserFromChallenge,
    deleteChallenge,
    generateDraftPool,
  } = useChallenge();

  const participantsColumnSize = userIsInChallenge ? 8 : 12;

  if (challenge && results) {
    return (
      <Container as="section">
        <ChallengeViewHeader
          challenge={challenge}
          inChallenge={userIsInChallenge}
          ownsChallenge={userOwnsChallenge}
          onLeaveChallenge={removeUserFromChallenge}
          onJoinChallenge={addUserToChallenge}
          onDeleteChallenge={deleteChallenge}
          onGenerateDraftPool={generateDraftPool}
        />
        <Columns>
          <Column size={participantsColumnSize}>
            <Box>
              <Title level={4}>Participants</Title>
              <ChallengeResultsTable results={results} />
            </Box>
          </Column>
          {userIsInChallenge && (
            <Column size={4}>
              <Box>
                <Title level={4}>Submit Your Result</Title>
                <ChallengeResultForm
                  onSubmit={submitResult}
                  existingResult={existingResultForUser}
                />
              </Box>
            </Column>
          )}
        </Columns>
      </Container>
    );
  } else {
    return <PageSpinner />;
  }
};
