import { useEffect, useState } from "react";
import styles from "./SignInContainer.module.css";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Logo from "../Logo";
import { supabase } from "../../../lib/supabaseClient";

function SignInContainer() {
  const [loginOrCreate, setLoginOrCreate] = useState("login");
  const navigate = useNavigate();

  const { isAuthenticated, email, id } = useSelector((store) => store.auth);

  useEffect(
    function () {
      async function checkAuth() {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) navigate("/dashboard");
      }
      if (isAuthenticated && email && id) {
        navigate("/dashboard");
        return;
      }
      checkAuth();
    },
    [isAuthenticated, email, id, navigate]
  );

  function handleSetLoginOrCreate() {
    setLoginOrCreate((value) => (value === "login" ? "create" : "login"));
  }

  return (
    <div className={styles.container}>
      <div
        className={`${styles.imageContainer} ${
          loginOrCreate === "create" ? styles.create : styles.login
        }`}
      >
        <Logo signIn={true} />
      </div>
      <div className={loginOrCreate === "create" ? styles.hidden : ""}>
        <SignInForm handleTextClick={handleSetLoginOrCreate} />
      </div>
      <div className={loginOrCreate === "login" ? styles.hidden : ""}>
        <SignUpForm handleTextClick={handleSetLoginOrCreate} />
      </div>
    </div>
  );
}

export default SignInContainer;
