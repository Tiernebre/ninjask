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

const ONE_MINUTE_IN_MS = 60000;

const backEndHttpClient = new FetchHttpClient(
  process.env.REACT_APP_BACK_END_API_HTTP_URL
);
const sessionService = new HttpSessionService(backEndHttpClient);

const App = () => {
  const [accessToken, setAccessToken] = useState<string>();
  const [
    sessionRefreshTimestamp,
    setSessionRefreshTimestamp,
  ] = useState<number>();

  const logOut = useCallback(async () => {
    setAccessToken(undefined);
    setSessionRefreshTimestamp(undefined);
    await sessionService.deleteCurrentSession();
  }, []);

  const logIn = useCallback(async (session: Session) => {
    setAccessToken(session.accessToken);
    setSessionRefreshTimestamp(
      session.accessTokenExpiration - ONE_MINUTE_IN_MS - Date.now()
    );
  }, []);

  return (
    <div className="App">
      <SessionRefresher
        sessionService={sessionService}
        onSessionRefresh={logIn}
        onSessionRefreshFail={logOut}
        sessionRefreshTimestamp={sessionRefreshTimestamp}
      >
        <Header onLogOut={logOut} isAuthenticated={!!accessToken} />
        <Router>
          <Switch>
            <Route path={["/", "/login"]} exact>
              <Login sessionService={sessionService} onSuccess={logIn} />
            </Route>
            <SessionChecker accessToken={accessToken}>
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
