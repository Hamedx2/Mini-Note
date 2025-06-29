import FormElement from "../FormElement";
import styles from "./SignInForm.module.css";
import Btn from "../Btn.jsx";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../context/authSlice.js";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import toast from "react-hot-toast";

function SignUpForm({ handleTextClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.auth);

  function handleSignUp(e) {
    e.preventDefault();
    if (repeatPassword !== password)
      toast.error("check the password you entered");
    if (email && password && repeatPassword && password === repeatPassword) {
      dispatch(signUp(email, password));
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSignUp}>
      <h1 className={styles.text}>Create an Account</h1>
      <FormElement
        inputType="email"
        placeholder={"example@email.com"}
        id={"sign-up-email"}
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
        id={"sign-up-password"}
        isDisabled={isLoading}
        inputChange={setPassword}
        inputValue={password}
        isRequired={true}
      >
        Password
      </FormElement>
      <FormElement
        inputType="password"
        placeholder={"Repeat Your Password ..."}
        id={"sign-up-repeat"}
        isDisabled={isLoading}
        inputChange={setRepeatPassword}
        inputValue={repeatPassword}
        isRequired={true}
      >
        Repeat Your Password
      </FormElement>
      <div className={styles.btnContainer}>
        <Btn>
          {isLoading ? (
            <div className={styles.btnText}>
              <ClipLoader size={20} color="#bbb" /> <p>Creating Account...</p>
            </div>
          ) : (
            "Sign up"
          )}
        </Btn>
      </div>
      <p className={styles.buttomText}>
        Have an account? <a onClick={handleTextClick}>sign in</a>
      </p>
    </form>
  );
}

export default SignUpForm;
