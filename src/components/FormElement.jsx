import styles from "./FormElement.module.css";

function FormElement({
  children,
  inputType,
  placeholder,
  id,
  isDisabled = false,
  inputChange,
  inputValue,
  isRequired = false,
  addInput = false,
}) {
  return (
    <div
      className={`${styles.formElement} ${addInput ? styles.addInputDiv : ""}`}
    >
      <label className={styles.label} htmlFor={id}>
        {children}
      </label>
      <input
        type={inputType}
        className={`${styles.input} ${addInput ? styles.addInput : ""}`}
        placeholder={placeholder}
        id={id}
        disabled={isDisabled}
        onChange={(e) => inputChange(e.target.value)}
        value={inputValue}
        required={isRequired}
      />
    </div>
  );
}

export default FormElement;
