import { render, screen, waitFor } from "@testing-library/react";
import { object, when } from "testdouble";
import { SessionService } from "../../api/session";
import { SessionRefresher } from "./SessionRefresher";
import MockDate from "mockdate";
import { PropsWithChildren } from "react";
import { ISessionContext, SessionContext } from "../../hooks";
import { v4 as uuid } from "uuid";

const loadingMessage = "Loading...";
const childrenMessage = "Session has refreshed";

const generateMockSessionContext = (): ISessionContext => ({
  session: {
    accessToken: uuid(),
    accessTokenExpiration: 1,
  },
  sessionService: object<SessionService>(),
  logOut: jest.fn(),
  setSession: jest.fn(),
  refreshSession: jest.fn(),
});

type MockSessionContextProviderProps = PropsWithChildren<{
  value?: ISessionContext;
}>;
const MockSessionContextProvider = ({
  children,
  value = generateMockSessionContext(),
}: MockSessionContextProviderProps): JSX.Element => {
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

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
