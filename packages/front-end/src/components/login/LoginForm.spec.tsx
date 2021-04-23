import { render, screen } from "@testing-library/react";
import { LoginForm } from "./LoginForm";
import user from '@testing-library/user-event'
import { act } from "react-dom/test-utils";

const getAccessKeyInput = () => screen.getByLabelText(/Access Key/i)
const getPasswordInput = () => screen.getByLabelText(/Password/i)

it('renders an error message and marks the access key input invalid if it is not filled out', async () => {
  render(<LoginForm />)
  await act(async () => {
    await user.type(getPasswordInput(), 'p@55w0rd')
    await user.click(screen.getByRole('button', { name: /Login/i }))
  })
  expect(getAccessKeyInput()).toBeInvalid()
  expect(screen.getByRole('alert', { name: /This field is required/i })).toBeInTheDocument()
})

it('renders an error message and marks the password input invalid if it is not filled out', async () => {
  render(<LoginForm />)
  await act(async () => {
    await user.type(getAccessKeyInput(), 'some-access-key-value')
    await user.click(screen.getByRole('button', { name: /Login/i }))
  })
  expect(getPasswordInput()).toBeInvalid()
  expect(screen.getByRole('alert', { name: /This field is required/i })).toBeInTheDocument()
})