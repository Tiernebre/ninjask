import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";
import { ChallengeResultForm } from ".";

const getHourInput = () => screen.getByRole("spinbutton", { name: /Hour/i });
const getSubmitButton = () => screen.getByRole("button", { name: /Submit/i });

it("displays an error message if the hour field is not filled out", async () => {
  const onSubmit = jest.fn();
  render(<ChallengeResultForm onSubmit={onSubmit} />);
  user.click(getSubmitButton());
  const hourErrorMessage = await screen.findByText("Hour is required.");
  expect(hourErrorMessage).toBeInTheDocument();
  expect(getHourInput()).toBeInvalid();
  expect(onSubmit).not.toHaveBeenCalled();
});
