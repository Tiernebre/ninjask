import styles from "./ChallengeViewHeader.module.scss";
import { Challenge } from "../../../api";
import { HeadingGroup } from "@tiernebre/kecleon";
import { ChallengeActions } from "./actions";

export type ChallengeViewHeaderProps = {
  challenge: Challenge;
};

export const ChallengeViewHeader = ({
  challenge,
}: ChallengeViewHeaderProps): JSX.Element => {
  return (
    <header className={styles.header}>
      <div>
        <HeadingGroup
          spaced
          title={challenge.name}
          subtitle={challenge.description}
        />
      </div>
      <ChallengeActions />
    </header>
  );
};
