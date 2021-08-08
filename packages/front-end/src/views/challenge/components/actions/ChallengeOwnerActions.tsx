import { Button, DropdownItem, SmartDropdown } from "@tiernebre/kecleon";
import { Fragment } from "react";
import { ChallengeStatus } from "../../../../api";

type ChallengeOwnerActionsProps = {
  onDeleteChallenge: () => void;
  challengeStatus: ChallengeStatus;
  onGenerateDraftPool: () => void;
};

export const ChallengeOwnerActions = ({
  onDeleteChallenge,
  onGenerateDraftPool,
}: ChallengeOwnerActionsProps): JSX.Element => {
  const proceedAction = (
    <Button color="success" onClick={onGenerateDraftPool}>
      Generate Draft Pool
    </Button>
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
