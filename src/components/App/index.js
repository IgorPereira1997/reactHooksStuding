import React, { useState, useEffect } from 'react';

import { Container, CenteredContainer } from './styles';

function App(){

  const [counter, setCounter] = useState(0);
  const [name, setName] = useState('');

  //It used to call a function when ->
  //  No array is offered (will be triggered EVERYTIME the app changes);
  //  Empty Array (will be called ONCE and never again in that render);
  //  Array with variabels (will be called when these variables suffer a
  //    CHANGE of some sort)s

  useEffect(() => {
    console.log('Name was changed!');
  }, [name]);

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
      <h2>Current value of counter: {counter}</h2>
      <br/>
      <button onClick={handlePlus}>+</button>
      <button onClick={handleMinus}>-</button>
      <br/>
      <h1>useEffect</h1>
      <br/>
      <h2>Current value of name: {name}</h2>
      <br/>
      <label htmlFor="nameChanger">Change name below 👇 </label>
      <br/>
      <input id="nameChanger" onChange={e => setName(e.target.value)}></input>

      </Container>
    </CenteredContainer>
  );
}

export default App;
