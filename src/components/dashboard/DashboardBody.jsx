import styles from "./DashboardBody.module.css";
import NoteCard from "./NoteCard";
import Btn from "../Btn";
import AddForm from "./AddForm";
import Modal from "./Modal";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import NoteCardFull from "./NoteCardFull";

function DashboardBody() {
  const [showAddForm, setShowAddForm] = useState(false);

  const { notes, isLoading, activeNote, editNote } = useSelector(
    (store) => store.notes
  );

  function handleToggleForm() {
    setShowAddForm((show) => !show);
  }

  return (
    <div className={styles.body}>
      {activeNote && (
        <Modal>
          {editNote ? (
            <AddForm edit={true} activeNote={activeNote} />
          ) : (
            <NoteCardFull />
          )}
        </Modal>
      )}
      <div className={styles.add}>
        <div className={styles.btnContainer}>
          <Btn handleClick={handleToggleForm}>
            {showAddForm ? "- Close Form" : "+ Add New Note"}
          </Btn>
        </div>
        <div
          className={`${styles.formContainer} ${
            showAddForm ? styles.showForm : ""
          }`}
        >
          <AddForm />
        </div>
      </div>
      {isLoading ? (
        <div className={styles.spinner}>
          <ClipLoader size={100} />
          <p>Fetching Data From Server ...</p>
        </div>
      ) : notes.length === 0 ? (
        <div className={styles.noNotes}>
          <p>You Have No Notes, Try Writing some 😉</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {notes.map((note) => (
            <NoteCard
              header={note.title}
              date={note.created_at}
              text={note.content}
              key={note.id}
              id={note.id}
              user_id={note.user_id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default DashboardBody;
