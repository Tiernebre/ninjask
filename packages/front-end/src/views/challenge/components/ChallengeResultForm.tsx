import { Button, Column, Columns, SemanticFormField } from "@tiernebre/kecleon";
import { useForm } from "react-hook-form";

export type ChallengeResultFormData = {
  hour: number;
  minutes: number;
};

type ChallengeResultFormProps = {
  onSubmit: (data: ChallengeResultFormData) => void;
};

export const ChallengeResultForm = ({
  onSubmit,
}: ChallengeResultFormProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChallengeResultFormData>();

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
            label="Minutes"
            input={{ type: "number" }}
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
      <Button color="success">Submit Result</Button>
    </form>
  );
};
