import { render, screen } from "@testing-library/react";
import { ChallengeResult } from "../../../../api";
import { ChallengeResultsTable } from "./ChallengeResultsTable";

it("renders results", () => {
  const results: ChallengeResult[] = [
    {
      nickname: "Completed Result",
      completionTimeHour: 12,
      completionTimeMinutes: 34,
      participantId: 1,
      resultId: 1,
    },
    {
      nickname: "Uncompleted Result",
      completionTimeHour: null,
      completionTimeMinutes: null,
      participantId: 2,
      resultId: 2,
    },
  ];
  render(<ChallengeResultsTable results={results} />);
  expect(screen.getByText(results[0].nickname)).toBeInTheDocument();
  expect(screen.getByText("1")).toBeInTheDocument();
  expect(screen.getByText("12:34")).toBeInTheDocument();
  expect(screen.getByText(results[1].nickname)).toBeInTheDocument();
  expect(screen.getByText("Not Completed Yet")).toBeInTheDocument();
  expect(screen.getByText("N/A")).toBeInTheDocument();
});
