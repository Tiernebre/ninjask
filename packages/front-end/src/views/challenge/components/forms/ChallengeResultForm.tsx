import {
  Button,
  Column,
  Columns,
  Input,
  SemanticFormField,
} from "@tiernebre/kecleon";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ChallengeResult } from "../../../../api";
import { ChallengeParticipantUpdateRequest } from "../../../../api/challenge/ChallengeParticipantUpdateRequest";

type ChallengeResultFormProps = {
  onSubmit: (data: ChallengeParticipantUpdateRequest) => void;
  existingResult?: ChallengeResult;
};

export const ChallengeResultForm = ({
  onSubmit,
  existingResult,
}: ChallengeResultFormProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ChallengeParticipantUpdateRequest>();

  useEffect(() => {
    if (existingResult) {
      if (existingResult.completionTimeHour !== null) {
        setValue("completionTimeHour", existingResult.completionTimeHour);
      }
      if (existingResult.completionTimeMinutes !== null) {
        setValue("completionTimeMinutes", existingResult.completionTimeMinutes);
      }
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
            error={errors.completionTimeHour}
          >
            <Input
              type="number"
              register={register("completionTimeHour", {
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
            />
          </SemanticFormField>
        </Column>
        <Column>
          <SemanticFormField
            id="minutes"
            label="Minutes"
            error={errors.completionTimeMinutes}
          >
            <Input
              type="number"
              register={register("completionTimeMinutes", {
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
            />
          </SemanticFormField>
        </Column>
      </Columns>
      <Button color="success">Submit Result</Button>
    </form>
  );
};
