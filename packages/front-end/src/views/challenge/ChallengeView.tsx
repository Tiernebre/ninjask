import {
  Box,
  Column,
  Columns,
  Container,
  Title,
  useAlerts,
  useDidMount,
} from "@tiernebre/kecleon";
import { useState, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  Challenge,
  ChallengeResult,
  HttpChallengeParticipantService,
  HttpChallengeService,
  HttpClient,
  SessionPayload,
} from "../../api";
import {
  ChallengeResultsTable,
  ChallengeResultForm,
  ChallengeResultFormData,
} from "./components";
import { ChallengeViewHeader } from "./components/ChallengeViewHeader";

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
  const [challenge, setChallenge] = useState<Challenge>();
  const [results, setResults] = useState<ChallengeResult[]>([]);
  const { showAlert } = useAlerts();

  const challengeService = useMemo(
    () => new HttpChallengeService(httpClient),
    [httpClient]
  );
  const challengeParticipantService = useMemo(
    () => new HttpChallengeParticipantService(httpClient),
    [httpClient]
  );

  const existingResultForUser = results.find(
    (result) => result.participantId === session.userId
  );
  const userIsInChallenge = !!existingResultForUser;
  const userOwnsChallenge = challenge?.creatorId === session.userId;

  const fetchChallenge = useCallback(async () => {
    setChallenge(await challengeService.getOneById(Number(id)));
    setResults(await challengeService.getResultsForChallenge(Number(id)));
  }, [challengeService, id]);

  const submitResult = useCallback(
    async (formData: ChallengeResultFormData) => {
      if (existingResultForUser) {
        await challengeParticipantService.updateOne(
          existingResultForUser.resultId,
          {
            completionTimeHour: formData.hour,
            completionTimeMinutes: formData.minutes,
          }
        );
        await fetchChallenge();
        showAlert({
          message: "Challenge Submission Successfully Submitted",
          color: "success",
        });
      }
    },
    [
      challengeParticipantService,
      existingResultForUser,
      showAlert,
      fetchChallenge,
    ]
  );

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
