import React, { useState } from "react"

export default function useVisualMode(initial) {
  /*
  current view is last element in array, when you click back it pops last element
  (current view and removes from array) then returns previous element (new current view).
  */

  //history is array that holds the history of views, set history replaces
  const [history, setHistory] = useState([initial]);
  const mode = history[history.length - 1]; //mode is assigned to last element in array
  
  //pushes element to back of array
  function transition(mode, replace = false) { 
    if(!replace) {
      setHistory(prev => [...prev, mode])
    } else {
      //If replace === true, replace last element (previous mode) with current current mode
      setHistory(prev => [...prev.slice(0, prev.length - 1), mode]);
    }
  }
  //pops last element at back of array
  function back() {
    if (history.length > 1) {
      setHistory(prev => prev.slice(0, prev.length - 1));
    }
  }
  return { mode, transition, back };
};
