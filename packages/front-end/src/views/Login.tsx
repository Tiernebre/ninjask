import { SessionService } from "../api/session";
import { SessionRequest } from "../api/session/SessionRequest";
import { LoginForm } from "../components/login/LoginForm";
import "./Login.css";

type LoginProps = {
  sessionService: SessionService;
};

export const Login = ({ sessionService }: LoginProps) => {
  const submitLogin = (sessionRequest: SessionRequest) => {
    try {
      sessionService.createOne(sessionRequest);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="Login columns is-vcentered">
      <div className="column">
        <h1 className="title is-spaced">Welcome to Ninjask!</h1>
        <h2 className="subtitle">
          Please fill out your login information below to start drafting and
          tracking your Pokémon challenges!
        </h2>
        <LoginForm onSubmit={submitLogin} />
      </div>
    </div>
  );
};
