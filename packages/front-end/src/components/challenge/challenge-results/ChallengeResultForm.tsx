import "./ChallengeResultForm.scss";
import { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../../form/ErrorMessage";
import { ChallengeResult } from "../../../api/challenge/ChallengeResult";

type ChallengeResultFormData = {
  completionTimeHour: number;
  completionTimeMinutes: number;
};

type ChallengeResultFormProps = {
  existingResult?: ChallengeResult;
  onSubmit: (data: ChallengeResultFormData) => void;
};

export const ChallengeResultForm = ({
  onSubmit,
  existingResult,
}: ChallengeResultFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ChallengeResultFormData>();

  useEffect(() => {
    if (existingResult?.completionTimeHour) {
      setValue("completionTimeHour", existingResult.completionTimeHour);
    }
    if (existingResult?.completionTimeMinutes) {
      setValue("completionTimeMinutes", existingResult.completionTimeMinutes);
    }
  }, [existingResult, setValue]);

  const submit = handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <Fragment>
      <h3 className="ChallengeResultForm__heading">Submit Result</h3>
      <p className="ChallengeResultForm__sub-heading">
        Enter in the details about your completed run and submit it!
      </p>
      <form className="ChallengeResultForm" onSubmit={submit}>
        <div className="field">
          <div className="ChallengeResultForm__completion-time">
            <div className="ChallengeResultForm__hour-container">
              <label htmlFor="ChallengeResultForm__hour" className="label">
                Hour
              </label>
              <input
                id="ChallengeResultForm__hour"
                className={`input ${
                  errors.completionTimeHour ? "is-danger" : ""
                }`}
                type="number"
                aria-invalid={!!errors.completionTimeHour}
                placeholder="00"
                {...register("completionTimeHour", {
                  required: {
                    value: true,
                    message: "Hour is required.",
                  },
                  min: {
                    value: 0,
                    message: "Hour must be between 0-99.",
                  },
                  max: {
                    value: 99,
                    message: "Hour must be between 0-99.",
                  },
                })}
              />
              <ErrorMessage
                htmlFor="ChallengeResultForm__hour"
                fieldError={errors.completionTimeHour}
              />
              <span className="ChallengeResultForm__colon">:</span>
            </div>
            <div className="ChallengeResultForm__minutes-container">
              <label htmlFor="ChallengeResultForm__minutes" className="label">
                Minutes
              </label>
              <input
                id="ChallengeResultForm__minutes"
                className={`input ${
                  errors.completionTimeMinutes ? "is-danger" : ""
                }`}
                type="number"
                aria-invalid={!!errors.completionTimeMinutes}
                placeholder="00"
                {...register("completionTimeMinutes", {
                  required: {
                    value: true,
                    message: "Minutes are required.",
                  },
                  min: {
                    value: 0,
                    message: "Minutes must be between 0-59.",
                  },
                  max: {
                    value: 59,
                    message: "Minutes must be between 0-59.",
                  },
                })}
              />
              <ErrorMessage
                htmlFor="ChallengeResultForm__minutes"
                fieldError={errors.completionTimeMinutes}
              />
            </div>
          </div>
        </div>
        <div className="ChallengeResultForm__button-container">
          <button className="button is-success">Submit</button>
        </div>
      </form>
    </Fragment>
  );
};
