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
  expect(
    screen.getByText("The challenge name is required")
  ).toBeInTheDocument();
});
