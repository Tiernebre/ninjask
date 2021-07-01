import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { LoginForm } from "./LoginForm";
import { act } from "react-dom/test-utils";

const getAccessKeyInput = () =>
  screen.getByRole("textbox", { name: /Access Key/i });
const getPasswordInput = () => screen.getByLabelText("Password");
const getSubmitButton = () => screen.getByRole("button", { name: /Login/i });
const getAccessKeyErrorMessage = () =>
  screen.getByText("Access Key is required.");
const getPasswordErrorMessage = () => screen.getByText("Password is required.");

it("renders an error message and marks the access key input invalid if it is not filled out", async () => {
  const onSubmit = jest.fn();
  render(<LoginForm onSubmit={onSubmit} loading={false} />);
  await act(async () => {
    await user.type(getPasswordInput(), "p@55w0rd");
    await user.click(getSubmitButton());
  });
  expect(getAccessKeyInput()).toBeInvalid();
  expect(getAccessKeyInput()).toHaveClass("is-danger");
  expect(getAccessKeyErrorMessage()).toBeInTheDocument();
  expect(onSubmit).toHaveBeenCalledTimes(0);
});

it("renders an error message and marks the password input invalid if it is not filled out", async () => {
  const onSubmit = jest.fn();
  render(<LoginForm onSubmit={onSubmit} loading={false} />);
  await act(async () => {
    await user.type(getAccessKeyInput(), "some-access-key-value");
    await user.click(getSubmitButton());
  });
  expect(getPasswordInput()).toBeInvalid();
  expect(getPasswordInput()).toHaveClass("is-danger");
  expect(getPasswordErrorMessage()).toBeInTheDocument();
  expect(onSubmit).toHaveBeenCalledTimes(0);
});

it("submits the form when the form is filled out and valid and the user clicks on the login button", async () => {
  const onSubmit = jest.fn();
  render(<LoginForm onSubmit={onSubmit} loading={false} />);
  const accessKey = "some-access-key-value";
  const password = "p@55w0rd";
  await act(async () => {
    await user.type(getAccessKeyInput(), accessKey);
    await user.type(getPasswordInput(), password);
    await user.click(getSubmitButton());
  });
  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(onSubmit).toHaveBeenCalledWith({
    accessKey,
    password,
  });
  expect(getAccessKeyInput()).not.toHaveClass("is-danger");
  expect(getPasswordInput()).not.toHaveClass("is-danger");
});

it("marks the button as loading", async () => {
  render(<LoginForm onSubmit={jest.fn()} loading={true} />);
  expect(getSubmitButton()).toHaveClass("is-loading");
});
