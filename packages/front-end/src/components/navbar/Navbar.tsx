import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

interface NavbarProps {
  isAuthenticated: boolean;
  onLogOut: () => void;
}

export const Navbar = ({ isAuthenticated, onLogOut }: NavbarProps) => (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <Link className="navbar-item" to="/">
        <img src={logo} alt="Logo" />
      </Link>
    </div>

    <div id="navbarBasicExample" className="navbar-menu">
      <div className="navbar-start">
        <a className="navbar-item">Home</a>

        <a className="navbar-item">Documentation</a>

        <div className="navbar-item has-dropdown is-hoverable">
          <a className="navbar-link">More</a>

          <div className="navbar-dropdown">
            <a className="navbar-item">About</a>
            <a className="navbar-item">Jobs</a>
            <a className="navbar-item">Contact</a>
            <hr className="navbar-divider" />
            <a className="navbar-item">Report an issue</a>
          </div>
        </div>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
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
      </div>
    </div>
  </nav>
);
