// src/components/RegistrationForm.js
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

const RegistrationForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
      password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      // Handle form submission
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label>Email:</label>
      <input
        type="text"
        name="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email && (
        <p>{formik.errors.email}</p>
      )}

      <label>Password:</label>
      <input
        type="password"
        name="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password && (
        <p>{formik.errors.password}</p>
      )}

      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
