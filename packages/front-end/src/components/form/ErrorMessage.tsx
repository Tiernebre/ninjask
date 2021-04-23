import "./ErrorMessage.css";

interface ErrorMessageProps {
  htmlFor: string;
}

export const ErrorMessage = (props: ErrorMessageProps) => (
  <label
    className="ErrorMessage"
    aria-label="This field is required"
    role="alert"
    {...props}
  >
    This field is required
  </label>
);
