import { Column, Columns, SemanticFormField } from "@tiernebre/kecleon";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ChallengeResult } from "../../../api";

type ChallengeResultFormData = {
  hour: number;
  minutes: number;
};

type ChallengeResultFormProps = {
  existingResult?: ChallengeResult;
  onSubmit: (data: ChallengeResultFormData) => void;
};

export const ChallengeResultForm = ({
  existingResult,
  onSubmit,
}: ChallengeResultFormProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ChallengeResultFormData>();

  useEffect(() => {
    if (existingResult?.completionTimeHour) {
      setValue("hour", existingResult.completionTimeHour);
    }
    if (existingResult?.completionTimeMinutes) {
      setValue("minutes", existingResult.completionTimeMinutes);
    }
  }, [existingResult, setValue]);

  const submit = handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <form onSubmit={submit}>
      <Columns mobile>
        <Column>
          <SemanticFormField
            id="hour"
            label="Hour"
            input={{ type: "number" }}
            register={register("hour", {
              valueAsNumber: true,
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
            error={errors.hour}
          />
        </Column>
        <Column>
          <SemanticFormField
            id="minutes"
            label="minutes"
            input={{ type: "minutes" }}
            register={register("minutes", {
              valueAsNumber: true,
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
            error={errors.minutes}
          />
        </Column>
      </Columns>
    </form>
  );
};
