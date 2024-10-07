import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import styles from "../../Login.module.scss";
import { validationSchema } from "./SignupValidation";
import axios from "axios";
import { useState } from "react";
import { useUser } from "../../../../hooks/useUser";
import { BtnSlide } from "../BtnSlide/BtnSlide";
import { useNavigate } from "react-router-dom";

type LoginFormValues = {
  email: string;
  password: string;
  username: string;
  verifyPassword: string;
};

type SignupFormProps = {
  setIsNewUser: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SignupForm = ({ setIsNewUser }: SignupFormProps) => {
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    number: false,
    specialChar: false,
    uppercase: false,
    space: false,
  });
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/register",
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

  // Function to handle password input changes and update validation state
  const handlePasswordChange = (password: string) => {
    setPasswordValidation({
      length: password.length >= 6,
      number: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      uppercase: /[A-Z]/.test(password),
      space: /^\S*$/.test(password),
    });
  };

  return (
    <div>
      <div className={styles.loginFormWrapper}>
        <h1 className={styles.loginTitle}>Sign Up</h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
            username: "",
            verifyPassword: "",
          }}
          validationSchema={validationSchema}
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
                <label className={styles.loginInputLabel} htmlFor="email">
                  Username
                </label>
                <Field className={styles.loginInput} name="username" />
                <ErrorMessage
                  name="username"
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handlePasswordChange(e.target.value); // Update custom validation state
                    handleChange(e); // Ensure Formik handles the change as well
                  }}
                />
              </div>
              <div className={styles.passwordRulesWrapper}>
                <ul className={styles.passwordRules}>
                  <div>
                    <li
                      className={styles.passwordRule}
                      style={{
                        color: passwordValidation.length ? "green" : "gray",
                      }}
                    >
                      Contains 6 characters
                    </li>
                    <li
                      className={styles.passwordRule}
                      style={{
                        color: passwordValidation.number ? "green" : "gray",
                      }}
                    >
                      One number
                    </li>
                    <li
                      className={styles.passwordRule}
                      style={{
                        color: passwordValidation.space ? "green" : "gray",
                      }}
                    >
                      No Spaces Allowed
                    </li>
                  </div>
                  <div>
                    <li
                      className={styles.passwordRule}
                      style={{
                        color: passwordValidation.specialChar
                          ? "green"
                          : "gray",
                      }}
                    >
                      One special character
                    </li>
                    <li
                      className={styles.passwordRule}
                      style={{
                        color: passwordValidation.uppercase ? "green" : "gray",
                      }}
                    >
                      One uppercase letter
                    </li>
                  </div>
                </ul>
              </div>
              <div className={styles.loginInputWrapper}>
                <label
                  className={styles.loginInputLabel}
                  htmlFor="verifyPassword"
                >
                  Verify Password
                </label>
                <Field
                  className={styles.loginInput}
                  type="password"
                  name="verifyPassword"
                />
                <ErrorMessage
                  name="verifyPassword"
                  component="div"
                  className={styles.inputError}
                />
              </div>
              <BtnSlide txt="Sign Up" isSubmitting={isSubmitting} />
            </Form>
          )}
        </Formik>
        <p className={styles.loginSwitchTxt}>
          Already have an account?{" "}
          <span
            className={styles.loginSwitch}
            onClick={() => setIsNewUser(false)}
          >
            LogIn
          </span>
        </p>
      </div>
    </div>
  );
};
