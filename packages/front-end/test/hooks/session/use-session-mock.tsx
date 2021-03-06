import { PropsWithChildren } from "react";
import { object } from "testdouble";
import { SessionService } from "../../../src/api";
import { ISessionContext, SessionContext } from "../../../src/hooks";
import { v4 as uuid } from "uuid";
import { generateRandomNumber } from "../../random/random";

export const generateMockSessionContext = (): ISessionContext => ({
  session: {
    accessToken: uuid(),
    accessTokenExpiration: generateRandomNumber(),
  },
  sessionPayload: {
    userId: generateRandomNumber(),
    accessKey: uuid(),
  },
  accessToken: uuid(),
  sessionService: object<SessionService>(),
  logIn: jest.fn(),
  logOut: jest.fn(),
  setSession: jest.fn(),
  refreshSession: jest.fn(),
});

type MockSessionContextProviderProps = PropsWithChildren<{
  value?: ISessionContext;
}>;

export const MockSessionContextProvider = ({
  children,
  value = generateMockSessionContext(),
}: MockSessionContextProviderProps): JSX.Element => {
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};
