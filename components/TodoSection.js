import styled from "styled-components";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { colors } from "@/config/colors";
import { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";

const TODOList = styled.ul`
  color: ${colors.textC};
  background-color: #a2a8d3;
  border-radius: 8px;
  border: 2px solid #233142;
  max-width: 300px;
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
`;

const TODOItems = styled.li`
  list-style-type: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  :nth-child(1) {
    font-size: 26px;
    color: #38598b;
    font-weight: 600;
  }
`;

const DeleteBTN = styled.div`
  cursor: pointer;
`;

const TextSection = styled.div``;

const Task = styled.p`
  font-weight: 600;
  text-decoration: underline;
  font-size: 18px;
`;

const Text = styled.p`
  font-size: 20px;
  max-width: 200px;
  width: 100%;
  text-decoration: ${({ done }) => (done ? "line-through" : "")};
  word-wrap: break-word;
`;

const Created = styled.p``;

const UpdateSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const UpdateText = styled.input`
  background-color: #3e54ac;
  color: white;
  height: 80px;
  font-size: 18px;
  max-width: 150px;
  width: 100%;
  word-wrap: break-word;
  outline: none;
`;

const BTNUpdate = styled.button`
  display: flex;
`;

export default function TodoSection({
  id,
  text,
  completedTodo,
  deleteTodo,
  updated,
  updatedTodo,
  created,
}) {
  const [showEdit, setShowEdit] = useState(true);
  const [todoText, setTodoText] = useState(text);
  const [done, setDone] = useState(completedTodo);

  const editHandleChange = (e) => {
    setTodoText(e.target.value);
  };

  const UpdateTodoSchema = Yup.object().shape({
    text: Yup.string()
      .min(5, "Text must be 5 char at least")
      .max(50, "Too long")
      .required("Full name is required"),
  });

  const createdTime = created;
  const dateCreated = new Date(createdTime);
  const dateCrFormat =
    dateCreated.getHours() +
    ":" +
    dateCreated.getMinutes() +
    ", " +
    dateCreated.toDateString();
  // console.log(dateFormat);
  const updatedTime = updated;
  const updatedDate = new Date(updatedTime);
  const updatedCrFormat =
    updatedDate.getHours() +
    ":" +
    updatedDate.getMinutes() +
    ", " +
    updatedDate.toDateString();

  return (
    <TODOList>
      {showEdit ? (
        <TextSection>
          <Task>TASK:</Task>
          <Text done={done}>{todoText.toUpperCase()}</Text>
          <Created>Created At: {dateCrFormat}</Created>
          <Created>Updated At: {updatedCrFormat}</Created>
        </TextSection>
      ) : (
        <UpdateSection>
          <UpdateText
            type="text"
            onChange={editHandleChange}
            value={todoText.toUpperCase()}
          />

          <BTNUpdate
            onClick={() => {
              updatedTodo(id, todoText, done);
              setShowEdit(!showEdit);
            }}
          >
            Update
          </BTNUpdate>
        </UpdateSection>
      )}
      <TODOItems>
        <input
          type={"checkbox"}
          checked={done}
          onChange={() => {
            setDone(!done);
            updatedTodo(id, todoText, !done);
            // completeTodo({ id, text: todoText, isCompleted: !done });
          }}
        />
        <AiFillEdit
          size={20}
          color={"#113f67"}
          onClick={() => {
            setShowEdit(!showEdit);
          }}
        />
        <DeleteBTN>
          <AiFillDelete
            size={20}
            color={"red"}
            onClick={() => {
              deleteTodo(id);
            }}
          />
        </DeleteBTN>
      </TODOItems>
    </TODOList>
  );
}
