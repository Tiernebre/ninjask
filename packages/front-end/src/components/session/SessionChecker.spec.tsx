import { render, screen } from '@testing-library/react'
import { SessionChecker } from './SessionChecker'

it('renders given children elements if an access token is provided', () => {
  const expectedMessage = 'Valid Session Token Content.'
  const testBed = (
    <SessionChecker accessToken="Valid Access Token">
      <p>{expectedMessage}</p>
    </SessionChecker>
  )
  render(testBed)
  expect(screen.getByText(expectedMessage)).toBeInTheDocument()
})