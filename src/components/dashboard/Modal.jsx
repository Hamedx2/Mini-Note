import { IoIosClose } from "react-icons/io";
import styles from "./Modal.module.css";
import { useDispatch } from "react-redux";
import { clearActiveNote, clearEditNote } from "../../context/noteSlice";

function Modal({ children }) {
  const dispatch = useDispatch();

  function handleCloseModal() {
    dispatch(clearActiveNote());
    dispatch(clearEditNote());
  }

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) handleCloseModal();
  }

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.container}>
        <button className={styles.closeBtn} onClick={handleCloseModal}>
          <IoIosClose />
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
