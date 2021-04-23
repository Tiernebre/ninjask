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
    <div className="Login">
      <div className="Login__form-window">
        <LoginForm onSubmit={submitLogin} />
      </div>
    </div>
  );
};
