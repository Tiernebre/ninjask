import React, {
  PropsWithChildren,
  useCallback,
  useState,
  useMemo,
} from "react";
import {
  FetchHttpClient,
  HttpClient,
  HttpSessionService,
  Session,
} from "../../api";

type Context = {
  session?: Session;
  accessToken?: string;
  httpClient: HttpClient;
  setSession: (session: Session) => void;
  logOut: () => void;
};

const SessionContext = React.createContext<Context | undefined>(undefined);

export const SessionProvider = ({
  children,
}: PropsWithChildren<unknown>): JSX.Element => {
  const [session, setSession] = useState<Session>();
  const accessToken = session?.accessToken;
  const httpClient = useMemo(
    () =>
      new FetchHttpClient(
        process.env.REACT_APP_BACK_END_API_HTTP_URL,
        accessToken
      ),
    [accessToken]
  );
  const sessionService = useMemo(
    () => new HttpSessionService(httpClient),
    [httpClient]
  );

  const logOut = useCallback(async () => {
    setSession(undefined);
    await sessionService.deleteCurrentSession();
  }, [sessionService]);

  const value = { session, setSession, accessToken, logOut, httpClient };
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

export const useSession = (): Context => {
  const context = React.useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
