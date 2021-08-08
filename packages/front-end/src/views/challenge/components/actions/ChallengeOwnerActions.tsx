import { Button, DropdownItem, SmartDropdown } from "@tiernebre/kecleon";
import { Fragment } from "react";
import { ChallengeStatus } from "../../../../api/challenge/ChallengeStatus";

type ChallengeOwnerActionsProps = {
  challengeStatus: ChallengeStatus;
  onDeleteChallenge: () => void;
  onGenerateDraftPool: () => void;
};

export const ChallengeOwnerActions = ({
  onDeleteChallenge,
  challengeStatus,
  onGenerateDraftPool,
}: ChallengeOwnerActionsProps): JSX.Element => {
  const proceedAction = challengeStatus === ChallengeStatus.CREATED && (
    <Button color="success" onClick={onGenerateDraftPool}>
      Generate Draft Pool
    </Button>
  );

  return (
    <>
      <SmartDropdown
        className="mr-4"
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
