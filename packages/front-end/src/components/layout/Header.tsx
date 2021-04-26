import "./Header.scss";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

interface HeaderProps {
  isAuthenticated: boolean;
  onLogOut: () => void;
}

export const Header = ({ onLogOut, isAuthenticated }: HeaderProps) => (
  <header className="Header columns">
    <div className="column is-11-desktop">
      <Link to="/">
        <img src={logo} className="mt-4 ml-4" alt="Logo" />
      </Link>
    </div>
    <div className="column is-1-desktop Header__log-out-button-column">
      {isAuthenticated && (
        <button
          className="Header__log-out-button button is-danger"
          onClick={onLogOut}
        >
          Log Out
        </button>
      )}
    </div>
  </header>
);
