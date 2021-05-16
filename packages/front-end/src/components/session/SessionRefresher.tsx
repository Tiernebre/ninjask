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
      console.log('Refreshed Session!')
    } catch (error) {
      onSessionRefreshFail();
      console.log('Refresh Failed!')
    } finally {
      setIsLoading(false);
    }
  }, [onSessionRefresh, onSessionRefreshFail, sessionService]);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  useEffect(() => {
    console.log('use effect re-render?')
    let refreshTimeout: number;
    if (session?.accessToken && session?.accessTokenExpiration) {
      const refreshTimeoutInMs = (session.accessTokenExpiration - ONE_MINUTE_IN_SECONDS - secondsSinceEpoch()) * 1000
      refreshTimeout = window.setTimeout(
        refreshSession,
        refreshTimeoutInMs
      );
      console.log(`setup timeout for refresh, happening in ${refreshTimeoutInMs} ms due to expiration time of ${session.accessTokenExpiration}`)
    } else {
      // no-op, as a refresh timestamp has not been setup yet.
      refreshTimeout = window.setTimeout(() => {});
      console.log('no-op refresh timeout... due to no valid session')
    }

    return () => {
      clearTimeout(refreshTimeout);
    };
  }, [session, refreshSession]);

  return isLoading ? <p>Loading...</p> : <Fragment>{children}</Fragment>;
};
