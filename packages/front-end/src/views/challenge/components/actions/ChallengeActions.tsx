import { Buttons, IconButton } from "@tiernebre/kecleon";

export const ChallengeActions = (): JSX.Element => {
  return (
    <Buttons>
      <IconButton
        color="danger"
        icon={{
          name: "times",
        }}
      >
        Leave Challenge
      </IconButton>
    </Buttons>
  );
};
