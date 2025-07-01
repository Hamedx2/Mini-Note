import { RiPencilLine } from "react-icons/ri";
import Btn from "../Btn";
import styles from "./NoteCard.module.css";
import { IoEyeOutline } from "react-icons/io5";
import { GoTrash } from "react-icons/go";
import { useDispatch } from "react-redux";
import {
  deleteNote,
  setActiveNote,
  setEditNote,
} from "../../context/noteSlice";
import { customToast } from "./customToast";

function NoteCard({ header, date, text, id, user_id }) {
  const dispatch = useDispatch();
  function handleDeleteNote() {
    customToast("Are you sure ?", "Delete", () => dispatch(deleteNote(id)));
  }

  function handleShowFull() {
    dispatch(
      setActiveNote({
        title: header,
        created_at: date,
        content: text,
        id,
        user_id,
      })
    );
  }

  function handleEditNote() {
    handleShowFull();
    dispatch(setEditNote());
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.headerText}>{header}</h2>
        <p className={styles.headerDate}>{new Date(date).toDateString()}</p>
      </div>
      <p className={styles.text}>{text}</p>
      <div className={styles.actions}>
        <Btn type="note" handleClick={handleShowFull}>
          <IoEyeOutline />
        </Btn>
        <Btn type="note" handleClick={handleEditNote}>
          <RiPencilLine />
        </Btn>
        <Btn type="note" handleClick={handleDeleteNote}>
          <GoTrash />
        </Btn>
      </div>
    </div>
  );
}

export default NoteCard;
