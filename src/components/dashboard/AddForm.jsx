import { useState } from "react";
import Btn from "../Btn";
import FormElement from "../FormElement";
import styles from "./AddForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createNote, editNote } from "../../context/noteSlice";
import { customToast } from "./customToast";

function AddForm({ edit = false, activeNote = null }) {
  const { isLoading } = useSelector((store) => store.notes);
  const dispatch = useDispatch();
  const [header, setHeader] = useState(edit ? activeNote.title : "");
  const [content, setContent] = useState(edit ? activeNote.content : "");

  function handleChangeHeader(value) {
    setHeader(value);
  }

  function handleChangeContent(e) {
    setContent(e.target.value);
  }

  function handleSubmitAddForm(e) {
    e.preventDefault();
    dispatch(createNote(header, content));
    setContent(() => "");
    setHeader(() => "");
  }

  function handleSubmitEdit(e) {
    e.preventDefault();
    customToast("Are you sure you want to edit this Note?", "Edit", () =>
      dispatch(editNote({ ...activeNote, title: header, content }))
    );
  }

  return (
    <form
      className={styles.form}
      onSubmit={edit ? handleSubmitEdit : handleSubmitAddForm}
    >
      <FormElement
        inputType="text"
        placeholder="Enter Note Header..."
        id="add-header"
        addInput={true}
        isDisabled={isLoading}
        inputChange={handleChangeHeader}
        inputValue={header}
        isRequired={true}
      >
        Note Header
      </FormElement>
      <div className={styles.addNote}>
        <label htmlFor="add-note">Note Text</label>
        <textarea
          id="add-note"
          className={styles.textArea}
          placeholder="Enter Your Note Text..."
          required
          disabled={isLoading}
          value={content}
          onChange={handleChangeContent}
        ></textarea>
      </div>
      <Btn>{edit ? "Edit" : "Add Note"}</Btn>
    </form>
  );
}

export default AddForm;
