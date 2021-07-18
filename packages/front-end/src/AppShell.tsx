import { AlertsProvider } from "@tiernebre/kecleon";
import { Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { SessionProvider } from "./hooks";

/**
 * AppShell is a component that includes all of the necessary "root"
 * elements that should wrap around App. These are typically elements
 * that are needed for React hook management or other lifecycle concerns
 * (i.e. routing)
 */
export const AppShell = (): JSX.Element => {
  return (
    <Fragment>
      <Router>
        <SessionProvider>
          <AlertsProvider></AlertsProvider>
        </SessionProvider>
      </Router>
    </Fragment>
  );
};
