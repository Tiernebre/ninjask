import logo from "../../assets/logo.png";
import { NavbarItem, SmartNavbar, Buttons, Button } from "@tiernebre/kecleon";

type NavbarProps = {
  isAuthenticated: boolean;
  onLogOut: () => void;
};

export const Navbar = ({
  isAuthenticated,
  onLogOut,
}: NavbarProps): JSX.Element => {
  return (
    <SmartNavbar
      spaced
      brandItems={
        <NavbarItem link={{ to: "/" }}>
          <img src={logo} alt="Logo" />
        </NavbarItem>
      }
      menuStartItems={
        <NavbarItem link={{ to: "/challenges" }}>Challenges</NavbarItem>
      }
      menuEndItems={
        <NavbarItem>
          <Buttons>
            {isAuthenticated && (
              <Button color="danger" onClick={onLogOut}>
                Log Out
              </Button>
            )}
          </Buttons>
        </NavbarItem>
      }
    />
  );
};
