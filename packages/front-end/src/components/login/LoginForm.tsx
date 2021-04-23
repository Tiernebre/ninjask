import { useForm } from "react-hook-form";

type LoginFormData = {
  accessKey: string,
  password: string
}

export const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const onSubmit = handleSubmit(data => console.log(data))

  return (
    <form className="LoginForm" onSubmit={onSubmit}>
      <label htmlFor="LoginForm__access-key">Access Key</label>
      <input
        type="text"
        id="LoginForm__access-key"
        {...register("accessKey", { required: true })}
      />
      {errors.accessKey && <span>This field is required</span>}
      <label htmlFor="LoginForm__password">Password</label>
      <input
        type="password"
        id="LoginForm__password"
        {...register("password", { required: true })}
      />
      {errors.password && <span>This field is required</span>}
      <button>Login</button>
    </form>
  );
};
