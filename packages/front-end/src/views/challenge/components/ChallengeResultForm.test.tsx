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

it.each([-1000, -1, 100, Number.MAX_SAFE_INTEGER])(
  "displays an error message that hour needs to be within a range when %p is provided as the hour",
  async (hourToInput: number) => {
    const onSubmit = jest.fn();
    render(<ChallengeResultForm onSubmit={onSubmit} />);
    user.type(getHourInput(), hourToInput.toString());
    user.click(getSubmitButton());
    const hourErrorMessage = await screen.findByText(
      "Hour must be between 0-99."
    );
    expect(hourErrorMessage).toBeInTheDocument();
    expect(getHourInput()).toBeInvalid();
    expect(onSubmit).not.toHaveBeenCalled();
  }
);
