import { render, screen } from "@testing-library/react";
import { ChallengeResultForm } from "./ChallengeResultForm";
import user from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

const getHourInput = () => screen.getByRole("spinbutton", { name: /Hour/i });
const getMinutesInput = () =>
  screen.getByRole("spinbutton", { name: /Minutes/i });
const getSubmitButton = () => screen.getByRole("button", { name: /Submit/i });
const getHourErrorMessage = () => screen.getByRole("alert", { name: /Hour/i });
const queryHourErrorMessage = () =>
  screen.queryByRole("alert", { name: /Hour/i });
const getMinutesErrorMessage = () =>
  screen.getByRole("alert", { name: /Minutes/i });
const queryMinutesErrorMessage = () =>
  screen.queryByRole("alert", { name: /Minutes/i });

it("displays an error message if the hour field is not filled out", async () => {
  const onSubmit = jest.fn();
  await act(async () => {
    render(<ChallengeResultForm onSubmit={onSubmit} />);
    user.click(getSubmitButton());
  });
  const hourErrorMessage = getHourErrorMessage();
  expect(hourErrorMessage).toBeInTheDocument();
  expect(hourErrorMessage).toHaveTextContent("Hour is required.");
  expect(getHourInput()).toBeInvalid();
  expect(onSubmit).not.toHaveBeenCalled();
});

it.each([-1000, -1, 100, Number.MAX_SAFE_INTEGER])(
  "displays an error message that hour needs to be within a range when %p is provided as the hour",
  async (hourToInput: number) => {
    const onSubmit = jest.fn();
    await act(async () => {
      render(<ChallengeResultForm onSubmit={onSubmit} />);
      user.type(getHourInput(), hourToInput.toString());
      user.click(getSubmitButton());
    });
    const hourErrorMessage = getHourErrorMessage();
    expect(hourErrorMessage).toBeInTheDocument();
    expect(hourErrorMessage).toHaveTextContent("Hour must be between 0-99.");
    expect(getHourInput()).toBeInvalid();
    expect(onSubmit).not.toHaveBeenCalled();
  }
);

it.each([0, 1, 98, 99])(
  "does not display an error message about the hour if %p is provided",
  async (hourToInput: number) => {
    const onSubmit = jest.fn();
    await act(async () => {
      render(<ChallengeResultForm onSubmit={onSubmit} />);
      user.type(getHourInput(), hourToInput.toString());
      user.click(getSubmitButton());
    });
    expect(queryHourErrorMessage()).toBeNull();
  }
);

it("displays an error message if the minutes field is not filled out", async () => {
  const onSubmit = jest.fn();
  await act(async () => {
    render(<ChallengeResultForm onSubmit={onSubmit} />);
    user.click(getSubmitButton());
  });
  const minutesErrorMessage = getMinutesErrorMessage();
  expect(minutesErrorMessage).toBeInTheDocument();
  expect(minutesErrorMessage).toHaveTextContent("Minutes are required.");
  expect(getMinutesInput()).toBeInvalid();
  expect(onSubmit).not.toHaveBeenCalled();
});

it.each([-1000, -1, 60, Number.MAX_SAFE_INTEGER])(
  "displays an error message that minutes needs to be within a range when %p is provided",
  async (minutesToInput: number) => {
    const onSubmit = jest.fn();
    await act(async () => {
      render(<ChallengeResultForm onSubmit={onSubmit} />);
      user.type(getMinutesInput(), minutesToInput.toString());
      user.click(getSubmitButton());
    });
    const minutesErrorMessage = getMinutesErrorMessage();
    expect(minutesErrorMessage).toBeInTheDocument();
    expect(minutesErrorMessage).toHaveTextContent(
      "Minutes must be between 0-59."
    );
    expect(getMinutesInput()).toBeInvalid();
    expect(onSubmit).not.toHaveBeenCalled();
  }
);

it.each([0, 1, 58, 59])(
  "does not display an error message about the minutes if %p is provided",
  async (minutesToInput: number) => {
    const onSubmit = jest.fn();
    await act(async () => {
      render(<ChallengeResultForm onSubmit={onSubmit} />);
      user.type(getMinutesInput(), minutesToInput.toString());
      user.click(getSubmitButton());
    });
    expect(queryMinutesErrorMessage()).toBeNull();
  }
);

it("submits the form when valid information is filled in", async () => {
    const onSubmit = jest.fn();
    await act(async () => {
      render(<ChallengeResultForm onSubmit={onSubmit} />);
      user.type(getHourInput(), "23")
      user.type(getMinutesInput(), "55");
      user.click(getSubmitButton());
    });
    expect(onSubmit).toHaveBeenCalled()
    expect(queryHourErrorMessage()).toBeNull();
    expect(queryMinutesErrorMessage()).toBeNull();
})
