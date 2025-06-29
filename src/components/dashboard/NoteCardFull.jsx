import { useSelector } from "react-redux";
import styles from "./NoteCardFull.module.css";

function NoteCardFull() {
  const { activeNote } = useSelector((store) => store.notes);
  return (
    <div className={styles.fullCard}>
      <div className={styles.header}>
        <h2 className={styles.headerText}>{activeNote.title}</h2>
        <p className={styles.headerDate}>
          {new Date(activeNote.created_at).toDateString()}
        </p>
      </div>
      <p className={styles.text}>{activeNote.content}</p>
    </div>
  );
}

export default NoteCardFull;
