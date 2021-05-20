import "./ChallengeResultForm.scss";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../../form/ErrorMessage";

type ChallengeResultFormData = {
  hour: number;
  minutes: number;
};

type ChallengeResultFormProps = {
  onSubmit: (data: ChallengeResultFormData) => void;
};

export const ChallengeResultForm = ({ onSubmit }: ChallengeResultFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChallengeResultFormData>();

  const submit = handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <Fragment>
      <h3 className="ChallengeResultForm__heading">Submit Result</h3>
      <p className="ChallengeRestulForm__sub-heading">
        Enter in the details about your completed run and submit it!
      </p>
      <form className="ChallengeResultForm" onSubmit={submit}>
        <div className="field">
          <label className="label">Result Time</label>
          <div className="ChallengeResultForm__completion-time">
            <div className="ChallengeResultForm__hour-container">
              <label htmlFor="ChallengeResultForm__hour" className="label">
                Hour
              </label>
              <input
                id="ChallengeResultForm__hour"
                className={`input ${errors.hour ? "is-danger" : ""}`}
                type="number"
                aria-invalid={!!errors.hour}
                placeholder="00"
                {...register("hour", {
                  required: {
                    value: true,
                    message: "Hour is required.",
                  },
                  min: {
                    value: 0,
                    message: "Hour must be between 0-99",
                  },
                  max: {
                    value: 99,
                    message: "Hour must be between 0-99",
                  },
                })}
              />
              <ErrorMessage
                htmlFor="ChallengeResultForm__hour"
                fieldError={errors.hour}
              />
              <span className="ChallengeResultForm__colon">:</span>
            </div>
            <div className="ChallengeResultForm__minutes-container">
              <label htmlFor="ChallengeResultForm__minutes" className="label">
                Minutes
              </label>
              <input
                id="ChallengeResultForm__minutes"
                className={`input ${errors.minutes ? "is-danger" : ""}`}
                type="number"
                aria-invalid={!!errors.hour}
                placeholder="00"
                {...register("minutes", {
                  required: {
                    value: true,
                    message: "Minutes are required.",
                  },
                  min: {
                    value: 0,
                    message: "Minutes must be between 0-59",
                  },
                  max: {
                    value: 59,
                    message: "Minutes must be between 0-59",
                  },
                })}
              />
              <ErrorMessage
                htmlFor="ChallengeResultForm__hour"
                fieldError={errors.minutes}
              />
            </div>
          </div>
        </div>
        <button className="button is-success" type="submit">
          Submit
        </button>
      </form>
    </Fragment>
  );
};
