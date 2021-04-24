import { Fragment, useCallback, useEffect, useState } from "react";
import { SessionService } from "../../api/session";

type SessionRefresherProps = {
  onSessionRefresh: (accessToken: string) => void;
  onSessionRefreshFail: () => void;
  sessionService: SessionService;
  children: React.ReactNode;
};

const ONE_MINUTE_IN_MS = 60000;

export const SessionRefresher = ({
  onSessionRefresh,
  onSessionRefreshFail,
  sessionService,
  children,
}: SessionRefresherProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [refreshTimestamp, setRefreshTimestamp] = useState<number>();

  const refreshSession = useCallback(async () => {
    try {
      const {
        accessToken,
        accessTokenExpiration,
      } = await sessionService.refreshCurrentSession();
      onSessionRefresh(accessToken);
      // set a refresh in the future for one minute right before the set expiration.
      setRefreshTimestamp(accessTokenExpiration - ONE_MINUTE_IN_MS);
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
    if (refreshTimestamp) {
      refreshTimeout = window.setTimeout(refreshSession, refreshTimestamp);
    } else {
      // no-op, as a refresh timestamp has not been setup yet.
      refreshTimeout = window.setTimeout(() => {});
    }

    return () => {
      clearTimeout(refreshTimeout);
    };
  }, [refreshTimestamp, refreshSession]);

  return isLoading ? <p>Loading...</p> : <Fragment>{children}</Fragment>;
};
