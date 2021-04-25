import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Switch } from "react-router";
import { object, when } from "testdouble";
import { SessionService } from "../../api/session";
import { SessionChecker } from "./SessionChecker";

it("renders given children elements if an access token is provided", () => {
  const expectedMessage = "Valid Session Token Content.";
  const unexpectedLoginMessage = "Redirected to Login!";
  const accessToken = "valid-access-token";
  const sessionService = object<SessionService>();
  when(sessionService.accessTokenIsValid(accessToken)).thenReturn(true);
  const onExpiredSession = jest.fn();

  const testBed = (
    <MemoryRouter>
      <SessionChecker
        accessToken={accessToken}
        sessionService={sessionService}
        onExpiredSession={onExpiredSession}
      >
        <p>{expectedMessage}</p>
      </SessionChecker>
      <Switch>
        <Route path="/login" exact>
          {unexpectedLoginMessage}
        </Route>
      </Switch>
    </MemoryRouter>
  );
  render(testBed);
  expect(screen.getByText(expectedMessage)).toBeInTheDocument();
  expect(screen.queryByText(unexpectedLoginMessage)).toBeNull();
  expect(onExpiredSession).not.toHaveBeenCalled();
});

it.each(["", undefined])(
  "redirects to login if access token provided is %p",
  (accessToken) => {
    const unexpectedMessage = "Valid Session Token Content.";
    const expectedLoginMessage = "Redirected to Login!";
    const testBed = (
      <MemoryRouter>
        <SessionChecker
          accessToken={accessToken}
          sessionService={object<SessionService>()}
          onExpiredSession={jest.fn()}
        >
          <p>{unexpectedMessage}</p>
        </SessionChecker>
        <Switch>
          <Route path="/login" exact>
            {expectedLoginMessage}
          </Route>
        </Switch>
      </MemoryRouter>
    );
    render(testBed);
    expect(screen.queryByText(unexpectedMessage)).toBeNull();
    expect(screen.getByText(expectedLoginMessage)).toBeInTheDocument();
  }
);
