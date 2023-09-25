import { Container, Nav, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import NavBarLogOutView from "./NavBarLogOutView";
import NavBarLoggedInView from "./NavBarLoggedInView";
import { Link } from "react-router-dom";

interface NavBarProps {
  loggedInUser: User | null;
  onLoginClicked: () => void;
  onSignUpClicked: () => void;
  onLogoutSuccessful: () => void;
}

const NavBar = ({
  loggedInUser,
  onLoginClicked,
  onSignUpClicked,
  onLogoutSuccessful,
}: NavBarProps) => {
  return (
    <Navbar bg="primary" variant="dark" expand="sm" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Cool Notes App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav>
            <Nav.Link href="/" as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link href="/privacy" as={Link} to="/privacy">
              Privacy
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {loggedInUser ? (
              <NavBarLoggedInView
                user={loggedInUser}
                onLogoutSuccessful={onLogoutSuccessful}
              />
            ) : (
              <NavBarLogOutView
                onSignUpClicked={onSignUpClicked}
                onLoginClicked={onLoginClicked}
              />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
