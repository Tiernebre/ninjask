import { useForm } from "react-hook-form";
import {
  CreateChallengeRequest,
  createChallengeRequestSchema,
} from "../../../../api";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  MappedSelect,
  PageSpinner,
  SemanticFormField,
  Textarea,
} from "@tiernebre/kecleon";
import { useVersionsApi } from "../../../../hooks/api/version/use-versions-api";
import { useEffect } from "react";
import { startCase } from "lodash";

export type ChallengeFormProps = {
  onSubmit: (request: CreateChallengeRequest) => void;
};

export const ChallengeForm = ({
  onSubmit,
}: ChallengeFormProps): JSX.Element | null => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateChallengeRequest>({
    resolver: zodResolver(createChallengeRequestSchema),
  });
  const { versions, fetchVersions } = useVersionsApi();
  console.log(versions.map(({ name }) => name));

  useEffect(() => {
    void fetchVersions();
  }, [fetchVersions]);

  const submit = handleSubmit((data) => onSubmit(data));

  if (versions.length) {
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
          <Textarea register={register("description")} rows={2} />
        </SemanticFormField>
        <SemanticFormField
          id="challenge-version"
          label="Pokemon Version"
          error={errors.versionId}
        >
          <MappedSelect
            options={versions}
            mapToOption={(version) => ({
              value: version.id,
              label: `Pokémon ${startCase(version.name)}`,
            })}
            register={register("versionId", {
              valueAsNumber: true,
            })}
          />
        </SemanticFormField>
        <Button color="success">Create Challenge</Button>
      </form>
    );
  } else {
    return <PageSpinner size="medium" />;
  }
};
