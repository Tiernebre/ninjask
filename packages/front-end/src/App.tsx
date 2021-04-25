import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from "./views/Login";
import { HttpSessionService, Session } from "./api/session";
import { FetchHttpClient } from "./api/http";
import { Footer } from "./components/layout/Footer";
import { Home } from "./views/Home";
import { useCallback, useState } from "react";
import { SessionChecker } from "./components/session/SessionChecker";
import { Header } from "./components/layout/Header";
import { SessionRefresher } from "./components/session/SessionRefresher";

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

  return (
    <div className="App">
      <SessionRefresher
        sessionService={sessionService}
        onSessionRefresh={setSession}
        onSessionRefreshFail={logOut}
        sessionRefreshTimestamp={sessionRefreshTimestampInMillis}
      >
        <Header onLogOut={logOut} isAuthenticated={!!accessToken} />
        <Router>
          <Switch>
            <Route path={["/", "/login"]} exact>
              <Login sessionService={sessionService} onSuccess={setSession} />
            </Route>
            <SessionChecker
              accessToken={accessToken}
              sessionService={sessionService}
              onExpiredSession={logOut}
            >
              <Route path="/home">
                <Home accessToken={accessToken} />
              </Route>
            </SessionChecker>
          </Switch>
        </Router>
        <Footer />
      </SessionRefresher>
    </div>
  );
};

export default App;
