import { render, screen } from "@testing-library/react";
import flushPromises from "flush-promises";
import { act } from "react-dom/test-utils";
import { object, when } from "testdouble";
import { SessionService } from "../../api/session";
import { SessionRefresher } from "./SessionRefresher";

const loadingMessage = 'Loading...'
const childrenMessage = 'Session has refreshed'

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
  expect(screen.queryByText(childrenMessage)).toBeNull()
});

it("displays given children components when a refresh completed", async () => {
  const sessionService = object<SessionService>();
  when(sessionService.refreshCurrentSession()).thenResolve({ accessToken: 'some-valid-access-token' })
  render(
    <SessionRefresher
      onSessionRefresh={jest.fn()}
      onSessionRefreshFail={jest.fn()}
      sessionService={sessionService}
    >
      <p>{childrenMessage}</p>
    </SessionRefresher>
  );
  await act(async () => {
    await flushPromises()
  })
  expect(screen.getByText(childrenMessage)).toBeInTheDocument()
  expect(screen.queryByText(loadingMessage)).toBeNull()
});
