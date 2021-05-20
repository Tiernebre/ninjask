import { render, screen } from "@testing-library/react"
import { ChallengeResult as ChallengeResultTyping } from "../../../api/challenge/ChallengeResult"
import { ChallengeResult } from "./ChallengeResult"

it("displays the rank correctly", () => {
  const challengeResult: ChallengeResultTyping = {
    participantId: 1,
    resultId: 1,
    completionTimeHour: 1,
    completionTimeMinutes: 1,
    nickname: 'Test'
  }
  const rank = 2
  render(<ChallengeResult result={challengeResult} rank={rank} />)
  expect(screen.getByText(`${rank}. ${challengeResult.nickname}`)).toBeInTheDocument()
})

it("displays the completion time correctly (single digit hour and minutes)", () => {
  const challengeResult: ChallengeResultTyping = {
    participantId: 1,
    resultId: 1,
    completionTimeHour: 1,
    completionTimeMinutes: 1,
    nickname: 'Test'
  }
  const rank = 2
  render(<ChallengeResult result={challengeResult} rank={rank} />)
  const paddedHour = `0${challengeResult.completionTimeHour}`
  const paddedMinutes = `0${challengeResult.completionTimeMinutes}`
  expect(screen.getByText(`${paddedHour}:${paddedMinutes}`)).toBeInTheDocument()
})
