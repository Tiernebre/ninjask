import styles from "./ChallengeViewHeader.module.scss";
import { Challenge } from "../../../api";
import { HeadingGroup } from "@tiernebre/kecleon";
import { ChallengeActions } from "./actions";

export type ChallengeViewHeaderProps = {
  challenge: Challenge;
  inChallenge: boolean;
  ownsChallenge: boolean;
};

export const ChallengeViewHeader = ({
  challenge,
  inChallenge,
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
      <ChallengeActions inChallenge={inChallenge} />
    </header>
  );
};
