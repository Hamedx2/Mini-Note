import styles from "./Btn.module.css";

function Btn({ children, handleClick, type }) {
  if (type === "note") {
    return (
      <button className={styles.note} onClick={handleClick}>
        {children}
      </button>
    );
  }

  if (type === "round") {
    return (
      <button className={styles.round} onClick={handleClick}>
        {children}
      </button>
    );
  }

  if (type === "toast" || type === "toast-outlined") {
    return (
      <button
        className={`${styles.toast} ${
          type === "toast-outlined" ? styles.outline : ""
        }`}
        onClick={handleClick}
      >
        {children}
      </button>
    );
  }

  return (
    <button className={styles.btn} onClick={handleClick}>
      {children}
    </button>
  );
}

export default Btn;
