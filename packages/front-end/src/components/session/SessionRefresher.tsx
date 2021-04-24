import { Fragment, useCallback, useEffect, useState } from "react";
import { SessionService } from "../../api/session";
import useTimeout from "@rooks/use-timeout";

type SessionRefresherProps = {
  onSessionRefresh: (accessToken: string) => void;
  onSessionRefreshFail: () => void;
  sessionService: SessionService;
  children: React.ReactNode;
};

export const SessionRefresher = ({
  onSessionRefresh,
  onSessionRefreshFail,
  sessionService,
  children,
}: SessionRefresherProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [refreshTimestamp, setRefreshTimestamp] = useState()

  const refreshSession = useCallback(async () => {
    try {
      const { accessToken } = await sessionService.refreshCurrentSession();
      onSessionRefresh(accessToken);
    } catch (error) {
      onSessionRefreshFail();
    } finally {
      setIsLoading(false);
    }
  }, [onSessionRefresh, onSessionRefreshFail, sessionService]);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  return isLoading ? <p>Loading...</p> : <Fragment>{children}</Fragment>;
};
