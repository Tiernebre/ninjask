import { Fragment } from "react";
import { Route } from "react-router-dom";
import { Home, ChallengeView, ChallengesView } from "..";
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
      <Route path="/challenges" exact>
        <ChallengesView />
      </Route>
      <Route path="/challenges/:id" exact>
        <ChallengeView />
      </Route>
    </Fragment>
  ) : null;
};
