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
      <h3>Submit Result</h3>
      <form className="ChallengeResultForm" onSubmit={submit}>
        <div className="field">
          <label className="label">Result Time</label>
          <div className="columns">
            <div className="column is-2">
              <label htmlFor="ChallengeResultForm__hour" className="label">
                Hour
              </label>
              <input
                id="ChallengeResultForm__hour"
                className={`input ${errors.hour ? "is-danger" : ""}`}
                type="number"
                aria-invalid={!!errors.hour}
                placeholder="00"
                {...register("hour", { required: true })}
              />
              <ErrorMessage htmlFor="ChallengeResultForm__hour" fieldError={errors.hour}/>
            </div>
            <div className="column is-2">
              <label htmlFor="ChallengeResultForm__minutes" className="label">
                Minutes
              </label>
              <input
                id="ChallengeResultForm__minutes"
                className={`input ${errors.minutes ? "is-danger" : ""}`}
                type="number"
                aria-invalid={!!errors.hour}
                placeholder="00"
                {...register("minutes", { required: true })}
              />
              <ErrorMessage htmlFor="ChallengeResultForm__hour" fieldError={errors.minutes}/>
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
