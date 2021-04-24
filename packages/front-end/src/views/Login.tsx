import { useCallback, useState } from "react";
import { useHistory } from "react-router";
import { SessionService } from "../api/session";
import { SessionRequest } from "../api/session/SessionRequest";
import { LoginForm } from "../components/login/LoginForm";
import "./Login.css";

type LoginProps = {
  sessionService: SessionService;
  onSuccess: (accessToken: string) => void;
};

export const Login = ({ sessionService, onSuccess }: LoginProps) => {
  const [loginErrored, setLoginErrored] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const submitLogin = useCallback(async (sessionRequest: SessionRequest) => {
    try {
      setLoginErrored(false);
      setLoading(true);
      const { accessToken } = await sessionService.createOne(sessionRequest);
      onSuccess(accessToken);
      history.push("/home");
    } catch (error) {
      console.error(error);
      setLoginErrored(true);
      setLoading(false);
    }
  }, [onSuccess, history, sessionService]);

  return (
    <div className="Login columns is-vcentered is-mobile">
      <div className="column is-offset-one-third-desktop is-one-third-desktop">
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
