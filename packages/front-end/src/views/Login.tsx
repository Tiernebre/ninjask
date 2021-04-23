import { SessionRequest } from "../api/session/session-request";
import { LoginForm } from "../components/login/LoginForm";

export const Login = () => {
  const submitLogin = (sessionRequest: SessionRequest) => {
    console.log(sessionRequest)
  }
  
  return <LoginForm onSubmit={submitLogin} />;
};
