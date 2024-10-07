import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import styles from "../../Login.module.scss";
import { loginValidationSchema } from "./LoginValidationSchema";
import axios from "axios";
import { useUser } from "../../../../hooks/useUser";
import { BtnSlide } from "../BtnSlide/BtnSlide";
import { useNavigate } from "react-router-dom";

type LoginFormValues = {
  email: string;
  password: string;
};

type SignupFormProps = {
  setIsNewUser: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoginForm = ({ setIsNewUser }: SignupFormProps) => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/login",
        values,
        { withCredentials: true }
      );
      if (response.data.isError) {
        alert(response.data.message);
      }
      console.log("Login successful:", response.data);
      setUser(response.data.user);
      navigate(`/profile/${response.data.user._id}`);
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className={styles.loginFormWrapper}>
        <h1 className={styles.loginTitle}>Log in</h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, handleChange, values }) => (
            <Form className={styles.loginForm}>
              <div className={styles.loginInputWrapper}>
                <label className={styles.loginInputLabel} htmlFor="email">
                  Email
                </label>
                <Field
                  className={styles.loginInput}
                  type="email"
                  name="email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles.inputError}
                />
              </div>
              <div className={styles.loginInputWrapper}>
                <label className={styles.loginInputLabel} htmlFor="password">
                  Password
                </label>
                <Field
                  className={styles.loginInput}
                  type="password"
                  name="password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles.inputError}
                />
              </div>
              <BtnSlide txt={"Log In"} isSubmitting={isSubmitting} />
            </Form>
          )}
        </Formik>
        <p className={styles.loginSwitchTxt}>
          Don't have an account?{" "}
          <span
            className={styles.loginSwitch}
            onClick={() => setIsNewUser(true)}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};
