import {
  Box,
  Column,
  Columns,
  Container,
  PageSpinner,
  Title,
} from "@tiernebre/kecleon";
import { ChallengeStatus } from "../../api";
import { ChallengeResultsTable, ChallengeResultForm } from "./components";
import { ChallengeViewHeader } from "./components/ChallengeViewHeader";
import { useChallenge } from "./hooks";

export const ChallengeView = (): JSX.Element | null => {
  const {
    challenge,
    draft,
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

  if (challenge && results && draft) {
    const challengeIsDrafted = challenge.status === ChallengeStatus.DRAFTED;
    const showResultForm = userIsInChallenge && challengeIsDrafted;
    const participantsColumnSize = showResultForm ? 8 : 12;
    return (
      <Container as="section">
        <ChallengeViewHeader
          challenge={challenge}
          draft={draft}
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
          {showResultForm && (
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
