import styles from "./Login.module.scss";
import { useState } from "react";
import Nav from "../../components/Nav/Nav";
import { SignupForm } from "./components/SignupForm/SignupForm";
import { LoginForm } from "./components/LoginForm/LoginForm";

const Login = () => {
  const [isNewUser, setIsNewUser] = useState(false);

  return (
    <div className={styles.loginWrapper}>
      <Nav />
      {isNewUser ? (
        <SignupForm setIsNewUser={setIsNewUser} />
      ) : (
        <LoginForm setIsNewUser={setIsNewUser} />
      )}
    </div>
  );
};

export default Login;
