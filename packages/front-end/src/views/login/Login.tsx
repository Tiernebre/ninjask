import styles from "./Login.module.scss";
import { useCallback, useState } from "react";
import { useHistory } from "react-router";
import { SessionRequest } from "../../api";
import { LoginForm } from "../../components";
import { useAlerts } from "@tiernebre/kecleon";
import { useSession } from "../../hooks";

export const Login = (): JSX.Element => {
  const { setSession, sessionService } = useSession();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { showAlert } = useAlerts();

  const submitLogin = useCallback(
    async (sessionRequest: SessionRequest) => {
      try {
        setLoading(true);
        setSession(await sessionService.createOne(sessionRequest));
        history.push("/home");
      } catch (error) {
        console.error(error);
        setLoading(false);
        showAlert({
          message: "Could Not Login, Please Double Check your Credentials",
          color: "danger",
        });
      }
    },
    [history, setSession, sessionService, showAlert]
  );

  return (
    <div className={`${styles.container} container p-5`}>
      <div className={styles.content}>
        <h1 className={`${styles.heading} title is-spaced`}>
          Welcome to Ninjask!
        </h1>
        <h2 className="subtitle">
          Please fill out your login information below to start drafting and
          tracking your Pokémon challenges!
        </h2>
        <LoginForm onSubmit={submitLogin} loading={loading} />
      </div>
    </div>
  );
};
