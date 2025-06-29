import { useDispatch, useSelector } from "react-redux";
import styles from "./Navbar.module.css";
import { FiUser } from "react-icons/fi";
import { IoExitOutline } from "react-icons/io5";
import Btn from "../Btn";
import Logo from "../Logo";
import { logout } from "../../context/authSlice";
import { clearNotes } from "../../context/noteSlice";
import { customToast } from "./CustomToast";

function Navbar() {
  const { email } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
    dispatch(clearNotes());
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.navContainer}>
        <Logo />
        <div className={styles.actions}>
          <div className={styles.userInfo}>
            <span className={styles.profile}>
              <FiUser />
            </span>
            <p className={styles.email}>{email}</p>
          </div>
          <Btn
            type="round"
            handleClick={() =>
              customToast(
                "Are you sure you want to logout?",
                "Logout",
                handleLogout
              )
            }
          >
            <IoExitOutline />
          </Btn>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
