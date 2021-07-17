import { render, screen } from "@testing-library/react";
import { ChallengeResult } from "../../../../api";
import { ChallengeResultsTableRow } from "./ChallengeResultsRow";

it("displays details about a non completed result correctly", () => {
  const result: ChallengeResult = {
    nickname: "Test Name",
    completionTimeHour: null,
    completionTimeMinutes: null,
    participantId: 1,
    resultId: 1,
  };
  render(
    <table>
      <tbody>
        <ChallengeResultsTableRow result={result} placement={1} />
      </tbody>
    </table>
  );
  expect(screen.getByText(result.nickname)).toBeInTheDocument();
  expect(screen.getByText("Not Completed Yet")).toBeInTheDocument();
  expect(screen.getByText("N/A")).toBeInTheDocument();
});

it("displays details about a completed result correctly (single digits)", () => {
  const result: ChallengeResult = {
    nickname: "Test Name",
    completionTimeHour: 3,
    completionTimeMinutes: 4,
    participantId: 1,
    resultId: 1,
  };
  const expectedTime = "03:04";
  const placement = 1;
  render(
    <table>
      <tbody>
        <ChallengeResultsTableRow result={result} placement={placement} />
      </tbody>
    </table>
  );
  expect(screen.getByText(result.nickname)).toBeInTheDocument();
  expect(screen.getByText(expectedTime)).toBeInTheDocument();
  expect(screen.getByText(placement.toString())).toBeInTheDocument();
});

it("displays details about a completed result time correctly (double digits)", () => {
  const result: ChallengeResult = {
    nickname: "Test Name",
    completionTimeHour: 34,
    completionTimeMinutes: 45,
    participantId: 1,
    resultId: 1,
  };
  const expectedTime = "34:45";
  render(
    <table>
      <tbody>
        <ChallengeResultsTableRow result={result} placement={1} />
      </tbody>
    </table>
  );
  expect(screen.getByText(expectedTime)).toBeInTheDocument();
});
