import { useForm } from "react-hook-form";
import {
  CreateChallengeRequest,
  createChallengeRequestSchema,
} from "../../../../api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, SemanticFormField } from "@tiernebre/kecleon";

export type ChallengeFormProps = {
  onSubmit: (request: CreateChallengeRequest) => void;
};

export const ChallengeForm = ({
  onSubmit,
}: ChallengeFormProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateChallengeRequest>({
    resolver: zodResolver(createChallengeRequestSchema),
  });

  const submit = handleSubmit((data) => onSubmit(data));

  return (
    <form onSubmit={submit}>
      <SemanticFormField id="challenge-name" label="Name" error={errors.name}>
        <Input type="text" register={register("name")} />
      </SemanticFormField>
      <SemanticFormField
        id="challenge-description"
        label="Description"
        error={errors.description}
      >
        <Input type="text" register={register("description")} />
      </SemanticFormField>
      <Button color="success">Create Challenge</Button>
    </form>
  );
};
