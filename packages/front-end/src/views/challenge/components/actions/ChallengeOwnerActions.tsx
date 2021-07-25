import { DropdownItem, SmartDropdown } from "@tiernebre/kecleon";
import { Fragment } from "react";

type ChallengeOwnerActionsProps = {
  onDeleteChallenge: () => void;
};

export const ChallengeOwnerActions = ({
  onDeleteChallenge,
}: ChallengeOwnerActionsProps): JSX.Element => {
  return (
    <SmartDropdown
      alignment="right"
      triggerLabel="Actions"
      menuId="challenge-owner-actions"
      items={
        <Fragment>
          <DropdownItem onClick={onDeleteChallenge}>Delete</DropdownItem>
        </Fragment>
      }
    />
  );
};
