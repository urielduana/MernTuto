import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as NotesApi from "../network/notes_api";

interface NavBarLoggedInViewProps {
  user: User;
  onLogoutSuccessful: () => void;
}
const NavBarLoggedInView = ({
  user,
  onLogoutSuccessful,
}: NavBarLoggedInViewProps) => {
  async function logout() {
    try {
      await NotesApi.logout();
      onLogoutSuccessful();
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }
  return (
    <>
      <Navbar.Text className="me-2">
        Logged in as: <b>{user.username}</b>
      </Navbar.Text>
      <Button variant="outline-light" onClick={logout}>
        Logout
      </Button>
    </>
  );
};

export default NavBarLoggedInView;
