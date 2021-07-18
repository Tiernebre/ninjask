import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Switch } from "react-router";
import { when } from "testdouble";
import {
  generateMockSessionContext,
  MockSessionContextProvider,
} from "../../test/hooks";
import { SessionChecker } from "./SessionChecker";

it("renders given children elements if an access token is provided", () => {
  const expectedMessage = "Valid Session Token Content.";
  const unexpectedLoginMessage = "Redirected to Login!";
  const context = generateMockSessionContext();
  when(
    context.sessionService.accessTokenIsValid(context.accessToken as string)
  ).thenReturn(true);

  const testBed = (
    <MockSessionContextProvider value={context}>
      <MemoryRouter>
        <SessionChecker>
          <p>{expectedMessage}</p>
        </SessionChecker>
        <Switch>
          <Route path="/login" exact>
            {unexpectedLoginMessage}
          </Route>
        </Switch>
      </MemoryRouter>
    </MockSessionContextProvider>
  );
  render(testBed);
  expect(screen.getByText(expectedMessage)).toBeInTheDocument();
  expect(screen.queryByText(unexpectedLoginMessage)).toBeNull();
});

it("redirects to login if access token provided has expired", () => {
  const context = generateMockSessionContext();
  when(
    context.sessionService.accessTokenIsValid(context.accessToken as string)
  ).thenReturn(false);
  const unexpectedMessage = "Valid Session Token Content.";
  const expectedLoginMessage = "Redirected to Login!";

  const testBed = (
    <MockSessionContextProvider value={context}>
      <MemoryRouter>
        <SessionChecker>
          <p>{unexpectedMessage}</p>
        </SessionChecker>
        <Switch>
          <Route path="/login" exact>
            {expectedLoginMessage}
          </Route>
        </Switch>
      </MemoryRouter>
    </MockSessionContextProvider>
  );
  render(testBed);
  expect(screen.getByText(expectedLoginMessage)).toBeInTheDocument();
  expect(screen.queryByText(unexpectedMessage)).toBeNull();
});

it("periodically checks and handles an expired access token", () => {
  jest.useFakeTimers();
  const unexpectedMessage = "Valid Session Token Content.";
  const expectedLoginMessage = "Redirected to Login!";
  const context = generateMockSessionContext();
  when(
    context.sessionService.accessTokenIsValid(context.accessToken as string)
  ).thenReturn(false);

  const testBed = (
    <MockSessionContextProvider value={context}>
      <MemoryRouter>
        <SessionChecker>
          <p>{unexpectedMessage}</p>
        </SessionChecker>
        <Switch>
          <Route path="/login" exact>
            {expectedLoginMessage}
          </Route>
        </Switch>
      </MemoryRouter>
    </MockSessionContextProvider>
  );
  expect(context.logOut).not.toHaveBeenCalled();
  render(testBed);
  jest.advanceTimersByTime(100000);
  expect(context.logOut).toHaveBeenCalled();
});

it.each(["", undefined])(
  "redirects to login if access token provided is %p",
  (accessToken) => {
    const unexpectedMessage = "Valid Session Token Content.";
    const expectedLoginMessage = "Redirected to Login!";
    const context = generateMockSessionContext();
    context.accessToken = accessToken;
    when(
      context.sessionService.accessTokenIsValid(context.accessToken as string)
    ).thenReturn(false);

    const testBed = (
      <MockSessionContextProvider value={context}>
        <MemoryRouter>
          <SessionChecker>
            <p>{unexpectedMessage}</p>
          </SessionChecker>
          <Switch>
            <Route path="/login" exact>
              {expectedLoginMessage}
            </Route>
          </Switch>
        </MemoryRouter>
      </MockSessionContextProvider>
    );
    render(testBed);
    expect(screen.queryByText(unexpectedMessage)).toBeNull();
    expect(screen.getByText(expectedLoginMessage)).toBeInTheDocument();
  }
);
