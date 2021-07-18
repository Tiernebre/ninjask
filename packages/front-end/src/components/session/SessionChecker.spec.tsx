import { render, screen } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { MemoryRouter, Route, Switch } from "react-router";
import { object, when } from "testdouble";
import { SessionService } from "../../api/session";
import { ISessionContext, SessionContext } from "../../hooks";
import { SessionChecker } from "./SessionChecker";

type MockSessionContextProviderProps = PropsWithChildren<{
  accessToken?: string;
  sessionService: SessionService;
  logOut?: () => Promise<void>;
}>;
const MockSessionContextProvider = ({
  children,
  logOut = jest.fn(),
  ...props
}: MockSessionContextProviderProps): JSX.Element => {
  const value: ISessionContext = {
    session: {
      accessToken: props.accessToken ?? "",
      accessTokenExpiration: 0,
    },
    setSession: jest.fn(),
    refreshSession: jest.fn(),
    logOut,
    ...props,
  };
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

it("renders given children elements if an access token is provided", () => {
  const expectedMessage = "Valid Session Token Content.";
  const unexpectedLoginMessage = "Redirected to Login!";
  const accessToken = "valid-access-token";
  const sessionService = object<SessionService>();
  when(sessionService.accessTokenIsValid(accessToken)).thenReturn(true);

  const testBed = (
    <MockSessionContextProvider
      accessToken={accessToken}
      sessionService={sessionService}
    >
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
  const unexpectedMessage = "Valid Session Token Content.";
  const expectedLoginMessage = "Redirected to Login!";
  const accessToken = "expired-access-token";
  const sessionService = object<SessionService>();
  when(sessionService.accessTokenIsValid(accessToken)).thenReturn(false);

  const testBed = (
    <MockSessionContextProvider
      accessToken={accessToken}
      sessionService={sessionService}
    >
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
  const accessToken = "expired-access-token";
  const sessionService = object<SessionService>();
  when(sessionService.accessTokenIsValid(accessToken)).thenReturn(false);
  const logOut = jest.fn();

  const testBed = (
    <MockSessionContextProvider
      accessToken={accessToken}
      sessionService={sessionService}
      logOut={logOut}
    >
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
  expect(logOut).not.toHaveBeenCalled();
  render(testBed);
  jest.advanceTimersByTime(100000);
  expect(logOut).toHaveBeenCalled();
});

it.each(["", undefined])(
  "redirects to login if access token provided is %p",
  (accessToken) => {
    const unexpectedMessage = "Valid Session Token Content.";
    const expectedLoginMessage = "Redirected to Login!";
    const testBed = (
      <MockSessionContextProvider
        accessToken={accessToken}
        sessionService={object<SessionService>()}
      >
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
