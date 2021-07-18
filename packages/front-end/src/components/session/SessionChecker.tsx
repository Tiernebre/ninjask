import React, { Fragment, useEffect } from "react";
import { Redirect } from "react-router";
import { useSession } from "../../hooks";

type SessionCheckerProps = {
  children: React.ReactNode;
};

const CHECK_IF_SESSION_IS_EXPIRED_RATE_IN_MS = 5 * 1000; // 5 seconds

export const SessionChecker = ({
  children,
}: SessionCheckerProps): JSX.Element => {
  const { accessToken, sessionService, logOut } = useSession();

  useEffect(() => {
    const expiredSessionPulse = setInterval(() => {
      if (accessToken && !sessionService.accessTokenIsValid(accessToken)) {
        void logOut();
      }
    }, CHECK_IF_SESSION_IS_EXPIRED_RATE_IN_MS);

    return () => {
      clearInterval(expiredSessionPulse);
    };
  }, [accessToken, sessionService, logOut]);

  return accessToken && sessionService.accessTokenIsValid(accessToken) ? (
    <Fragment>{children}</Fragment>
  ) : (
    <Redirect to="/login" />
  );
};
