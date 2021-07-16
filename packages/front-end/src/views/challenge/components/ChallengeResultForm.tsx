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

  return <form onSubmit={submit}>Challenge Result Form</form>;
};
