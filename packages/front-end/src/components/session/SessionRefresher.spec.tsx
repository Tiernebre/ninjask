import { render, screen, waitFor } from "@testing-library/react";
import { SessionRefresher } from "./SessionRefresher";
import MockDate from "mockdate";
import { v4 as uuid } from "uuid";
import { when } from "testdouble";
import {
  generateMockSessionContext,
  MockSessionContextProvider,
} from "../../test/hooks";

const loadingMessage = "Loading...";
const childrenMessage = "Session has refreshed";

beforeEach(() => {
  MockDate.set(0);
});

it("handles a successful refresh", async () => {
  const context = generateMockSessionContext();
  const newAccessToken = uuid();
  when(context.sessionService.refreshCurrentSession()).thenResolve({
    accessToken: newAccessToken,
    accessTokenExpiration: 1,
  });
  render(
    <MockSessionContextProvider value={context}>
      <SessionRefresher>
        <p>{childrenMessage}</p>
      </SessionRefresher>
    </MockSessionContextProvider>
  );
  await waitFor(() => expect(context.refreshSession).toHaveBeenCalledTimes(1));
  expect(screen.getByText(childrenMessage)).toBeInTheDocument();
  expect(screen.queryByText(loadingMessage)).toBeNull();
});

it("automatically refreshes at a given timeout in the future", async () => {
  jest.useFakeTimers();
  const accessToken = uuid();
  const accessTokenExpiration = 1;
  const context = generateMockSessionContext();
  const session = {
    accessToken,
    accessTokenExpiration,
  };
  when(context.sessionService.refreshCurrentSession()).thenResolve(session);
  render(
    <MockSessionContextProvider value={context}>
      <SessionRefresher>
        <p>{childrenMessage}</p>
      </SessionRefresher>
    </MockSessionContextProvider>
  );
  jest.runAllTimers();
  await waitFor(() => expect(context.refreshSession).toHaveBeenCalledTimes(2));
  expect(screen.getByText(childrenMessage)).toBeInTheDocument();
  expect(screen.queryByText(loadingMessage)).toBeNull();
});
