import { render, screen } from '@testing-library/react'
import { Navbar } from './Navbar'
import user from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import { MemoryRouter } from 'react-router'

it('logs the user out if they are logged in', async () => {
  const onLogOut = jest.fn()
  render(
    <MemoryRouter>
      <Navbar isAuthenticated={true} onLogOut={onLogOut} />
    </MemoryRouter>
  )
  const logoutButton = screen.getByRole('button', { name: /Log Out/g })
  await act(async () => {
    user.click(logoutButton)
  })
  expect(onLogOut).toHaveBeenCalled()
})

it('does not show the logout button if the user is not logged in', async () => {
  render(
    <MemoryRouter>
      <Navbar isAuthenticated={false} onLogOut={jest.fn()} />
    </MemoryRouter>
  )
  const logoutButton = screen.queryByRole('button', { name: /Log Out/g })
  expect(logoutButton).toBeNull()
})

it('shows the menu when the open menu button is clicked', async () => {
  render(
    <MemoryRouter>
      <Navbar isAuthenticated={false} onLogOut={jest.fn()} />
    </MemoryRouter>
  )
  const openMenuButton = screen.getByRole('button', { name: 'Open Menu' })
  await act(async () => {
    user.click(openMenuButton)
  })
  const menu = screen.getByRole('menu')
  expect(menu).toHaveClass('is-active')
})