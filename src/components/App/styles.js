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
    margin-bottom: 0px;
  }

  h2 {
    margin-bottom: 20px;
  }

  button {
    margin-top: 10px;
  }

  p{
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 8px;
  }

`;
