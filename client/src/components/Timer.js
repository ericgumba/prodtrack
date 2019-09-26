import React from 'react';  
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useState, useEffect } from 'react';

const Timer = (props) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [workMinutesLeft, setWorkMinutesLeft] = useState(props.workDefinition)
  const [breakMinutesLeft, setBreakMinutesLeft] = useState(props.breakDefinition)
  const [ isWorking, setIsWorking ] = useState(true)
  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(0);
    setIsActive(false);
  }
 
  function workCountdown() {
    if (workMinutesLeft <= 0 & secondsLeft <= 0 ){
        setIsWorking(false)
        setWorkMinutesLeft(props.workDefinition)
    }
    else if (secondsLeft <= 0  ){
        setSecondsLeft(59)
        setWorkMinutesLeft(workMinutesLeft - 1)
    }
        else{
        setSecondsLeft(secondsLeft => secondsLeft - 1); 
    }
  }

  function breakCountdown() {
      if(breakMinutesLeft <= 0 & secondsLeft <= 0){
          setIsWorking(true)
          setBreakMinutesLeft(props.breakDefinition)
      }
      else if (secondsLeft <= 0){
          setSecondsLeft(59)
          setBreakMinutesLeft(breakMinutesLeft - 1)
      }
          else{
          setSecondsLeft(secondsLeft => secondsLeft - 1); 
      }
  }
 
 

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {

        if (isWorking){
            workCountdown()
        } else {
            breakCountdown()
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft, workMinutesLeft, breakMinutesLeft, isWorking]);

  return (
    <div className="app">
      <div className="time">
        {isWorking ? "Working" + workMinutesLeft + "m" + secondsLeft + "s" : `Breaking ${breakMinutesLeft}m${secondsLeft}`} 
      </div>
      <div className="row">

        <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button className="button" onClick={reset}>
          Reset
        </button>
 
      </div>
    </div>
  );
};

export default Timer;