import React, { PropsWithChildren, useCallback, useState } from "react";
import {
  FetchHttpClient,
  HttpSessionService,
  Session,
  SessionPayload,
  SessionRequest,
  SessionService,
} from "../../api";

const httpClient = new FetchHttpClient(
  process.env.REACT_APP_BACK_END_API_HTTP_URL
);
const sessionService = new HttpSessionService(httpClient);

export type ISessionContext = {
  session?: Session;
  sessionPayload: SessionPayload | null;
  setSession: (session?: Session) => void;
  accessToken?: string;
  logIn: (request: SessionRequest) => Promise<void>;
  logOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
  // TODO: This does not belong here, but a lot of components rely on it :/
  sessionService: SessionService;
};

export const SessionContext = React.createContext<ISessionContext | undefined>(
  undefined
);

export const SessionProvider = ({
  children,
}: PropsWithChildren<unknown>): JSX.Element => {
  const [session, setSession] = useState<Session>();
  const accessToken = session?.accessToken;
  const sessionPayload = accessToken
    ? sessionService.getSessionPayloadFromAccessToken(accessToken)
    : null;

  const logIn = useCallback(
    async (request: SessionRequest) => {
      setSession(await sessionService.createOne(request));
    },
    [setSession]
  );

  const logOut = useCallback(async () => {
    setSession(undefined);
    await sessionService.deleteCurrentSession();
  }, [setSession]);

  const refreshSession = useCallback(async () => {
    try {
      const refreshedSession = await sessionService.refreshCurrentSession();
      console.log(refreshedSession);
      setSession(refreshedSession);
    } catch (error) {
      await logOut();
    }
  }, [setSession, logOut]);

  const value = {
    session,
    sessionPayload,
    setSession,
    accessToken,
    logIn,
    logOut,
    sessionService,
    refreshSession,
  };
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

export const useSession = (): ISessionContext => {
  const context = React.useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
