import { Challenge } from "../../../api";
import { HeadingGroup } from "@tiernebre/kecleon";

export type ChallengeViewHeaderProps = {
  challenge: Challenge;
};

export const ChallengeViewHeader = ({
  challenge,
}: ChallengeViewHeaderProps): JSX.Element => {
  return (
    <header>
      <HeadingGroup
        spaced
        title={challenge.name}
        subtitle={challenge.description}
      />
    </header>
  );
};
