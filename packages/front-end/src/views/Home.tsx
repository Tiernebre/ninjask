import { Fragment, useCallback, useEffect, useState } from "react";
import { Challenge, HttpChallengeService } from "../api/challenge";
import { HttpClient } from "../api/http";

type HomeProps = {
  accessToken?: string;
  httpClient: HttpClient
};

export const Home = ({ accessToken, httpClient }: HomeProps) => {
  const [challenges, setChallenges] = useState<Challenge[]>([])

  const fetchChallenges = useCallback(async () => {
    const challengeService = new HttpChallengeService(httpClient)
    setChallenges(await challengeService.getAllForCurrentUser())
  }, [httpClient])

  useEffect(() => {
    fetchChallenges()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const listedChallenges = challenges.map(challenge => (
    <li key={challenge.id}>
      <p>{JSON.stringify(challenge)}</p>
    </li>
  ))

  return (
    <Fragment>
      <p>Welcome Home {accessToken}.</p>
      {listedChallenges}
    </Fragment>
  );
};
