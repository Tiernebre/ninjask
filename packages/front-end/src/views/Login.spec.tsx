import { act, render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { Login } from "./Login";
import { object, when } from "testdouble";
import { SessionService } from "../api/session";
import flushPromises from "flush-promises";
import { MemoryRouter, Route, Switch } from "react-router";

const getAccessKeyInput = () => screen.getByLabelText(/Access Key/i);
const getPasswordInput = () => screen.getByLabelText(/Password/i);
const getSubmitButton = () => screen.getByRole("button", { name: /Login/i });

it("processes a fully valid login", async () => {
  const accessKey = "access-key";
  const password = "p@55w0rd";
  const sessionService = object<SessionService>();
  const accessToken = "access-token";
  const accessTokenExpiration = 10000
  const onSuccess = jest.fn();
  when(sessionService.createOne({ accessKey, password })).thenResolve({
    accessToken,
    accessTokenExpiration
  });
  const expectedHomeMessage = "Hey! The Home Route Loaded Up Properly!";
  render(
    <MemoryRouter>
      <Login onSuccess={onSuccess} sessionService={sessionService} />
      <Switch>
        <Route path="/home" exact>
          {expectedHomeMessage}
        </Route>
      </Switch>
    </MemoryRouter>
  );
  await act(async () => {
    await user.type(getAccessKeyInput(), "access-key");
    await user.type(getPasswordInput(), "p@55w0rd");
    await user.click(getSubmitButton());
  });
  await flushPromises();
  expect(onSuccess).toHaveBeenCalledWith({ accessToken, accessTokenExpiration });
  expect(screen.getByText(expectedHomeMessage)).toBeInTheDocument();
});

it("displays a login error message if the login submission did not work", async () => {
  const accessKey = "access-key";
  const password = "p@55w0rd";
  const sessionService = object<SessionService>();
  when(sessionService.createOne({ accessKey, password })).thenReject(
    new Error()
  );
  render(<Login onSuccess={jest.fn()} sessionService={sessionService} />);
  await act(async () => {
    await user.type(getAccessKeyInput(), "access-key");
    await user.type(getPasswordInput(), "p@55w0rd");
    await user.click(getSubmitButton());
  });
  await flushPromises();
  const errorMessage = screen.getByRole("alert");
  expect(errorMessage).toBeInTheDocument();
  expect(errorMessage).toHaveTextContent(
    /The information submitted was incorrect./i
  );
});
