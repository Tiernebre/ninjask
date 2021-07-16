import {
  Box,
  Column,
  Columns,
  Container,
  HeadingGroup,
  Title,
  useDidMount,
} from "@tiernebre/kecleon";
import React, { useState, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  Challenge,
  ChallengeResult,
  HttpChallengeService,
  HttpClient,
} from "../../api";
import { ChallengeResultsTable } from "./components";
import { ChallengeResultForm } from "./components/ChallengeResultForm";

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
            <ChallengeResultForm onSubmit={(data) => console.log(data)} />
          </Box>
        </Column>
      </Columns>
    </Container>
  ) : null;
};
