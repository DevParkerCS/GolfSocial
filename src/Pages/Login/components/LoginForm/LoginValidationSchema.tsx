import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  email: Yup.string().required("Email can't be blank"),
  password: Yup.string().required("Password can't be blank"),
});
