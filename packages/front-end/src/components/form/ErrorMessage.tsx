import { FieldError } from "react-hook-form";
import "./ErrorMessage.css";

interface ErrorMessageProps {
  htmlFor: string;
  fieldError?: FieldError;
}

export const ErrorMessage = ({ fieldError, ...props }: ErrorMessageProps) => {
  if (!fieldError) return null;

  return (
    <label
      className="ErrorMessage help is-danger"
      aria-label="This field is required"
      role="alert"
      {...props}
    >
      This field is required
    </label>
  )
}
