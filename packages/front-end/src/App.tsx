import styles from "./App.module.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AlertsProvider, SmartAlerts } from "@tiernebre/kecleon";
import { HttpSessionService, Session, FetchHttpClient } from "./api";
import { useCallback, useState } from "react";
import { AuthenticatedRoutes, Login } from "./views";
import { Header, Footer, SessionChecker, SessionRefresher } from "./components";

const backEndHttpClient = new FetchHttpClient(
  process.env.REACT_APP_BACK_END_API_HTTP_URL
);
const sessionService = new HttpSessionService(backEndHttpClient);

const App = (): JSX.Element => {
  const [session, setSession] = useState<Session>();

  const accessToken = session?.accessToken;

  const logOut = useCallback(async () => {
    setSession(undefined);
    await sessionService.deleteCurrentSession();
  }, []);

  const loginRoutes = ["/login"];
  const homeRoutes = ["/home"];

  if (accessToken) {
    homeRoutes.push("/");
  } else {
    loginRoutes.push("/");
  }

  return (
    <Router>
      <div className={styles.App}>
        <SessionRefresher
          sessionService={sessionService}
          onSessionRefresh={setSession}
          onSessionRefreshFail={logOut}
          session={session}
        >
          <AlertsProvider>
            <SmartAlerts />
            <Header onLogOut={logOut} isAuthenticated={!!accessToken} />
            <main className={styles.App__content}>
              <Switch>
                <Route path={loginRoutes} exact>
                  <Login
                    sessionService={sessionService}
                    onSuccess={setSession}
                  />
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
              <Route></Route>
            </main>
            <Footer />
          </AlertsProvider>
        </SessionRefresher>
      </div>
    </Router>
  );
};

export default App;
