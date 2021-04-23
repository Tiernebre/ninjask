import { useForm } from "react-hook-form";

export const LoginForm = () => {
  const { register } = useForm();

  return (
    <form className="LoginForm">
      <label htmlFor="LoginForm__access-key">Access Key</label>
      <input
        type="text"
        id="LoginForm__access-key"
        {...register("accessKey", { required: true })}
      />
      <label htmlFor="LoginForm__password">Password</label>
      <input
        type="password"
        id="LoginForm__password"
        {...register("password", { required: true })}
      />
    </form>
  );
};
