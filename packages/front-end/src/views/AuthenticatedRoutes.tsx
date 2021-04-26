import { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { FetchHttpClient, HttpClient } from "../api/http";
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

  useEffect(() => {
    setAuthedHttpClient(buildAuthedHttpClient(accessToken));
  }, [accessToken]);

  return (
    <Route path={homeRoutes} exact>
      {authedHttpClient && (
        <Home accessToken={accessToken} httpClient={authedHttpClient} />
      )}
    </Route>
  );
};
