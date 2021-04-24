import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Switch } from 'react-router'
import { SessionChecker } from './SessionChecker'

it('renders given children elements if an access token is provided', () => {
  const expectedMessage = 'Valid Session Token Content.'
  const unexpectedLoginMessage = 'Redirected to Login!'

  const testBed = (
    <MemoryRouter>
      <SessionChecker accessToken="valid-token">
        <p>{expectedMessage}</p>
      </SessionChecker>
      <Switch>
        <Route path="/login" exact>
          {unexpectedLoginMessage}
        </Route>
      </Switch>
    </MemoryRouter>
  )
  render(testBed)
  expect(screen.getByText(expectedMessage)).toBeInTheDocument()
  expect(screen.queryByText(unexpectedLoginMessage)).toBeNull()
})

it.each(['', undefined])('redirects to login if access token provided is %p', (accessToken) => {
  const unexpectedMessage = 'Valid Session Token Content.'
  const expectedLoginMessage = 'Redirected to Login!'
  const testBed = (
    <MemoryRouter>
      <SessionChecker accessToken={accessToken}>
        <p>{unexpectedMessage}</p>
      </SessionChecker>
      <Switch>
        <Route path="/login" exact>
          {expectedLoginMessage}
        </Route>
      </Switch>
    </MemoryRouter>
  )
  render(testBed)
  expect(screen.queryByText(unexpectedMessage)).toBeNull()
  expect(screen.getByText(expectedLoginMessage)).toBeInTheDocument()
})