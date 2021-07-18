import { render, screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import { Login } from "./Login";
import { matchers, verify, when } from "testdouble";
import { MemoryRouter, Route, Switch } from "react-router";
import { AlertsProvider } from "@tiernebre/kecleon";
import {
  generateMockSessionContext,
  MockSessionContextProvider,
} from "../../test/hooks";

const getAccessKeyInput = () => screen.getByLabelText(/Access Key/i);
const getPasswordInput = () => screen.getByLabelText(/Password/i);
const getSubmitButton = () => screen.getByRole("button", { name: /Login/i });

it("processes a fully valid login", async () => {
  const accessKey = "access-key";
  const password = "p@55w0rd";
  const accessToken = "access-token";
  const accessTokenExpiration = 10000;
  const context = generateMockSessionContext();
  const session = {
    accessToken,
    accessTokenExpiration,
  };
  when(context.sessionService.createOne({ accessKey, password })).thenResolve(
    session
  );
  const expectedHomeMessage = "Hey! The Home Route Loaded Up Properly!";
  render(
    <MockSessionContextProvider value={context}>
      <AlertsProvider>
        <MemoryRouter>
          <Login />
          <Switch>
            <Route path="/home" exact>
              {expectedHomeMessage}
            </Route>
          </Switch>
        </MemoryRouter>
      </AlertsProvider>
    </MockSessionContextProvider>
  );
  user.type(getAccessKeyInput(), accessKey);
  user.type(getPasswordInput(), password);
  user.click(getSubmitButton());
  await waitFor(() => {
    verify(context.sessionService.createOne(matchers.anything()));
  });
  expect(context.setSession).toHaveBeenCalledWith(session);
  expect(screen.getByText(expectedHomeMessage)).toBeInTheDocument();
});
