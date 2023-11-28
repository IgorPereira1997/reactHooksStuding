import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useReducer,
  useRef,
  useMemo,
  useCallback,
  useImperativeHandle,
  forwardRef,
  useLayoutEffect} from 'react';

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

  //useMemo -> It functions simillary to useCallback, but it don't returns the
  //fucntion, but executes it. It's useful as a eventeListener to a variable,
  //avoiding a costly change on any variable to force a update, because with said
  //hook the render will update just when the variable monitored is changed.

  const currentName = useMemo(() => {
    return name ?? ''
  }, [name]);

  //useRef -> it has to mai purposes, first one of them is to save values that
  //can be updated in a component and avoid an re-render of the componente it is
  //inserted into. Second is access elements imperatively from the elements' tree

  const number = useRef(0);

  //Forces re-render when changed
  //const [number, setNumber] = useState(0);

  function handleSetValue(){
    const newNumber = Math.round(Math.random() * (10 - 1) + 1);
    //setNumber(newNumber);
    number.current = newNumber;
  }
  function handlePrintValue(){
    alert(number.current);
  }

  const inputRef = useRef(null);

  function handlePrintName(){
    alert(inputRef.current.value);
  }

  const formRef = useRef(null);

  function handleSubmit(){
    formRef.current.submit();
  }

  //useEffect vs useLayoutEffect -> useLayoutEffect is sinchronous, being applied
  //BEFORE the render updates the screen, while useEffect is asynchronous, being
  //applied AFTER the render updates screen

  useEffect(()=>{
    for(let i = 50000; i>= 0; i--){
      //console.log(i);
    }
    console.log('useEffect for the win!');
  }, [counter]);

  useLayoutEffect(()=>{
    for(let i = 1; i<= 50000; i++){
      //console.log(i);
    }
    console.log('useLayoutEffect for the win!');
  }, [state.counter]);

  //Custom Hooks -> You can create your own hook, based on your needs and
  //objectives to it. Basicaly, your hook can be what you want, working as a
  //custom function, but working as a hook

  function useFetch(url) {
    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          // Introduza um atraso de 2 segundos (2000 milissegundos)
          await new Promise(resolve => setTimeout(resolve, 2000));

          const resp = await fetch(url);
          const json = await resp.json();

          setLoading(false);
          setResponse(json);
        } catch (error) {
          console.error('Erro na requisição:', error);
          setLoading(false);
          setResponse(null);
        }
      };

      fetchData();
    }, [url]);

    return [loading, response];
  }

  const [loading, response] = useFetch('https://rickandmortyapi.com/api/character');



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
      <h1>useMemo</h1>
      <br/>
      <label htmlFor="nameChangerMemo">Change name below 👇 </label>
      <br/>
      <input id="nameChangerMemo" onChange={e => setName(e.target.value)}></input>
      <br/>
      <h1>useRef</h1>
      <h2>Current value of number: {number.current}</h2>
      <br/>
      <button onClick={handleSetValue}>Set Value</button>
      <button onClick={handlePrintValue}>Print Value</button>
      <br/>
      <input ref={inputRef}/>
      <button onClick={handlePrintName}>Print Name</button>
      <h1>useImperativeHandle</h1>
      <br/>
      <Form ref={formRef}/>
      <button onClick={handleSubmit}>Submit</button>
      <br/>
      <h1>Custom Hooks</h1>
      {loading === true ? <h1>Loading...</h1> : <p>{JSON.stringify(response)}</p>}
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

//useImperativeHandle & forwardRef -> If using imperative code, although this pratice
//is not recommended, you can manipulate the ref value of a Component using these functions
//together, so forwardRef can forward the reference defined, just as it occurs into HTML

const Form = forwardRef((props, ref) => {
  const inputRef = useRef(null);

  function handleSubmit(){
    alert(inputRef.current.value);
  }

  useImperativeHandle(
    ref,
    () => {
      return {
        submit: handleSubmit,
      };
    },
    []
  );
  return(
    <form>
      <input ref={inputRef}/>
    </form>
  );
})

export default App;
