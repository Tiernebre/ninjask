import { Button, FormField, SemanticFormField } from "@tiernebre/kecleon";
import { useForm } from "react-hook-form";
import styles from "./LoginForm.module.scss";

type LoginFormData = {
  accessKey: string;
  password: string;
};

type LoginFormProps = {
  onSubmit: (data: LoginFormData) => void;
  loading: boolean;
};

export const LoginForm = (props: LoginFormProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = handleSubmit((data) => {
    props.onSubmit(data);
  });

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <SemanticFormField
        id="access-key"
        label="Access Key"
        input={{ type: "text" }}
        register={register("accessKey", {
          required: {
            value: true,
            message: "Access Key is required.",
          },
        })}
        error={errors.accessKey}
      />
      <SemanticFormField
        id="password"
        label="Password"
        input={{ type: "password" }}
        register={register("password", {
          required: {
            value: true,
            message: "Password is required.",
          },
        })}
        error={errors.password}
      />
      <FormField>
        <Button color="success" loading={props.loading} size="medium" fullWidth>
          Login
        </Button>
      </FormField>
    </form>
  );
};
