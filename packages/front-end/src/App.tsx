import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from "./views/Login";
import { HttpSessionService, Session } from "./api/session";
import { FetchHttpClient } from "./api/http";
import { Footer } from "./components/layout/Footer";
import { useCallback, useState } from "react";
import { SessionChecker } from "./components/session/SessionChecker";
import { Header } from "./components/layout/Header";
import { SessionRefresher } from "./components/session/SessionRefresher";
import { AuthenticatedRoutes } from "./views/AuthenticatedRoutes";

const ONE_MINUTE_IN_SECONDS = 60;

const backEndHttpClient = new FetchHttpClient(
  process.env.REACT_APP_BACK_END_API_HTTP_URL
);
const sessionService = new HttpSessionService(backEndHttpClient);

const secondsSinceEpoch = () => Math.round(Date.now() / 1000);

const App = () => {
  const [accessToken, setAccessToken] = useState<string>();
  const [
    sessionRefreshTimestampInMillis,
    setSessionRefreshTimestampInMillis,
  ] = useState<number>();

  const logOut = useCallback(async () => {
    setAccessToken(undefined);
    setSessionRefreshTimestampInMillis(undefined);
    await sessionService.deleteCurrentSession();
  }, []);

  const setSession = useCallback(async (session: Session) => {
    setAccessToken(session.accessToken);
    setSessionRefreshTimestampInMillis(
      (session.accessTokenExpiration -
        ONE_MINUTE_IN_SECONDS -
        secondsSinceEpoch()) *
        1000
    );
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
      <SessionRefresher
        sessionService={sessionService}
        onSessionRefresh={setSession}
        onSessionRefreshFail={logOut}
        sessionRefreshTimestamp={sessionRefreshTimestampInMillis}
      >
        <div className="App">
          <Header onLogOut={logOut} isAuthenticated={!!accessToken} />
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
          <Footer />
        </div>
      </SessionRefresher>
    </Router>
  );
};

export default App;
