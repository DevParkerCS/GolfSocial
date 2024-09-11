import styles from "./Login.module.scss";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Nav from "../../components/Nav/Nav";

type LoginFormValues = {
  email: string;
  password: string;
  username: string;
  verifyPassword: string;
};

const LoginForm = () => {
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    number: false,
    specialChar: false,
    uppercase: false,
  });

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters long"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      )
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .required("Password is required"),
    verifyPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Passwords must match"),
  });

  // Function to handle password input changes and update validation state
  const handlePasswordChange = (password: string) => {
    setPasswordValidation({
      length: password.length >= 6,
      number: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      uppercase: /[A-Z]/.test(password),
    });
  };

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ) => {
    try {
      const response = await axios.post("/api/login", values);
      console.log("Login successful:", response.data);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <Nav />
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
            <Form>
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
              <div className={styles.loginBtnWrapper}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.loginBtn}
                >
                  Login
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
