import { useCallback, useState } from "react";
import { useHistory } from "react-router";
import { SessionService, Session } from "../api/session";
import { SessionRequest } from "../api/session/SessionRequest";
import { LoginForm } from "../components/login/LoginForm";
import "./Login.scss";

type LoginProps = {
  sessionService: SessionService;
  onSuccess: (session: Session) => void;
};

export const Login = ({
  sessionService,
  onSuccess,
}: LoginProps): JSX.Element => {
  const [loginErrored, setLoginErrored] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const submitLogin = useCallback(
    async (sessionRequest: SessionRequest) => {
      try {
        setLoginErrored(false);
        setLoading(true);
        const session = await sessionService.createOne(sessionRequest);
        onSuccess(session);
        history.push("/home");
      } catch (error) {
        console.error(error);
        setLoginErrored(true);
        setLoading(false);
      }
    },
    [onSuccess, history, sessionService]
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
        {loginErrored && (
          <article role="alert" className="message is-danger mt-3">
            <div className="message-body">
              The information submitted was incorrect. Please double check and
              try again.
            </div>
          </article>
        )}
      </div>
    </div>
  );
};
