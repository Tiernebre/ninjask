import {
  Fragment,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useDidMount } from "rooks";
import { useSession } from "../../hooks";

const ONE_MINUTE_IN_SECONDS = 60;

const secondsSinceEpoch = () => Math.round(Date.now() / 1000);

type SessionRefresherProps = PropsWithChildren<unknown>;

export const SessionRefresher = ({
  children,
}: SessionRefresherProps): JSX.Element => {
  const { session, refreshSession } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  const refreshSessionWithLoading = useCallback(async () => {
    console.log("bruh");
    await refreshSession();
    console.log("sooo uhhh..");
    setIsLoading(false);
  }, [refreshSession]);

  useDidMount(() => {
    void refreshSessionWithLoading();
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
        void refreshSessionWithLoading();
      }, refreshTimeoutInMs);
    }

    return () => {
      clearTimeout(refreshTimeout);
    };
  }, [session, refreshSessionWithLoading]);

  return isLoading ? <p>Loading...</p> : <Fragment>{children}</Fragment>;
};
