import { Buttons } from "@tiernebre/kecleon";
import { ChallengeParticipantActions } from "./ChallengeParticipantActions";

export type ChallengeActionsProps = {
  inChallenge: boolean;
  ownsChallenge: boolean;
  onLeaveChallenge: () => void;
  onJoinChallenge: () => void;
};

export const ChallengeActions = (props: ChallengeActionsProps): JSX.Element => {
  return (
    <Buttons>
      <ChallengeParticipantActions {...props} />
    </Buttons>
  );
};
