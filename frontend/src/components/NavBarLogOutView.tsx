import { Button } from "react-bootstrap";

interface NavBarLogOutViewProps {
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
}
const NavBarLogOutView = ({
  onSignUpClicked,
  onLoginClicked,
}: NavBarLogOutViewProps) => {
  return (
    <>
      <Button variant="outline-light" onClick={onSignUpClicked}>
        Sign Up
      </Button>
      <Button variant="outline-light" onClick={onLoginClicked}>
        Login
      </Button>
    </>
  );
};

export default NavBarLogOutView;
