import "./Header.scss";

export const Header = () => (
  <header className="Header columns is-vcentered is-mobile">
    <div className="control column is-offset-11-desktop is-offset-10-tablet">
      <button className="Header__log-out-button button is-danger">Log Out</button>
    </div>
  </header>
);
