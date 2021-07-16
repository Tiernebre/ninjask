import { ChallengeResult } from "../../../../api";

const hasCompleted = (result: ChallengeResult): boolean => {
  return (
    result.completionTimeHour !== null && result.completionTimeMinutes !== null
  );
};

const formatNumberForTime = (num: number): string => {
  return num.toString().padStart(2, "0");
};

const formatCompletionTimeForResult = (result: ChallengeResult): string => {
  if (hasCompleted(result)) {
    const hour = result.completionTimeHour as number;
    const minutes = result.completionTimeMinutes as number;
    return `${formatNumberForTime(hour)}:${formatNumberForTime(minutes)}`;
  } else {
    return "Not Completed Yet";
  }
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
