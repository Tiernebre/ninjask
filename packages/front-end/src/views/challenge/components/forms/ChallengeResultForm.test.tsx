import { screen, render, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import { ChallengeResultForm } from ".";
import { ChallengeResult } from "../../../api";

const getHourInput = () => screen.getByRole("spinbutton", { name: /Hour/i });
const getMinutesInput = () =>
  screen.getByRole("spinbutton", { name: /Minutes/i });
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

it("displays an error message if the minutes field is not filled out", async () => {
  const onSubmit = jest.fn();
  render(<ChallengeResultForm onSubmit={onSubmit} />);
  user.click(getSubmitButton());
  const minutesErrorMessage = await screen.findByText("Minutes are required.");
  expect(minutesErrorMessage).toBeInTheDocument();
  expect(getMinutesInput()).toBeInvalid();
  expect(onSubmit).not.toHaveBeenCalled();
});

it.each([-1000, -1, 60, Number.MAX_SAFE_INTEGER])(
  "displays an error message that minutes needs to be within a range when %p is provided",
  async (minutesToInput: number) => {
    const onSubmit = jest.fn();
    render(<ChallengeResultForm onSubmit={onSubmit} />);
    user.type(getMinutesInput(), minutesToInput.toString());
    user.click(getSubmitButton());
    const minutesErrorMessage = await screen.findByText(
      "Minutes must be between 0-59."
    );
    expect(minutesErrorMessage).toBeInTheDocument();
    expect(getMinutesInput()).toBeInvalid();
    expect(onSubmit).not.toHaveBeenCalled();
  }
);

it("submits the form when valid information is filled in", async () => {
  const onSubmit = jest.fn();
  render(<ChallengeResultForm onSubmit={onSubmit} />);
  const completionTimeHour = 23;
  const completionTimeMinutes = 55;
  user.type(getHourInput(), completionTimeHour.toString());
  user.type(getMinutesInput(), completionTimeMinutes.toString());
  user.click(getSubmitButton());
  await waitFor(() => expect(onSubmit).toHaveBeenCalled());
  expect(onSubmit).toHaveBeenCalledWith({
    completionTimeHour,
    completionTimeMinutes,
  });
});

it("pre-fills the form if an existing result is provided", async () => {
  const onSubmit = jest.fn();
  const result: ChallengeResult = {
    participantId: 1,
    nickname: "Test User",
    completionTimeHour: 23,
    completionTimeMinutes: 45,
    resultId: 1,
  };
  render(<ChallengeResultForm onSubmit={onSubmit} existingResult={result} />);
  await waitFor(() =>
    expect(getHourInput()).toHaveValue(result.completionTimeHour)
  );
  await waitFor(() =>
    expect(getMinutesInput()).toHaveValue(result.completionTimeMinutes)
  );
});

it("allows a user to manually override even if existing results are provided", async () => {
  const onSubmit = jest.fn();
  const result: ChallengeResult = {
    participantId: 1,
    nickname: "Test User",
    completionTimeHour: 10,
    completionTimeMinutes: 10,
    resultId: 1,
  };
  render(<ChallengeResultForm onSubmit={onSubmit} existingResult={result} />);
  await waitFor(() =>
    expect(getHourInput()).toHaveValue(result.completionTimeHour)
  );
  await waitFor(() =>
    expect(getMinutesInput()).toHaveValue(result.completionTimeMinutes)
  );
  const completionTimeHour = 12;
  const completionTimeMinutes = 7;
  user.clear(getHourInput());
  user.type(getHourInput(), completionTimeHour.toString());
  user.clear(getMinutesInput());
  user.type(getMinutesInput(), completionTimeMinutes.toString());
  user.click(getSubmitButton());
  await waitFor(() => expect(getHourInput()).toHaveValue(completionTimeHour));
  await waitFor(() =>
    expect(getMinutesInput()).toHaveValue(completionTimeMinutes)
  );
  await waitFor(() => expect(onSubmit).toHaveBeenCalled());
  expect(onSubmit).toHaveBeenCalledWith({
    completionTimeHour,
    completionTimeMinutes,
  });
});
