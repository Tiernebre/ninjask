import { Fragment, useCallback, useEffect, useState } from "react";
import { SessionService, Session } from "../../api/session";

type SessionRefresherProps = {
  onSessionRefresh: (session: Session) => void;
  onSessionRefreshFail: () => void;
  sessionService: SessionService;
  children: React.ReactNode;
  sessionRefreshTimestamp?: number;
};

export const SessionRefresher = ({
  onSessionRefresh,
  onSessionRefreshFail,
  sessionService,
  children,
  sessionRefreshTimestamp,
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
    if (sessionRefreshTimestamp) {
      refreshTimeout = window.setTimeout(
        refreshSession,
        sessionRefreshTimestamp
      );
    } else {
      // no-op, as a refresh timestamp has not been setup yet.
      refreshTimeout = window.setTimeout(() => {});
    }

    return () => {
      clearTimeout(refreshTimeout);
    };
  }, [sessionRefreshTimestamp, refreshSession]);

  return isLoading ? <p>Loading...</p> : <Fragment>{children}</Fragment>;
};
