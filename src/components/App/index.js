import React, { useState } from 'react';

import { Container, CenteredContainer } from './styles';

function App(){

  const [counter, setCounter] = useState(0);

  function handlePlus(){

    //The below is wrong because doent't take into consideration
    //The updated state if this function is called multiple times,
    //depending on how long the instructions take to execute!

    // setCounter(counter + 1);

    //Solution: Use arrow function and control the operation accordingly to
    //the previous state, no matter how long the inside instructions take to
    //execute it will consider it for the next calls

    setCounter((prevState) => prevState + 1);
  }

  function handleMinus(){
    setCounter((prevState) => prevState - 1);
  }

  return(
    <CenteredContainer>
      <Container>
      <h1>useState</h1>
      <br/><br/>
      <h2>Current Value of counter: {counter}</h2>
      <br/>
      <button onClick={handlePlus}>+</button>
      <button onClick={handleMinus}>-</button>
      </Container>
    </CenteredContainer>
  );
}

export default App;
