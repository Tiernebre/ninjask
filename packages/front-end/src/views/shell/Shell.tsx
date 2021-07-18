import styles from "./Shell.module.scss";
import { Route, Switch } from "react-router-dom";
import { SmartAlerts } from "@tiernebre/kecleon";
import { AuthenticatedRoutes, Login } from "..";
import {
  Header,
  Footer,
  SessionChecker,
  SessionRefresher,
} from "../../components";
import { useSession } from "../../hooks";

/**
 * Shell should be the direct child of the App component and all of its
 * necessary wrapping provider elements. This is where the true business
 * logic of Ninjask begins.
 */
export const Shell = (): JSX.Element => {
  const { setSession, accessToken, sessionService } = useSession();

  const loginRoutes = ["/login"];
  const homeRoutes = ["/home"];

  if (accessToken) {
    homeRoutes.push("/");
  } else {
    loginRoutes.push("/");
  }

  return (
    <div className={styles.container}>
      <SessionRefresher>
        <SmartAlerts />
        <Header />
        <main className={styles.content}>
          <Switch>
            <Route path={loginRoutes} exact>
              <Login sessionService={sessionService} onSuccess={setSession} />
            </Route>
            <SessionChecker>
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
