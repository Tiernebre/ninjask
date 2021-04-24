import "./Header.scss";

interface HeaderProps {
  isAuthenticated: boolean
  onLogOut: () => void
}

export const Header = ({ onLogOut, isAuthenticated }: HeaderProps) => (
  <header className="Header columns is-vcentered is-mobile">
    <div className="control column is-offset-11-desktop is-offset-10-tablet">
      {isAuthenticated && <button className="Header__log-out-button button is-danger" onClick={onLogOut}>Log Out</button>}
    </div>
  </header>
);
