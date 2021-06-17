import { ChallengeParticipantUpdateRequest } from "../../../../api/challenge/ChallengeParticipantUpdateRequest";
import { ChallengeResult as ChallengeResultTyping } from "../../../../api/challenge/ChallengeResult";
import { SessionPayload } from "../../../../api/session";
import { ChallengeResultForm } from "./ChallengeResultForm";

type ChallengeResultActionProps = {
  results: ChallengeResultTyping[];
  sessionPayload: SessionPayload;
  onSubmit: (id: number, data: ChallengeParticipantUpdateRequest) => void;
};

export const ChallengeResultAction = ({
  results,
  sessionPayload,
  onSubmit,
}: ChallengeResultActionProps) => {
  const challengeResult = results.find(
    (result) => result.participantId === sessionPayload.userId
  );

  const submit = (data: ChallengeParticipantUpdateRequest) => {
    if (challengeResult) {
      onSubmit(challengeResult.resultId, data);
    }
  };

  return (
    <div className="ChallengeResultAction">
      <ChallengeResultForm onSubmit={submit} existingResult={challengeResult} />
    </div>
  );
};
