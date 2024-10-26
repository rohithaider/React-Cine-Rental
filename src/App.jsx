import { MovieContext, ThemeContext } from "./context";
import {useState,useReducer} from 'react'
import Page from "./Page";
import { cartReducer, initialState } from "./reducer/CardReducer";

export default function App() {
  
  const[darkMode,setDarkMode] = useState(true);

  const [state,dispatch]=useReducer(cartReducer,initialState)
  return (
    <>
    <ThemeContext.Provider value={{darkMode,setDarkMode}}>
    <MovieContext.Provider value={{state,dispatch}}>
      <Page/>
      </MovieContext.Provider>
      </ThemeContext.Provider>
    </>
  );
}
