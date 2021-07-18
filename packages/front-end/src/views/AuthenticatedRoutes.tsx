import { Fragment, useEffect, useState } from "react";
import { Route } from "react-router-dom";
import {
  FetchHttpClient,
  HttpClient,
  HttpSessionService,
  SessionPayload,
} from "../api";
import { Home } from ".";
import { ChallengeView } from "./challenge";
import { useSession } from "../hooks";

type AuthenticatedRoutesProps = {
  homeRoutes: string[];
};

const buildAuthedHttpClient = (accessToken?: string) =>
  new FetchHttpClient(process.env.REACT_APP_BACK_END_API_HTTP_URL, accessToken);

export const AuthenticatedRoutes = ({
  homeRoutes,
}: AuthenticatedRoutesProps): JSX.Element | null => {
  const { accessToken } = useSession();

  const [authedHttpClient, setAuthedHttpClient] = useState<HttpClient>(
    buildAuthedHttpClient(accessToken)
  );
  const [sessionPayload, setSessionPayload] = useState<SessionPayload>();

  useEffect(() => {
    setAuthedHttpClient(buildAuthedHttpClient(accessToken));
  }, [accessToken]);

  useEffect(() => {
    if (authedHttpClient && accessToken) {
      const sessionService = new HttpSessionService(authedHttpClient);
      setSessionPayload(
        sessionService.getSessionPayloadFromAccessToken(accessToken)
      );
    }
  }, [authedHttpClient, accessToken]);

  return sessionPayload ? (
    <Fragment>
      <Route path={homeRoutes} exact>
        <Home httpClient={authedHttpClient} />
      </Route>
      <Route path="/challenges/:id">
        <ChallengeView httpClient={authedHttpClient} session={sessionPayload} />
      </Route>
    </Fragment>
  ) : null;
};
