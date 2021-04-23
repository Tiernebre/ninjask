import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from "./views/Login";
import { HttpSessionService } from "./api/session";
import { FetchHttpClient } from "./api/http";

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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
