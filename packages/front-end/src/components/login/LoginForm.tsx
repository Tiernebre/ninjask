import { SemanticFormField } from "@tiernebre/kecleon";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../form/ErrorMessage";
import "./LoginForm.css";

type LoginFormData = {
  accessKey: string;
  password: string;
};

type LoginFormProps = {
  onSubmit: (data: LoginFormData) => void;
  loading: boolean;
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
      <SemanticFormField
        id="access-key"
        label="Access Key"
        input={{ type: "text" }}
        register={
          register("accessKey", {
            required: {
              value: true,
              message: "Access Key is required.",
            },
          })
        }
        error={errors.accessKey}
      />
      <div className="field">
        <label className="label" htmlFor="LoginForm__password">
          Password
        </label>
        <input
          className={`input ${errors.password ? "is-danger" : ""}`}
          type="password"
          id="LoginForm__password"
          aria-invalid={!!errors.password}
          autoComplete="on"
          {...register("password", {
            required: {
              value: true,
              message: "Password is required.",
            },
          })}
        />
        <ErrorMessage
          htmlFor="LoginForm__password"
          fieldError={errors.password}
        />
      </div>
      <div className="field">
        <button
          className={`LoginForm__button button is-success is-fullwidth is-medium ${props.loading ? "is-loading" : ""
            }`}
        >
          Login
        </button>
      </div>
    </form>
  );
};
