import "./Login.scss";
import { useCallback, useState } from "react";
import { useHistory } from "react-router";
import { SessionService, Session, SessionRequest } from "../api";
import { LoginForm } from "../components";
import { useAlerts } from "@tiernebre/kecleon";

type LoginProps = {
  sessionService: SessionService;
  onSuccess: (session: Session) => void;
};

export const Login = ({
  sessionService,
  onSuccess,
}: LoginProps): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { showAlert } = useAlerts();

  const submitLogin = useCallback(
    async (sessionRequest: SessionRequest) => {
      try {
        setLoading(true);
        const session = await sessionService.createOne(sessionRequest);
        onSuccess(session);
        history.push("/home");
      } catch (error) {
        console.error(error);
        setLoading(false);
        showAlert({ message: "Could Not Login, Please Double Check your Credentials", color: "danger" })
      }
    },
    [onSuccess, history, sessionService, showAlert]
  );

  return (
    <div className="Login container p-5">
      <div className="Login__content">
        <h1 className="Login__heading title is-spaced">Welcome to Ninjask!</h1>
        <h2 className="subtitle">
          Please fill out your login information below to start drafting and
          tracking your Pokémon challenges!
        </h2>
        <LoginForm onSubmit={submitLogin} loading={loading} />
      </div>
    </div>
  );
};
