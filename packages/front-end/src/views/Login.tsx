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
  const history = useHistory()

  const submitLogin = async (sessionRequest: SessionRequest) => {
    try {
      const { accessToken } = await sessionService.createOne(sessionRequest);
      onSuccess(accessToken)
      history.push('/home')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="Login columns is-vcentered is-mobile">
      <div className="column is-offset-one-third-desktop is-one-third-desktop">
        <h1 className="Login__heading title is-spaced">Welcome to Ninjask!</h1>
        <h2 className="subtitle">
          Please fill out your login information below to start drafting and
          tracking your Pokémon challenges!
        </h2>
        <LoginForm onSubmit={submitLogin} />
      </div>
    </div>
  );
};
