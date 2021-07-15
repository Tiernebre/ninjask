import { Navbar } from "../navbar/Navbar";

interface HeaderProps {
  isAuthenticated: boolean;
  onLogOut: () => void;
}

export const Header = (props: HeaderProps): JSX.Element => (
  <header className="Header">
    <Navbar {...props} />
  </header>
);
