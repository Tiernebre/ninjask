import { render, screen } from "@testing-library/react"
import { ChallengeResultForm } from "./ChallengeResultForm"
import user from '@testing-library/user-event'
import { act } from "react-dom/test-utils"

const getHourInput = () => screen.getByRole('spinbutton', { name: /Hour/i })
const getMinutesInput = () => screen.getByRole('spinbutton', { name: /Minutes/i })
const getSubmitButton = () => screen.getByRole('button', { name: /Submit/i })
const getHourErrorMessage = () => screen.getByRole('alert', { name: /Hour/i })
const getMinutesErrorMessage = () => screen.getByRole('alert', { name: /Minutes/i })

it("displays an error message if the hour field is not filled out", async () => {
  const onSubmit = jest.fn()
  await act(async () => {
    render(<ChallengeResultForm onSubmit={onSubmit} />)
    user.click(getSubmitButton())
  })
  const hourErrorMessage = getHourErrorMessage()
  expect(hourErrorMessage).toBeInTheDocument()
  expect(hourErrorMessage).toHaveTextContent("Hour is required.")
})
