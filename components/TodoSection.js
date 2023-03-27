import styled from "styled-components";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { colors } from "@/config/colors";
import { useState } from "react";

const TODOList = styled.ul`
  color: ${colors.textC};
  background-color: #a2a8d3;
  border-radius: 8px;
  border: 2px solid #233142;
  max-width: 450px;
  width: 100%;
  height: 100px;
  display: flex;
  /* align-items: baseline; */
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
`;

const TODOItems = styled.li`
  list-style-type: none;
  display: flex;
  :nth-child(1) {
    font-size: 26px;
    color: #38598b;
    font-weight: 600;
  }
`;

const DeleteBTN = styled.div`
  cursor: pointer;
`;

const CompleteSection = styled.div`
  width: 10px;
  height: 10px;
  background-color: white;
`;

export default function TodoSection({
  id,
  text,
  todoText,
  setTodoText,
  completedTodo,
  deleteTodo,
  editHandleChange,
  updatedTodo,
  completeTodo,
}) {
  const [showEdit, setShowEdit] = useState(true);
  const [isCpmplete, setIsCpmplete] = useState(false);

  return (
    <TODOList key={id}>
      {showEdit ? (
        <div>{text}</div>
      ) : (
        <>
          <input type="text" onChange={editHandleChange} defaultValue={text} />

          <button
            onClick={() => {
              updatedTodo(id, isCpmplete);
              setShowEdit(!showEdit);
            }}
          >
            Update
          </button>
        </>
      )}
      <TODOItems>
        <input
          type={"checkbox"}
          checked={completedTodo}
          onClick={(e) =>
            completeTodo({ id, text, isCompleted: e.target.checked })
          }
        />
        <AiFillEdit
          size={25}
          color={"#113f67"}
          onClick={() => {
            setTodoText(todoText);
            setShowEdit(!showEdit);
          }}
        />
        <DeleteBTN>
          <AiFillDelete
            size={25}
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
