import { Navbar } from "..";
import { useSession } from "../../hooks";

export const Header = (): JSX.Element => {
  const { session, logOut } = useSession();

  return (
    <header className="Header">
      <Navbar onLogOut={logOut} isAuthenticated={!!session} />
    </header>
  );
};
