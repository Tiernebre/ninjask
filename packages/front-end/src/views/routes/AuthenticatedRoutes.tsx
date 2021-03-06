import { Fragment } from "react";
import { Route } from "react-router-dom";
import { Home, ChallengeView, ChallengesView } from "..";
import { useSession } from "../../hooks";
import { CreateChallengeView } from "../challenge/CreateChallengeView";
import { DraftPoolView } from "../draft-pool";
import { LeagueView } from "../league";
import { LeaguesView } from "../leagues";
import { LiveDraftView } from "../live-draft";
import { LiveDraftPoolView } from "../live-draft-pool";
import { SeasonView } from "../season";

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
      <Route path="/challenges/:id" exact>
        <ChallengeView />
      </Route>
      <Route path="/challenges" exact>
        <ChallengesView />
      </Route>
      <Route path="/create-challenge">
        <CreateChallengeView />
      </Route>
      <Route path="/leagues/:id" exact>
        <LeagueView />
      </Route>
      <Route path="/leagues" exact>
        <LeaguesView />
      </Route>
      <Route path="/seasons/:id" exact>
        <SeasonView />
      </Route>
      <Route path="/challenges/:challengeId/live-draft-pool" exact>
        <LiveDraftPoolView />
      </Route>
      <Route path="/drafts/:draftId/pool" exact>
        <DraftPoolView />
      </Route>
      <Route path="/challenges/:challengeId/live-draft" exact>
        <LiveDraftView />
      </Route>
    </Fragment>
  ) : null;
};
