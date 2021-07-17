import styles from "./ChallengeViewHeader.module.scss";
import { Challenge } from "../../../api";
import { HeadingGroup } from "@tiernebre/kecleon";
import { ChallengeActions, ChallengeActionsProps } from "./actions";

export type ChallengeViewHeaderProps = {
  challenge: Challenge;
} & ChallengeActionsProps;

export const ChallengeViewHeader = ({
  challenge,
  ...actionProps
}: ChallengeViewHeaderProps): JSX.Element => {
  return (
    <header className={`${styles.header} mb-5`}>
      <div>
        <HeadingGroup
          spaced
          title={challenge.name}
          subtitle={challenge.description}
        />
      </div>
      <ChallengeActions {...actionProps} />
    </header>
  );
};
