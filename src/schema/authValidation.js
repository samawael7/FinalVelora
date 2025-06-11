import * as Yup from "yup";

export const emailValidation = Yup.string()
  .email("Please enter a valid email")
  .required("Email is required")
  .matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "Invalid email format"
  );

export const passwordValidation = Yup.string()
  .min(8, "Password must be at least 8 characters")
  .matches(/[0-9]/, "Password requires at least one number")
  .matches(/[a-z]/, "Password requires at least one lowercase letter")
  .matches(/[A-Z]/, "Password requires at least one uppercase letter")
  .matches(/[\W_]/, "Password requires at least one special character")
  .required("Password is required");

export const nameValidation = Yup.string()
  .min(2, "Must be at least 2 characters")
  .max(50, "Cannot exceed 50 characters")
  .matches(/^[a-zA-Z]+$/, "Only letters are allowed")
  .required("Required");
