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
import { useVersionsApi, useGetSeasons } from "../../../../hooks";
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
  const { seasons } = useGetSeasons();

  useEffect(() => {
    void Promise.all([fetchVersions()]);
  }, [fetchVersions]);

  const submit = handleSubmit((data) => {
    onSubmit(data);
  });

  if (versions.length && seasons.length) {
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
          label="Pokémon Version"
          error={errors.versionId}
        >
          <MappedSelect
            options={versions}
            placeholder="Select Pokémon Version"
            mapToOption={(version) => ({
              value: version.id,
              label: `Pokémon ${startCase(version.name)}`,
            })}
            register={register("versionId", {
              valueAsNumber: true,
            })}
          />
        </SemanticFormField>
        <SemanticFormField
          id="challenge-season"
          label="Season"
          error={errors.seasonId}
        >
          <MappedSelect
            options={seasons}
            placeholder="Select Season"
            mapToOption={(season) => ({
              value: season.id,
              label: season.name,
            })}
            register={register("seasonId", {
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
