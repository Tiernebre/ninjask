import { FieldError } from "react-hook-form";
import "./ErrorMessage.css";

interface ErrorMessageProps {
  htmlFor: string;
  fieldError?: FieldError;
}

export const ErrorMessage = ({ fieldError, ...props }: ErrorMessageProps) => {
  if (!fieldError) return null;

  const { message } = fieldError

  return (
    <label
      className="ErrorMessage help is-danger"
      aria-label={message}
      role="alert"
      {...props}
    >
      { message }
    </label>
  );
};
