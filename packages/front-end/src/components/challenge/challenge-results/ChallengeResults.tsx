import { ChallengeResult as ChallengeResultTyping } from "../../../api/challenge/ChallengeResult";
import { ChallengeResult } from "./ChallengeResult";
import { EmptyChallengeResults } from "./EmptyChallengeResults";

type ChallengeResultsProps = {
  results: ChallengeResultTyping[];
};

export const ChallengeResults = ({ results }: ChallengeResultsProps) => {
  const content = results.length ? (
    <ol>
      {results.map((result) => (
        <li key={result.participantId}>
          <ChallengeResult result={result} />
        </li>
      ))}
    </ol>
  ) : (
    <EmptyChallengeResults />
  );

  return <div className="ChallengeResults">{content}</div>;
};
