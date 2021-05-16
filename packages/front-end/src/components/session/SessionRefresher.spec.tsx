import { render, screen } from "@testing-library/react";
import flushPromises from "flush-promises";
import { act } from "react-dom/test-utils";
import { object, when } from "testdouble";
import { SessionService } from "../../api/session";
import { SessionRefresher } from "./SessionRefresher";
import MockDate from "mockdate";

const loadingMessage = "Loading...";
const childrenMessage = "Session has refreshed";

beforeEach(() => {
  MockDate.set(0);
})

it("displays a loading message while a refresh occurs", () => {
  const sessionService = object<SessionService>();
  sessionService.refreshCurrentSession = () =>
    new Promise((res) => setTimeout(res, 5000));
  render(
    <SessionRefresher
      onSessionRefresh={jest.fn()}
      onSessionRefreshFail={jest.fn()}
      sessionService={sessionService}
    >
      <p>{childrenMessage}</p>
    </SessionRefresher>
  );
  expect(screen.getByText(loadingMessage)).toBeInTheDocument();
  expect(screen.queryByText(childrenMessage)).toBeNull();
});

it("handles a successful refresh", async () => {
  jest.useFakeTimers();
  const accessToken = "some-valid-access-token";
  const accessTokenExpiration = 10000;
  const sessionService = object<SessionService>();
  const onSessionRefresh = jest.fn();
  const onSessionRefreshFail = jest.fn();
  when(sessionService.refreshCurrentSession()).thenResolve({
    accessToken,
    accessTokenExpiration,
  });
  render(
    <SessionRefresher
      onSessionRefresh={onSessionRefresh}
      onSessionRefreshFail={onSessionRefreshFail}
      sessionService={sessionService}
    >
      <p>{childrenMessage}</p>
    </SessionRefresher>
  );
  await act(async () => {
    await flushPromises();
    jest.runAllTimers();
  });
  expect(screen.getByText(childrenMessage)).toBeInTheDocument();
  expect(screen.queryByText(loadingMessage)).toBeNull();
  expect(onSessionRefresh).toHaveBeenCalledTimes(1);
  expect(onSessionRefresh).toHaveBeenCalledWith({
    accessToken,
    accessTokenExpiration,
  });
  expect(onSessionRefreshFail).not.toHaveBeenCalled();
});

it("handles a failed refresh", async () => {
  const sessionService = object<SessionService>();
  const onSessionRefresh = jest.fn();
  const onSessionRefreshFail = jest.fn();
  when(sessionService.refreshCurrentSession()).thenReject(new Error());
  render(
    <SessionRefresher
      onSessionRefresh={onSessionRefresh}
      onSessionRefreshFail={onSessionRefreshFail}
      sessionService={sessionService}
    >
      <p>{childrenMessage}</p>
    </SessionRefresher>
  );
  await act(async () => {
    await flushPromises();
  });
  expect(screen.getByText(childrenMessage)).toBeInTheDocument();
  expect(screen.queryByText(loadingMessage)).toBeNull();
  expect(onSessionRefresh).not.toHaveBeenCalled();
  expect(onSessionRefreshFail).toHaveBeenCalled();
});

it("automatically refreshes at a given timeout in the future", async () => {
  jest.useFakeTimers();
  const accessToken = "some-valid-access-token";
  const accessTokenExpiration = 10000;
  const sessionService = object<SessionService>();
  const onSessionRefresh = jest.fn();
  const onSessionRefreshFail = jest.fn();
  when(sessionService.refreshCurrentSession()).thenResolve({
    accessToken,
    accessTokenExpiration,
  });
  const session = {
    accessToken,
    accessTokenExpiration
  }
  render(
    <SessionRefresher
      onSessionRefresh={onSessionRefresh}
      onSessionRefreshFail={onSessionRefreshFail}
      sessionService={sessionService}
      session={session}
    >
      <p>{childrenMessage}</p>
    </SessionRefresher>
  );
  await act(async () => {
    await flushPromises();
    jest.runAllTimers();
  });
  expect(screen.getByText(childrenMessage)).toBeInTheDocument();
  expect(screen.queryByText(loadingMessage)).toBeNull();
  expect(onSessionRefresh).toHaveBeenCalledTimes(2);
  expect(onSessionRefreshFail).not.toHaveBeenCalled();
});
