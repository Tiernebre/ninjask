import { Fragment } from "react";
import { Route } from "react-router-dom";
import { Home } from "..";
import { ChallengeView } from "../challenge";
import { useSession } from "../../hooks";

type AuthenticatedRoutesProps = {
  homeRoutes: string[];
};

export const AuthenticatedRoutes = ({
  homeRoutes,
}: AuthenticatedRoutesProps): JSX.Element | null => {
  const { sessionPayload } = useSession();

  return sessionPayload ? (
    <Fragment>
      <Route path={homeRoutes} exact>
        <Home />
      </Route>
      <Route path="/challenges/:id">
        <ChallengeView />
      </Route>
    </Fragment>
  ) : null;
};
