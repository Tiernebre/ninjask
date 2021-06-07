import { render, screen } from '@testing-library/react'
import { Navbar } from './Navbar'
import user from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import { MemoryRouter } from 'react-router'

it('logs the user out if they are logged in', async () => {
  const isAuthenticated = true
  const onLogOut = jest.fn()
  render(
    <MemoryRouter>
      <Navbar isAuthenticated={isAuthenticated} onLogOut={onLogOut} />
    </MemoryRouter>
  )
  const logoutButton = screen.getByRole('button', { name: /Log Out/g })
  await act(async () => {
    user.click(logoutButton)
  })
  expect(onLogOut).toHaveBeenCalled()
})