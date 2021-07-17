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
      <IconButton
        color="success"
        icon={{
          name: "plus",
        }}
      >
        Join Challenge
      </IconButton>
    </Buttons>
  );
};
