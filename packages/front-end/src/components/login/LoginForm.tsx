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

export const LoginForm = ({
  onSubmit,
  loading,
}: LoginFormProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const submit = handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <form className={styles.form} onSubmit={submit}>
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
        <Button color="success" loading={loading} size="medium" fullWidth>
          Login
        </Button>
      </FormField>
    </form>
  );
};
