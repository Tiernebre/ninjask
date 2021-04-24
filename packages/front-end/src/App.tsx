import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from "./views/Login";
import { HttpSessionService } from "./api/session";
import { FetchHttpClient } from "./api/http";
import { Footer } from "./components/layout/Footer";
import { Home } from "./views/Home";
import { useState } from "react";
import { SessionChecker } from "./components/session/SessionChecker";
import { Header } from "./components/layout/Header";
import { SessionRefresher } from "./components/session/SessionRefresher";

const backEndHttpClient = new FetchHttpClient(
  process.env.REACT_APP_BACK_END_API_HTTP_URL
);
const sessionService = new HttpSessionService(backEndHttpClient);

const App = () => {
  const [accessToken, setAccessToken] = useState<string>();

  const logOut = async () => {
    setAccessToken(undefined)
    await sessionService.deleteCurrentSession()
  }

  return (
    <div className="App">
      <SessionRefresher sessionService={sessionService} onSessionRefresh={setAccessToken} onSessionRefreshFail={logOut}>
        <Header onLogOut={logOut} isAuthenticated={!!accessToken}/>
        <Router>
          <Switch>
            <Route path={["/", "/login"]} exact>
              <Login sessionService={sessionService} onSuccess={setAccessToken} />
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
