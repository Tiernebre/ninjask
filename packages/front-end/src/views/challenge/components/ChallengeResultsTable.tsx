import { Table } from "@tiernebre/kecleon";
import { ChallengeResult } from "../../../api";

const formatCompletionTimeForResult = (result: ChallengeResult): string => {
  const { completionTimeHour: hour, completionTimeMinutes: minutes } = result;
  return hour && minutes ? `${hour}:${minutes}` : "Not Completed Yet";
};

export type ChallengeResultsTableRowProps = {
  result: ChallengeResult;
};

const ChallengeResultsTableRow = ({
  result,
}: ChallengeResultsTableRowProps): JSX.Element => {
  return (
    <tr>
      <td>{result.nickname}</td>
      <td>{formatCompletionTimeForResult(result)}</td>
    </tr>
  );
};

type ChallengeResultsTableProps = {
  results: ChallengeResult[];
};

export const ChallengeResultsTable = ({
  results,
}: ChallengeResultsTableProps): JSX.Element => {
  return (
    <Table fullwidth striped>
      <thead>
        <tr>
          <th>Name</th>
          <th>Completion Time</th>
        </tr>
      </thead>
      <tbody>
        {results.map((result) => (
          <ChallengeResultsTableRow key={result.resultId} result={result} />
        ))}
      </tbody>
    </Table>
  );
};
