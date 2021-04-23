import { render, screen } from "@testing-library/react";
import { LoginForm } from "./LoginForm";
import user from '@testing-library/user-event'
import { act } from "react-dom/test-utils";

const getAccessKeyInput = () => screen.getByLabelText(/Access Key/i)
const getPasswordInput = () => screen.getByLabelText(/Password/i)
const getSubmitButton = () => screen.getByRole('button', { name: /Login/i })
const getErrorMessage = () => screen.getByRole('alert', { name: /This field is required/i })

it('renders an error message and marks the access key input invalid if it is not filled out', async () => {
  render(<LoginForm onSubmit={jest.fn()} />)
  await act(async () => {
    await user.type(getPasswordInput(), 'p@55w0rd')
    await user.click(getSubmitButton())
  })
  expect(getAccessKeyInput()).toBeInvalid()
  expect(getErrorMessage()).toBeInTheDocument()
})

it('renders an error message and marks the password input invalid if it is not filled out', async () => {
  render(<LoginForm onSubmit={jest.fn()} />)
  await act(async () => {
    await user.type(getAccessKeyInput(), 'some-access-key-value')
    await user.click(getSubmitButton())
  })
  expect(getPasswordInput()).toBeInvalid()
  expect(getErrorMessage()).toBeInTheDocument()
})

it("submits the form when the form is filled out and valid and the user clicks on the login button", async () => {
  const onSubmit = jest.fn()
  render(<LoginForm onSubmit={onSubmit} />)
  const accessKey = 'some-access-key-value'
  const password = 'p@55w0rd'
  await act(async () => {
    await user.type(getAccessKeyInput(), accessKey)
    await user.type(getPasswordInput(), password)
    await user.click(getSubmitButton())
  })
  expect(onSubmit).toHaveBeenCalledTimes(1)
  expect(onSubmit).toHaveBeenCalledWith({
    accessKey,
    password
  })
})