import { Container } from "react-bootstrap";
import NotesPageLogOutView from "../components/NotesPageLogOutView";
import NotesPageLoggedInView from "../components/NotesPageLoggedInView";
import styles from "../styles/NotesPage.module.css";
import { User } from "../models/user";

interface NotesPageProps {
  loggedInUser: User | null;
}

const NotesPage = ({ loggedInUser }: NotesPageProps) => {
  return (
    <Container className={styles.notesPage}>
      <>{loggedInUser ? <NotesPageLoggedInView /> : <NotesPageLogOutView />}</>
    </Container>
  );
};

export default NotesPage;
