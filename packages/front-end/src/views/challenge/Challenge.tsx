import {
  Box,
  Container,
  HeadingGroup,
  Title,
  useDidMount,
} from "@tiernebre/kecleon";
import { useState, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  Challenge,
  ChallengeResult,
  HttpChallengeService,
  HttpClient,
} from "../../api";
import { ChallengeResultsTable } from "./components";

type ChallengeViewParams = {
  id: string;
};

type ChallengeProps = {
  httpClient: HttpClient;
};

export const ChallengeView = ({
  httpClient,
}: ChallengeProps): JSX.Element | null => {
  const { id } = useParams<ChallengeViewParams>();
  const [challenge, setChallenge] = useState<Challenge>();
  const [results, setResults] = useState<ChallengeResult[]>([]);

  const challengeService = useMemo(
    () => new HttpChallengeService(httpClient),
    [httpClient]
  );

  const fetchChallenge = useCallback(async () => {
    setChallenge(await challengeService.getOneById(Number(id)));
    setResults(await challengeService.getResultsForChallenge(Number(id)));
  }, [challengeService, id]);

  useDidMount(() => {
    void fetchChallenge();
  });

  return challenge && results ? (
    <Container>
      <HeadingGroup
        spaced
        title={challenge.name}
        subtitle={challenge.description}
      />
      <Box>
        <Title level={5}>Participants</Title>
        <ChallengeResultsTable results={results} />
      </Box>
    </Container>
  ) : null;
};
