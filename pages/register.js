import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import axios from "axios";
import Link from "next/link";

const Title = styled.h1`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px auto 0;
  color: #3e54ac;
  text-align: left;
  padding-bottom: 20px;
  font-size: 55px;
  @media (max-width: 991px) {
    font-size: 35px;
  }
`;

const RegisterForm = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const FieldInput = styled(Field)`
  max-width: 250px;
  width: 100%;
  padding: 20px 20px;
  margin: 20px 0;
  border-radius: 5px;
  outline: none;
  font-size: 16px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 16px;
`;

const BTN = styled.button`
  max-width: 250px;
  width: 100%;
  margin-top: 5px;
  padding: 4px 0;
  color: #ecf2ff;
  background-color: #3e54ac;
  border: 0px;
  border-radius: 5px;
  cursor: pointer;
`;

export default function register() {
  // const [hasSubmitted1, setHasSubmitted1] = useState(

  const URL = "http://localhost:3001/register";

  const UserSchema = Yup.object().shape({
    username: Yup.string()
      .min(5, "User must be at least 5 char")
      .max(20, "Too long")
      .required("Username is required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .label("password")
      .matches(
        /^(?=.*[A-Z])/,
        "Password must contain at least one uppercase letter"
      )
      .matches(
        /^(?=.*[a-z])/,
        "Password must contain at least one lowercase letter"
      )
      .matches(/^(?=.*[0-9])/, "Password must contain at least one number")
      // .matches(
      //   /^(?=.*[!@#$%^&*])/,
      //   "Password must contain at least one special character"
      // )
      .matches(/^(?=.{8,})/, "Password must contain at least 8 characters"),
    confrimPassword: Yup.string()
      .required()
      .label("Confrim password")
      .oneOf([Yup.ref("password"), null], "password must be the same"),
  });

  return (
    <>
      <Title>Register Form</Title>

      <RegisterForm>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confrimPassword: "",
          }}
          validationSchema={UserSchema}
          onSubmit={async (values, { resetForm }) => {
            await axios
              .post(`${URL}`, {
                username: values.username,
                email: values.email,
                password: values.password,
                confirmPassword: values.confrimPassword,
              })
              .then((res) => {
                // setSubmitted(true);
                resetForm({
                  username: "",
                  email: "",
                  password: "",
                  confrimPassword: "",
                });
              })
              .catch((error) => console.log(error));
          }}
        >
          {({
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            values,
          }) => (
            <Form>
              <ErrorMessage>
                {errors.username && touched.username && errors.username}
              </ErrorMessage>
              <FieldInput
                name="username"
                type="username"
                placeholder="Username"
                autoComplete="off"
                onBlur={handleBlur}
                value={values.username}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <ErrorMessage>
                {errors.email && touched.email && errors.email}
              </ErrorMessage>
              <FieldInput
                name="email"
                type="email"
                placeholder="Email"
                onBlur={handleBlur}
                value={values.email}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <ErrorMessage>
                {errors.password && touched.password && errors.password}
              </ErrorMessage>
              <FieldInput
                name="password"
                type="password"
                placeholder="Password"
                onBlur={handleBlur}
                autoComplete="off"
                value={values.password}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <ErrorMessage>
                {errors.confrimPassword &&
                  touched.confrimPassword &&
                  errors.confrimPassword}
              </ErrorMessage>
              <FieldInput
                name="confrimPassword"
                type="password"
                placeholder="Confrim Password"
                onBlur={handleBlur}
                value={values.confrimPassword}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <BTN
                type="submit"
                onClick={(e) => {
                  handleSubmit(e);
                  console.log("Clicked");
                }}
              >
                <Link href={"/"}>Create User</Link>
              </BTN>
            </Form>
          )}
        </Formik>
      </RegisterForm>
    </>
  );
}
