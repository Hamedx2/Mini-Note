import FormElement from "../FormElement";
import styles from "./SignInForm.module.css";
import Btn from "../Btn.jsx";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../context/authSlice.js";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import toast from "react-hot-toast";

function SignInForm({ handleTextClick }) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignIn(e) {
    e.preventDefault();
    if (email && password) {
      dispatch(login(email, password));
    } else {
      toast.error("Please Enter Your Email and Password.");
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSignIn}>
      <h1 className={styles.text}>Sign in to your Account</h1>
      <FormElement
        inputType="email"
        placeholder={"example@email.com"}
        id={"sign-in-email"}
        isDisabled={isLoading}
        inputChange={setEmail}
        inputValue={email}
        isRequired={true}
      >
        Email
      </FormElement>
      <FormElement
        inputType="password"
        placeholder="Enter Your Password ..."
        id={"sign-in-password"}
        isDisabled={isLoading}
        inputChange={setPassword}
        inputValue={password}
        isRequired={true}
      >
        Password
      </FormElement>
      <div className={styles.btnContainer}>
        <Btn>
          {isLoading ? (
            <div className={styles.btnText}>
              <ClipLoader size={20} color="#bbb" /> <p>Signing in...</p>
            </div>
          ) : (
            "Sign in"
          )}
        </Btn>
      </div>
      <p className={styles.buttomText}>
        Don’t have an account? <a onClick={handleTextClick}>create one</a>
      </p>
    </form>
  );
}

export default SignInForm;
