import React from "react";
import styled from "styled-components";

const OutterLoader = styled.div`
  margin: 0 auto;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoaderSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 10px solid #f3f3f3; /* Light grey */
  border-top: 10px solid #383636; /* Blue */
  border-radius: 50%;
  animation: spinner 1.5s linear infinite;
`;

export default function Loader() {
  return (
    <OutterLoader>
      <LoaderSpinner />
    </OutterLoader>
  );
}
