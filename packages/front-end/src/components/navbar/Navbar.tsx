import "./Navbar.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

type NavbarBurgerButtonProps = {
  menuIsVisible: boolean;
  setMenuIsVisible: (visible: boolean) => void;
}

const NavbarBurgerButton = ({ menuIsVisible, setMenuIsVisible }: NavbarBurgerButtonProps) => (
  <button
    className="navbar-burger"
    aria-label="Open Menu"
    aria-expanded={menuIsVisible}
    onClick={() => setMenuIsVisible(!menuIsVisible)}
  >
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
  </button>
)

type NavbarProps = {
  isAuthenticated: boolean;
  onLogOut: () => void;
}

export const Navbar = ({ isAuthenticated, onLogOut }: NavbarProps) => {
  const [menuIsVisible, setMenuIsVisible] = useState(false);

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img src={logo} alt="Logo" />
        </Link>
        <NavbarBurgerButton menuIsVisible={menuIsVisible} setMenuIsVisible={setMenuIsVisible} />
      </div>

      <div className={`navbar-menu ${menuIsVisible ? "is-active" : ""}`}>
        <div className="navbar-start"></div>

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
};
