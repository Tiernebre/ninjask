import { render, screen } from "@testing-library/react";
import { LoginForm } from "./LoginForm";
import user from '@testing-library/user-event'
import { act } from "react-dom/test-utils";

it('renders an error message and marks the access key input invalid if it is not filled out', async () => {
  render(<LoginForm />)
  await act(async () => {
    await user.type(screen.getByLabelText(/Password/i), 'p@55w0rd')
    await user.click(screen.getByRole('button', { name: /Login/i }))
  })
  const accessKeyInput = screen.getByLabelText(/Access Key/i)
  expect(accessKeyInput).toBeInvalid()
  expect(screen.getByRole('alert', { name: /This field is required/i })).toBeInTheDocument()
})