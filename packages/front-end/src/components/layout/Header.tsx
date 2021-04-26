import "./Header.scss";
import logo from "../../assets/logo.png"

interface HeaderProps {
  isAuthenticated: boolean;
  onLogOut: () => void;
}

export const Header = ({ onLogOut, isAuthenticated }: HeaderProps) => (
  <header className="Header columns is-vcentered is-mobile is-centered">
    <div className="column is-6">
      <img src={logo} className="mt-3" alt="Logo"/>
    </div>
    <div className="column is-6">
      <div className="is-pulled-right">
        {isAuthenticated && (
          <button
            className="Header__log-out-button button is-danger"
            onClick={onLogOut}
          >
            Log Out
          </button>
        )}
      </div>
    </div>
  </header>
);
