import { PropsWithChildren, useEffect, useState } from "react";
import { PageSpinner, useDidMount } from "@tiernebre/kecleon";
import { useSession } from "../../hooks";
import { useCallback } from "react";

const ONE_MINUTE_IN_SECONDS = 60;

const secondsSinceEpoch = () => Math.round(Date.now() / 1000);

type SessionRefresherProps = PropsWithChildren<unknown>;

export const SessionRefresher = ({
  children,
}: SessionRefresherProps): JSX.Element | null => {
  const { session, refreshSession } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  const statefulRefreshSession = useCallback(async () => {
    await refreshSession();
    setIsLoading(false);
  }, [refreshSession, setIsLoading]);

  useDidMount(() => {
    void statefulRefreshSession();
  });

  useEffect(() => {
    let refreshTimeout: number;
    if (session?.accessToken && session?.accessTokenExpiration) {
      const refreshTimeoutInMs =
        (session.accessTokenExpiration -
          ONE_MINUTE_IN_SECONDS -
          secondsSinceEpoch()) *
        1000;
      refreshTimeout = window.setTimeout(() => {
        void refreshSession();
      }, refreshTimeoutInMs);
    }

    return () => {
      clearTimeout(refreshTimeout);
    };
  }, [session, refreshSession]);

  return isLoading ? <PageSpinner size="large" /> : <>{children}</>;
};
