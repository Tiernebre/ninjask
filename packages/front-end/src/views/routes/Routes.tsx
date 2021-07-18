import { Switch, Route } from "react-router-dom";
import { AuthenticatedRoutes } from "./AuthenticatedRoutes";
import { Login } from "..";
import { SessionChecker } from "../../components";
import { useSession } from "../../hooks";

export const Routes = (): JSX.Element => {
  const { accessToken } = useSession();

  const loginRoutes = ["/login"];
  const homeRoutes = ["/home"];

  if (accessToken) {
    homeRoutes.push("/");
  } else {
    loginRoutes.push("/");
  }

  return (
    <Switch>
      <Route path={loginRoutes} exact>
        <Login />
      </Route>
      <SessionChecker>
        <AuthenticatedRoutes homeRoutes={homeRoutes} />
      </SessionChecker>
    </Switch>
  );
};
