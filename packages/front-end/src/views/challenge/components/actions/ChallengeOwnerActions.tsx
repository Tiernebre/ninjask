import { Button, DropdownItem, SmartDropdown } from "@tiernebre/kecleon";
import { Fragment } from "react";
import { ChallengeStatus } from "../../../../api";

type ChallengeOwnerActionsProps = {
  onDeleteChallenge: () => void;
  challengeStatus: ChallengeStatus;
};

export const ChallengeOwnerActions = ({
  onDeleteChallenge,
  challengeStatus,
}: ChallengeOwnerActionsProps): JSX.Element => {
  const proceedAction = challengeStatus === ChallengeStatus.CREATED && (
    <Button color="success">Generate Draft Pool</Button>
  );

  return (
    <>
      <SmartDropdown
        className="mr-3"
        alignment="right"
        triggerLabel="Actions"
        menuId="challenge-owner-actions"
        items={
          <Fragment>
            <DropdownItem onClick={onDeleteChallenge}>Delete</DropdownItem>
          </Fragment>
        }
      />
      {proceedAction}
    </>
  );
};
