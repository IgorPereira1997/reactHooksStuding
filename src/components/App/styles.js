import styled from "styled-components";

export const CenteredContainer = styled.div`
  background: #111;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  border-radius: 10px;

  h1 {
    margin-bottom: 20px;
  }

  h2 {
    margin-bottom: 20px;
  }

  button {
    margin-top: 10px;
  }

  button:first-child {
    margin-right: 10px;
  }
`;
