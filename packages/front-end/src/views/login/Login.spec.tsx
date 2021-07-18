import { render, screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import { Login } from "./Login";
import { MemoryRouter, Route, Switch } from "react-router";
import { AlertsProvider } from "@tiernebre/kecleon";
import {
  generateMockSessionContext,
  MockSessionContextProvider,
} from "../../../test";

const getAccessKeyInput = () => screen.getByLabelText(/Access Key/i);
const getPasswordInput = () => screen.getByLabelText(/Password/i);
const getSubmitButton = () => screen.getByRole("button", { name: /Login/i });

it("processes a fully valid login", async () => {
  const accessKey = "access-key";
  const password = "p@55w0rd";
  const context = generateMockSessionContext();
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
  await waitFor(() =>
    expect(context.logIn).toHaveBeenCalledWith({ accessKey, password })
  );
  expect(screen.getByText(expectedHomeMessage)).toBeInTheDocument();
});
