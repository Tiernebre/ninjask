import { Fragment, useCallback, useEffect, useState } from "react";
import { SessionService, Session } from "../../api/session";

const ONE_MINUTE_IN_SECONDS = 60;

const secondsSinceEpoch = () => Math.round(Date.now() / 1000);

type SessionRefresherProps = {
  onSessionRefresh: (session: Session) => void;
  onSessionRefreshFail: () => void;
  sessionService: SessionService;
  children: React.ReactNode;
  session?: Session;
};

export const SessionRefresher = ({
  onSessionRefresh,
  onSessionRefreshFail,
  sessionService,
  session,
  children,
}: SessionRefresherProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const refreshSession = useCallback(async () => {
    try {
      const refreshedSession = await sessionService.refreshCurrentSession();
      onSessionRefresh(refreshedSession);
    } catch (error) {
      onSessionRefreshFail();
    } finally {
      setIsLoading(false);
    }
  }, [onSessionRefresh, onSessionRefreshFail, sessionService]);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  useEffect(() => {
    let refreshTimeout: number;
    if (session?.accessToken && session?.accessTokenExpiration) {
      const refreshTimeoutInMs = (session.accessTokenExpiration - ONE_MINUTE_IN_SECONDS - secondsSinceEpoch()) * 1000
      refreshTimeout = window.setTimeout(
        refreshSession,
        refreshTimeoutInMs
      );
    } else {
      // no-op, as a refresh timestamp has not been setup yet.
      refreshTimeout = window.setTimeout(() => {});
    }

    return () => {
      clearTimeout(refreshTimeout);
    };
  }, [session, refreshSession]);

  return isLoading ? <p>Loading...</p> : <Fragment>{children}</Fragment>;
};
