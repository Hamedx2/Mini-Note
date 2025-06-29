import toast from "react-hot-toast";
import styles from "./CustomToastComponent.module.css";
import Btn from "../Btn";

function CustomToast({ children, btnText, btnClickFunction, t }) {
  function handleBtnClick() {
    toast.dismiss(t.id);
    btnClickFunction();
  }
  return (
    <div className={styles.toastContainer}>
      <h2 className={styles.toastText}>{children}</h2>
      <div className={styles.toastBtnContainer}>
        <Btn type="toast-outlined" handleClick={handleBtnClick}>
          {btnText}
        </Btn>
        <Btn type="toast" handleClick={() => toast.dismiss(t.id)}>
          Cancel
        </Btn>
      </div>
    </div>
  );
}

export default CustomToast;
