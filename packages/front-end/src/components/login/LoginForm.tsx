import { useForm } from "react-hook-form";
import './LoginForm.css'

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
      <label htmlFor="LoginForm__access-key">Access Key</label>
      <input
        type="text"
        id="LoginForm__access-key"
        aria-invalid={!!errors.accessKey}
        {...register("accessKey", { required: true })}
      />
      {errors.accessKey && (
        <label
          htmlFor="LoginForm__access-key"
          aria-label="This field is required"
          role="alert"
        >
          This field is required
        </label>
      )}
      <label htmlFor="LoginForm__password">Password</label>
      <input
        type="password"
        id="LoginForm__password"
        aria-invalid={!!errors.password}
        {...register("password", { required: true })}
      />
      {errors.password && (
        <label
          htmlFor="LoginForm__password"
          aria-label="This field is required"
          role="alert"
        >
          This field is required
        </label>
      )}
      <button>Login</button>
    </form>
  );
};
