import { render, screen } from "@testing-library/react";
import { ChallengeResults } from "./ChallengeResults";
import { ChallengeResult as ChallengeResultTyping } from "../../../api/challenge/ChallengeResult";

const challengeResultOne: ChallengeResultTyping = {
  participantId: 1,
  resultId: 1,
  completionTimeHour: 1,
  completionTimeMinutes: 1,
  nickname: "Test 1",
};

const challengeResultTwo: ChallengeResultTyping = {
  participantId: 2,
  resultId: 2,
  completionTimeHour: 2,
  completionTimeMinutes: 2,
  nickname: "Test 2",
};

const uncompletedChallengeResult: ChallengeResultTyping = {
  participantId: 3,
  resultId: 3,
  completionTimeHour: null,
  completionTimeMinutes: null,
  nickname: "Test 3",
}

it("displays challenge results", () => {
  const results = [challengeResultOne, challengeResultTwo];
  render(<ChallengeResults results={results} />);
  expect(
    screen.getByText(`1. ${challengeResultOne.nickname}`)
  ).toBeInTheDocument();
  expect(
    screen.getByText(`2. ${challengeResultTwo.nickname}`)
  ).toBeInTheDocument();
});

it("displays a message if there are no challenge results", () => {
  render(<ChallengeResults results={[]} />);
  expect(
    screen.getByText("There are no completed results yet for this challenge!")
  ).toBeInTheDocument();
});

it("displays only completed challenge results", () => {
  const results = [challengeResultOne, challengeResultTwo, uncompletedChallengeResult];
  render(<ChallengeResults results={results} />);
  expect(screen.getAllByRole('listitem')).toHaveLength(2);
})
