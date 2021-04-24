import { NightModeToggle } from "../theme/NightModeToggle";
import "./Header.css";

export const Header = () => (
  <header className="Header columns is-vcentered is-mobile">
    <div className="control column is-offset-11">
      <div className="Header__night-mode-control">
        <span className="Header__night-emoji">🌙</span>
        <NightModeToggle />
      </div>
    </div>
  </header>
)