import "./Header.scss";
import { Navbar } from "../navbar/Navbar";

interface HeaderProps {
  isAuthenticated: boolean;
  onLogOut: () => void;
}

export const Header = ({ onLogOut, isAuthenticated }: HeaderProps) => (
  <header className="Header px-3 pt-3">
    <Navbar />
  </header>
);
