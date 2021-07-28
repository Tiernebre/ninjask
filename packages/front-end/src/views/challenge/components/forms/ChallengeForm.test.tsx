import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { ChallengeForm } from "./ChallengeForm";
import user from "@testing-library/user-event";
import { MockSessionContextProvider } from "../../../../../test";

const getSubmitButton = () =>
  screen.getByRole("button", { name: "Create Challenge" });
const getNameInput = () => screen.getByLabelText("Name");

const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(screen.getByLabelText("Loading..."));

it("displays error feedback if no name is provided", async () => {
  const onSubmit = jest.fn();
  render(
    <MockSessionContextProvider>
      <ChallengeForm onSubmit={onSubmit} />
    </MockSessionContextProvider>
  );
  await waitForLoadingToFinish();
  user.click(getSubmitButton());
  const errorMessage = await screen.findByText(
    "The challenge name is required"
  );
  expect(errorMessage).toBeInTheDocument();
});

it("displays error feedback if the name is too long", async () => {
  const onSubmit = jest.fn();
  render(
    <MockSessionContextProvider>
      <ChallengeForm onSubmit={onSubmit} />
    </MockSessionContextProvider>
  );
  await waitForLoadingToFinish();
  user.type(getNameInput(), "a".repeat(33));
  user.click(getSubmitButton());
  const errorMessage = await screen.findByText(
    "Should be at most 32 characters long"
  );
  expect(errorMessage).toBeInTheDocument();
});
