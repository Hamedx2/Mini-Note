import { LuPencilLine } from "react-icons/lu";
import styles from "./Logo.module.css";

function Logo({ signIn = false }) {
  return (
    <div className={`${styles.logo} ${signIn ? styles.signin : ""}`}>
      <span className={`${styles.logoIcon} ${signIn ? styles.signinIcon : ""}`}>
        <LuPencilLine />
      </span>
      <p className={`${styles.name} ${signIn ? styles.signinName : ""}`}>
        Mini Note
      </p>
    </div>
  );
}

export default Logo;
