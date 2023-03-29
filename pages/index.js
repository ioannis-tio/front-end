import Head from "next/head";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Loader from "@/components/Loader";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import TodoSection from "@/components/TodoSection";

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

const ErrorMessage = styled.div`
  color: red;
  font-size: 16px;
`;

const FieldInput = styled(Field)`
  max-width: 250px;
  width: 100%;
  padding: 15px 20px;
  border-radius: 5px;
  outline: none;
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

const NewTodo = styled.div`
  max-width: 1140px;
  width: 100%;
  margin: 30px auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TodoItems = styled.div`
  padding: 50px 0;
  max-width: 1140px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 20px;
`;

const ListTitle = styled.h2`
  color: #3e54ac;
  font-size: 26px;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
`;

export default function Home() {
  const [first, setfirst] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [todoText, setTodoText] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const URL = "http://localhost:3001/todo-items";

  const allTodo = () => {
    setIsLoading(true);
    axios
      .get(`${URL}`)
      .then((res) => {
        setfirst(res.data);
        console.log(res.data[0].createdAt);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    allTodo();
  }, []);

  const updatedTodo = (todoID, todoText, isCpmplete) => {
    axios
      .patch(`${URL}/${todoID}`, { text: todoText, isCompleted: isCpmplete })
      .then(() => {
        allTodo();
      });
  };

  const deleteTodo = (todoID) => {
    axios.delete(`${URL}/${todoID}`).then(() => {
      allTodo();
    });
  };

  // const completeTodo = (values) => {
  //   axios
  //     .put(`${URL}/${values.id}`, {
  //       text: values.text,
  //       isCompleted: values.isCompleted,
  //     })
  //     .then(() => {
  //       console.log(first);
  //     });
  // };

  const TodoSchema = Yup.object().shape({
    text: Yup.string()
      .min(5, "Text must be 5 char at least")
      .max(50, "Too long")
      .required("Full name is required"),
  });

  return (
    <>
      <Head>
        <title>Todo List App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Title>Todo List App</Title>
        <NewTodo>
          <Formik
            initialValues={{
              text: todoText,
            }}
            validationSchema={TodoSchema}
            onSubmit={async (values, { resetForm }) => {
              await axios
                .post(`${URL}`, { text: values.text })
                .then((res) => {
                  allTodo();
                  setHasSubmitted(true);
                  resetForm({ text: "" });
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
                  {errors.text && touched.text && errors.text}
                </ErrorMessage>
                <FieldInput
                  name="text"
                  type="text"
                  placeholder="text"
                  onBlur={handleBlur}
                  value={values.text}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <BTN
                  type="submit"
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                >
                  ADD +
                </BTN>
              </Form>
            )}
          </Formik>
        </NewTodo>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <ListTitle>My List</ListTitle>
            <TodoItems>
              {first.map((todo) => (
                <React.Fragment key={todo._id}>
                  <TodoSection
                    id={todo._id}
                    text={todo.text}
                    completedTodo={todo.isCompleted}
                    created={todo.createdAt}
                    updated={todo.updatedAt}
                    deleteTodo={deleteTodo}
                    updatedTodo={updatedTodo}
                    // completeTodo={completeTodo}
                  />
                </React.Fragment>
              ))}
            </TodoItems>
          </>
        )}
      </main>
    </>
  );
}
