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

const RedirectSection = styled.div`
  max-width: 400px;
  width: 100%;
  margin: 50px auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: center;
`;

const BTNRedi = styled.button`
  max-width: 150px;
  width: 100%;
  margin-top: 5px;
  padding: 10px 0;
  color: #14171a;
  background-color: #1da1f2;
  border: 1px solid #14171a;
  border-radius: 5px;
  font-size: 20px;
  font-weight: 700;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
  :hover {
    border-radius: 35px;
    transform: translateY(-10px);

    color: #e1e8ed;
  }
`;

export default function login() {
  // const [hasSubmitted1, setHasSubmitted1] = useState(

  const URL = "http://localhost:3001/register";

  const UserSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().label("password"),
  });

  return (
    <>
      <Title>Login </Title>

      <RegisterForm>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={UserSchema}
          onSubmit={async (values, { resetForm }) => {
            await axios
              .post(`${URL}`, {
                email: values.email,
                password: values.password,
              })
              .then((res) => {
                // setSubmitted(true);
                resetForm({
                  email: "",
                  password: "",
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
      <RedirectSection>
        <BTNRedi>
          <Link href={"/"}>Todo</Link>
        </BTNRedi>
        <BTNRedi>
          <Link href={"/register"}>Register</Link>
        </BTNRedi>
      </RedirectSection>
    </>
  );
}
