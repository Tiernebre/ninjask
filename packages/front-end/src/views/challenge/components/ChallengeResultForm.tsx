import { Column, Columns, FormField, Input, Label } from "@tiernebre/kecleon";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ChallengeResult } from "../../../api";

type ChallengeResultFormData = {
  completionTimeHour: number;
  completionTimeMinutes: number;
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
    <form onSubmit={submit}>
      <Columns mobile>
        <Column>
          <FormField>
            <Label>Hour</Label>
            <Input type="number" />
          </FormField>
        </Column>
        <Column>
          <FormField>
            <Label>Minutes </Label>
            <Input type="number" />
          </FormField>
        </Column>
      </Columns>
    </form>
  );
};
