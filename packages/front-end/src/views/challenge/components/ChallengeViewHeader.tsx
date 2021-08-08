import { HeadingGroup, Level } from "@tiernebre/kecleon";
import { ChallengeActions, ChallengeActionsProps } from "./actions";

type ChallengeViewHeaderProps = ChallengeActionsProps;

export const ChallengeViewHeader = ({
  challenge,
  ...actionProps
}: ChallengeViewHeaderProps): JSX.Element => {
  return (
    <header className="mb-5">
      <Level
        left={
          <div>
            <HeadingGroup
              spaced
              title={challenge.name}
              subtitle={challenge.description}
            />
          </div>
        }
        right={<ChallengeActions challenge={challenge} {...actionProps} />}
      />
    </header>
  );
};
