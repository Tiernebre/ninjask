import React, { Fragment } from "react";
import { Redirect } from "react-router";
import { SessionService } from "../../api/session";

type SessionCheckerProps = {
  accessToken?: string;
  children: React.ReactNode;
  sessionService: SessionService;
};

export const SessionChecker = (props: SessionCheckerProps) => {
  return props.accessToken && props.sessionService.accessTokenIsValid(props.accessToken) ? (
    <Fragment>{props.children}</Fragment>
  ) : (
    <Redirect to="/login" />
  );
};
