import { useForm } from "react-hook-form";
import { ErrorMessage } from "../form/ErrorMessage";
import "./LoginForm.css";

type LoginFormData = {
  accessKey: string;
  password: string;
};

type LoginFormProps = {
  onSubmit: (data: LoginFormData) => void;
};

export const LoginForm = (props: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = handleSubmit((data) => {
    props.onSubmit(data);
  });

  return (
    <form className="LoginForm" onSubmit={onSubmit}>
      <div className="field">
        <label className="label" htmlFor="LoginForm__access-key">Access Key</label>
        <input
          className="input"
          type="text"
          id="LoginForm__access-key"
          aria-invalid={!!errors.accessKey}
          {...register("accessKey", { required: true })}
        />
        {errors.accessKey && <ErrorMessage htmlFor="LoginForm__access-key" />}
      </div>
      <div className="field">
        <label className="label" htmlFor="LoginForm__password">Password</label>
        <input
          className="input"
          type="password"
          id="LoginForm__password"
          aria-invalid={!!errors.password}
          {...register("password", { required: true })}
        />
        {errors.password && <ErrorMessage htmlFor="LoginForm__password" />}
      </div>
      <button className="button is-success">Login</button>
    </form>
  );
};
