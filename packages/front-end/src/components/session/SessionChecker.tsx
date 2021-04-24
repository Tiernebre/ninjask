import React, { Fragment } from "react";
import { Redirect } from "react-router";

type SessionCheckerProps = {
  accessToken?: string;
  children: React.ReactNode;
};

export const SessionChecker = (props: SessionCheckerProps) => {
  return props.accessToken ? (
    <Fragment>{props.children}</Fragment>
  ) : (
    <Redirect to="/" />
  );
};
