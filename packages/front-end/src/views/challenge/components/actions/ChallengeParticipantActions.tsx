import { Buttons, IconButton } from "@tiernebre/kecleon";
import { ReactNode } from "react";
import { ChallengeActionsProps } from ".";

export const ChallengeParticipantActions = ({
  inChallenge,
  onLeaveChallenge,
  onJoinChallenge,
}: ChallengeActionsProps): JSX.Element => {
  let actions: ReactNode;

  if (inChallenge) {
    actions = (
      <IconButton
        color="danger"
        icon={{
          name: "times",
          fontSize: "sm",
        }}
        onClick={onLeaveChallenge}
      >
        Leave Challenge
      </IconButton>
    );
  } else {
    actions = (
      <IconButton
        color="success"
        icon={{
          name: "plus",
          fontSize: "sm",
        }}
        onClick={onJoinChallenge}
      >
        Join Challenge
      </IconButton>
    );
  }

  return <Buttons>{actions}</Buttons>;
};
