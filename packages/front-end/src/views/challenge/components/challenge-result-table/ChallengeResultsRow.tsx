import { ChallengeResult } from "../../../../api";

const hasCompleted = (result: ChallengeResult): boolean => {
  return !!(result.completionTimeHour && result.completionTimeMinutes);
};

const formatCompletionTimeForResult = (result: ChallengeResult): string => {
  const { completionTimeHour: hour, completionTimeMinutes: minutes } = result;
  return hasCompleted(result)
    ? `${hour as number}:${minutes as number}`
    : "Not Completed Yet";
};

const formatPlacement = (
  result: ChallengeResult,
  placement: number
): string => {
  return hasCompleted(result) ? placement.toString() : "N/A";
};

type ChallengeResultsTableRowProps = {
  result: ChallengeResult;
  placement: number;
};

export const ChallengeResultsTableRow = ({
  result,
  placement,
}: ChallengeResultsTableRowProps): JSX.Element => {
  return (
    <tr>
      <td>{formatPlacement(result, placement)}</td>
      <td>{result.nickname}</td>
      <td>{formatCompletionTimeForResult(result)}</td>
    </tr>
  );
};
