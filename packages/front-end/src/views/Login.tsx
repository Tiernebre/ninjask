import { SessionRequest } from "../api/session/session-request";
import { LoginForm } from "../components/login/LoginForm";
import './Login.css';

export const Login = () => {
  const submitLogin = (sessionRequest: SessionRequest) => {
    console.log(sessionRequest);
  };

  return (
    <div className="Login">
      <div className="Login__form-window">
        <LoginForm onSubmit={submitLogin} />
      </div>
    </div>
  );
};
