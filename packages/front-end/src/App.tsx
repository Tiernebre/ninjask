import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from "./views/Login";
import { HttpSessionService } from "./api/session";
import { FetchHttpClient } from "./api/http";
import { Footer } from "./components/layout/Footer";
import { Home } from "./views/Home";

const backEndHttpClient = new FetchHttpClient(
  process.env.REACT_APP_BACK_END_API_HTTP_URL
);
const sessionService = new HttpSessionService(backEndHttpClient);

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={["/", "/login"]}>
            <Login sessionService={sessionService} />
          </Route>
          <Route path="/home">
            <Home accessToken="some-sample-token" />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
