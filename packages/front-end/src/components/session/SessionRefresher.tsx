import { Fragment, useEffect, useState } from "react";
import { SessionService } from "../../api/session";

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

  useEffect(() => {
    const refreshSession = async () => {
      try {
        const { accessToken } = await sessionService.refreshCurrentSession();
        onSessionRefresh(accessToken);
      } catch (error) {
        onSessionRefreshFail();
      } finally {
        setIsLoading(false);
      }
    };
    refreshSession();
  }, [sessionService, onSessionRefresh, onSessionRefreshFail]);

  return isLoading ? <p>Loading...</p> : <Fragment>{children}</Fragment>;
};
