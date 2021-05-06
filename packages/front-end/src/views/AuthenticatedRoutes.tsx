import { Fragment, useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { FetchHttpClient, HttpClient } from "../api/http";
import { DraftPoolView } from "./DraftPoolView";
import { DraftView } from "./DraftView";
import { Home } from "./Home";
import { LiveDraftPoolView } from "./LiveDraftPoolView";

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

  useEffect(() => {
    setAuthedHttpClient(buildAuthedHttpClient(accessToken));
  }, [accessToken]);

  return (
    <Fragment>
      <Route path={homeRoutes} exact>
        <Home httpClient={authedHttpClient} />
      </Route>
      <Route path="/challenges/:challengeId/draft">
        <DraftView httpClient={authedHttpClient} />
      </Route>
      <Route path="/drafts/:draftId/live-pool" exact>
        <LiveDraftPoolView />
      </Route>
      <Route path="/drafts/:draftId/pool" exact>
        <DraftPoolView />
      </Route>
    </Fragment>
  );
};
