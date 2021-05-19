import { ChallengeResult as ChallengeResultTyping } from "../../../api/challenge/ChallengeResult";
import { EmptyChallengeResults } from "./EmptyChallengeResults";

type ChallengeResultsProps = {
  results: ChallengeResultTyping[];
};

export const ChallengeResults = ({ results }: ChallengeResultsProps) => {
  const content = results.length ? (
    <ol>
      {results.map((result) => (
        <li key={result.participantId}></li>
      ))}
    </ol>
  ) : (
    <EmptyChallengeResults />
  );

  return <div className="ChallengeResults">{content}</div>;
};
