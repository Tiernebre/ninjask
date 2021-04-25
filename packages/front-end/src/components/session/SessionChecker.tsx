import React, { Fragment, useEffect } from "react";
import { Redirect } from "react-router";
import { SessionService } from "../../api/session";

type SessionCheckerProps = {
  accessToken?: string;
  children: React.ReactNode;
  sessionService: SessionService;
  onExpiredSession: () => void;
};

const CHECK_IF_SESSION_IS_EXPIRED_RATE_IN_MS = 5 * 1000 // 5 seconds

export const SessionChecker = (props: SessionCheckerProps) => {
  useEffect(() => {
    const expiredSessionPulse = setInterval(() => {
      if (props.accessToken && !props.sessionService.accessTokenIsValid(props.accessToken)) {
        props.onExpiredSession()
      }
    }, CHECK_IF_SESSION_IS_EXPIRED_RATE_IN_MS)

    return () => {
      clearInterval(expiredSessionPulse)
    }
  }, [props])


  return props.accessToken ? (
    <Fragment>{props.children}</Fragment>
  ) : (
    <Redirect to="/login" />
  );
};
