import { render, screen } from "@testing-library/react";
import { ChallengeForm } from "./ChallengeForm";
import user from "@testing-library/user-event";
import { MockSessionContextProvider } from "../../../../../test";

const getSubmitButton = () =>
  screen.getByRole("button", { name: "Create Challenge" });

it("displays error feedback if no name is provided", () => {
  const onSubmit = jest.fn();
  render(
    <MockSessionContextProvider>
      <ChallengeForm onSubmit={onSubmit} />
    </MockSessionContextProvider>
  );
  user.click(getSubmitButton());
  expect(
    screen.getByText("The challenge name is required")
  ).toBeInTheDocument();
});
