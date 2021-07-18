import { BrowserRouter as Router } from "react-router-dom";
import { AlertsProvider } from "@tiernebre/kecleon";
import { SessionProvider } from "./hooks";
import { Shell } from "./views/shell/Shell";

export const App = (): JSX.Element => {
  return (
    <Router>
      <AlertsProvider>
        <SessionProvider>
          <Shell />
        </SessionProvider>
      </AlertsProvider>
    </Router>
  );
};
