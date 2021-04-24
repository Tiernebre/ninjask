import { NightModeToggle } from "../theme/NightModeToggle";
import "./Header.css";

export const Header = () => (
  <header className="Header columns is-vcentered is-mobile">
    <div className="control column is-offset-10-desktop is-offset-9-tablet">
      <NightModeToggle />
    </div>
  </header>
)