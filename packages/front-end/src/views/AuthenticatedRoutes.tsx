import { Fragment, useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { FetchHttpClient, HttpClient } from "../api/http";
import { HttpSessionService, SessionPayload } from "../api/session";
import { DraftView } from "./DraftView";
import { Home } from "./Home";

type AuthenticatedRoutesProps = {
  accessToken?: string;
  homeRoutes: string[];
};

const buildAuthedHttpClient = (accessToken?: string) =>
  new FetchHttpClient(process.env.REACT_APP_BACK_END_API_HTTP_URL, accessToken);

export const AuthenticatedRoutes = ({
  homeRoutes,
  accessToken,
}: AuthenticatedRoutesProps) => {
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

  return (
    <Fragment>
      <Route path={homeRoutes} exact>
        <Home httpClient={authedHttpClient} />
      </Route>
      <Route path="/challenges/:challengeId/draft">
        <DraftView
          httpClient={authedHttpClient}
          sessionPayload={sessionPayload}
        />
      </Route>
    </Fragment>
  );
};
