import { Button, DropdownItem, SmartDropdown } from "@tiernebre/kecleon";
import { Fragment } from "react";
import { ChallengeStatus } from "../../../../api";

type ChallengeOwnerActionsProps = {
  onDeleteChallenge: () => void;
  challengeStatus: ChallengeStatus;
  onGenerateDraftPool: () => void;
  loading: boolean;
};

export const ChallengeOwnerActions = ({
  onDeleteChallenge,
  challengeStatus,
  onGenerateDraftPool,
  loading,
}: ChallengeOwnerActionsProps): JSX.Element => {
  const proceedAction = challengeStatus === ChallengeStatus.CREATED && (
    <Button color="success" onClick={onGenerateDraftPool} loading={loading}>
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
            <DropdownItem onClick={onDeleteChallenge} loading={loading}>
              Delete
            </DropdownItem>
          </Fragment>
        }
      />
      {proceedAction}
    </>
  );
};
