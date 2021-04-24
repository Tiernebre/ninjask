import "./ErrorMessage.css";

interface ErrorMessageProps {
  htmlFor: string;
}

export const ErrorMessage = (props: ErrorMessageProps) => (
  <label
    className="ErrorMessage help is-danger"
    aria-label="This field is required"
    role="alert"
    {...props}
  >
    This field is required
  </label>
);
