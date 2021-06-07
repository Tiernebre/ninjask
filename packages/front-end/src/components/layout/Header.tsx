import { Navbar } from "../navbar/Navbar";

interface HeaderProps {
  isAuthenticated: boolean;
  onLogOut: () => void;
}

export const Header = (props: HeaderProps) => (
  <header className="Header px-3 pt-3">
    <Navbar {...props} />
  </header>
);
