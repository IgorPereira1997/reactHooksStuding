import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useReducer,
  useRef,
  useCallback } from 'react';

import { Container, CenteredContainer } from './styles';

//Creates somewhat of an environment for your components, where it's values are
//accessible from any of the children componentes without prop drilling. It's used
//together with useContext to aplly it's definitions.

//To see changes, go to line 61 and change the mode so the context changes
const ThemeContext = createContext();

function App(){

  //useState is used to declare a variable and a function to control it's changes,
  //where this function works JUST for the said variable which you defined the use
  //state for, as the example below shows

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

  function reducer(state, action){
    switch(action.type){
      case 'plus':
        return {
          counter: state.counter + 1,
          clicks: state.clicks + 1
        };
      case 'minus':
        return {
          counter: state.counter - 1,
          clicks: state.clicks + 1
        };
      default:
        return state;
    };
  }

  //useCallBack is used to use less instances of a function by avoiding it to be
  //instanced again everytime a change happens in a component, making just a new
  //new instance when it's really nexessary. The drawback is that the memory
  //usage is increased by mantaining the function into memory. so it's better to
  //use it when passing the function to child components

  const handlePlusCallback = useCallback(() => {
    setCounter((prevState) => prevState + 1);
  },[]);

  const handleMinusCallback = useCallback(() => {
    setCounter((prevState) => prevState - 1);
  },[]);

  const fnCounterStandard = new Set();
  const fnCounterUseCallback = new Set();

  function newHandlePlus() {
    dispatch({type: 'plus'});
  }

  function newHandleMinus(){
    dispatch({type: 'minus'});
  }

  const initialValue = {counter: 0, clicks: 0};

// Use reducer is used to recover the current state of an object, and give a
// function to take care of it's changes. So it has to have the reducer, or the
//dispatch function, and the initialValue as the object which you wanna monitor.
//Optionally, you cound send a function to determine the initialValue behaviour

  const [state, dispatch] = useReducer(
    reducer,
    initialValue,
  );


    //The below is wrong because doent't take into consideration
    //The updated state if this function is called multiple times,
    //depending on how long the instructions take to execute!

    // setCounter(counter + 1);

    //Solution: Use arrow function and control the operation accordingly to
    //the previous state, no matter how long the inside instructions take to
    //execute it will consider it for the next calls

  function handlePlus(){
    setCounter((prevState) => prevState + 1);
  }

  function handleMinus(){
    setCounter((prevState) => prevState - 1);
  }

  fnCounterStandard.add(handlePlus);
  fnCounterUseCallback.add(handlePlusCallback);
  console.log('Current value of functionSet (Standard): ', fnCounterStandard.size);
  console.log('Current value of functionSet (Callback): ', fnCounterUseCallback.size);

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
      <h1>useContext</h1>
      <ThemeContext.Provider value={'light'}>
        <Button/>
      </ThemeContext.Provider>
      <h1>useReducer</h1>
      <h2>Current value of counter: {state.counter}</h2>
      <h2>Clicks made: {state.clicks}</h2>
      <br/>
      <button onClick={newHandlePlus}>+</button>
      <button onClick={newHandleMinus}>-</button>
      <br/>
      <h1>useCallback</h1>
      <h2>Current value of counter: {counter}</h2>
      <br/>
      <button onClick={handlePlusCallback}>+</button>
      <button onClick={handleMinusCallback}>-</button>
      <br/>
      </Container>
    </CenteredContainer>
  );
}

function Button(){
  const theme = useContext(ThemeContext);
  console.log(theme);

  return(
    <button>{theme}</button>
  );
}

export default App;
