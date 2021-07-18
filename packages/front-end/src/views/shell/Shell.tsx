import styles from "./Shell.module.scss";
import { Route, Switch } from "react-router-dom";
import { SmartAlerts } from "@tiernebre/kecleon";
import { HttpSessionService, Session, FetchHttpClient } from "../../api";
import { useCallback, useState } from "react";
import { AuthenticatedRoutes, Login } from "..";
import {
  Header,
  Footer,
  SessionChecker,
  SessionRefresher,
} from "../../components";
import { useSession } from "../../hooks";

const backEndHttpClient = new FetchHttpClient(
  process.env.REACT_APP_BACK_END_API_HTTP_URL
);
const sessionService = new HttpSessionService(backEndHttpClient);

/**
 * Shell should be the direct child of the App component and all of its
 * necessary wrapping provider elements. This is where the true business
 * logic of Ninjask begins.
 */
export const Shell = (): JSX.Element => {
  const { session, setSession, accessToken } = useSession();

  const loginRoutes = ["/login"];
  const homeRoutes = ["/home"];

  if (accessToken) {
    homeRoutes.push("/");
  } else {
    loginRoutes.push("/");
  }

  return (
    <div className={styles.container}>
      <SessionRefresher
        sessionService={sessionService}
        onSessionRefresh={setSession}
        onSessionRefreshFail={logOut}
        session={session}
      >
        <SmartAlerts />
        <Header onLogOut={logOut} isAuthenticated={!!accessToken} />
        <main className={styles.content}>
          <Switch>
            <Route path={loginRoutes} exact>
              <Login sessionService={sessionService} onSuccess={setSession} />
            </Route>
            <SessionChecker
              accessToken={accessToken}
              sessionService={sessionService}
              onExpiredSession={logOut}
            >
              <AuthenticatedRoutes
                accessToken={accessToken}
                homeRoutes={homeRoutes}
              />
            </SessionChecker>
          </Switch>
        </main>
        <Footer />
      </SessionRefresher>
    </div>
  );
};
