import { render, screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import { Login } from "./Login";
import { matchers, object, verify, when } from "testdouble";
import { SessionService } from "../api/session";
import { MemoryRouter, Route, Switch } from "react-router";
import { AlertsProvider } from "@tiernebre/kecleon";

const getAccessKeyInput = () => screen.getByLabelText(/Access Key/i);
const getPasswordInput = () => screen.getByLabelText(/Password/i);
const getSubmitButton = () => screen.getByRole("button", { name: /Login/i });

it("processes a fully valid login", async () => {
  const accessKey = "access-key";
  const password = "p@55w0rd";
  const sessionService = object<SessionService>();
  const accessToken = "access-token";
  const accessTokenExpiration = 10000;
  const onSuccess = jest.fn();
  when(sessionService.createOne({ accessKey, password })).thenResolve({
    accessToken,
    accessTokenExpiration,
  });
  const expectedHomeMessage = "Hey! The Home Route Loaded Up Properly!";
  render(
    <AlertsProvider>
      <MemoryRouter>
        <Login onSuccess={onSuccess} sessionService={sessionService} />
        <Switch>
          <Route path="/home" exact>
            {expectedHomeMessage}
          </Route>
        </Switch>
      </MemoryRouter>
    </AlertsProvider>
  );
  user.type(getAccessKeyInput(), accessKey);
  user.type(getPasswordInput(), password);
  user.click(getSubmitButton());
  await waitFor(() => {
    verify(sessionService.createOne(matchers.anything()));
  });
  expect(onSuccess).toHaveBeenCalledWith({
    accessToken,
    accessTokenExpiration,
  });
  expect(screen.getByText(expectedHomeMessage)).toBeInTheDocument();
});