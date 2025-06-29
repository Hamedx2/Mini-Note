import styles from "./SignIn.module.css";
import SignInContainer from "../components/sign-in/SignInContainer";

function SignIn() {
  return (
    <div className={styles.page}>
      <SignInContainer />
    </div>
  );
}

export default SignIn;
