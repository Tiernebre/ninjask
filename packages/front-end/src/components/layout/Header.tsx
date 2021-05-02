import "./Header.scss";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

interface HeaderProps {
  isAuthenticated: boolean;
  onLogOut: () => void;
}

export const Header = ({ onLogOut, isAuthenticated }: HeaderProps) => (
  <header className="Header columns p-3">
    <div className="column is-11">
      <Link to="/">
        <img src={logo} alt="Logo" />
      </Link>
    </div>
    <div className="column is-1">
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
