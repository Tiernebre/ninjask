import { render, screen } from '@testing-library/react'
import { NightModeToggle, NIGHT_MODE_KEY, NIGHT_MODE_STYLESHEET_ID } from './NightModeToggle'
import user from '@testing-library/user-event'

const getSwitch = () => screen.getByRole('switch')

beforeEach(() => {
  localStorage.clear()
})

it('sets dark theme if the user checks the switch to the "on" state', async () => {
  render(<NightModeToggle />)
  await user.click(getSwitch())
  expect(localStorage.getItem(NIGHT_MODE_KEY)).toEqual("true")
  expect(document.getElementById(NIGHT_MODE_STYLESHEET_ID)).toBeTruthy()
})

it('sets dark theme if the user checks the switch to the "off" state', async () => {
  render(<NightModeToggle />)
  await user.click(getSwitch())
  await user.click(getSwitch())
  expect(localStorage.getItem(NIGHT_MODE_KEY)).toEqual("false")
  expect(document.getElementById(NIGHT_MODE_STYLESHEET_ID)).toBeFalsy()
})