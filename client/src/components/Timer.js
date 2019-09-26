import React from 'react';  
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useState, useEffect } from 'react';

const Timer = (props) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(props.timerSecondsLeft)
  const [workMinutesLeft, setWorkMinutesLeft] = useState(props.timerWorkMinutesLeft)
  const [breakMinutesLeft, setBreakMinutesLeft] = useState(props.timerBreakMinutesLeft)
  const [ isWorking, setIsWorking ] = useState(props.timerIsInWorkMode)
  function toggle() {
    setIsActive(!isActive);
  }
 
  function saveWork(){
    console.log(props.timerWorkMinutesLeft)
    console.log(props.timerSecondsLeft)
    if ( isWorking ){
      props.setTimerWorkMinutesLeft(workMinutesLeft)
      props.setTimerSecondsLeft(secondsLeft)
    } else{
        props.setTimerBreakMinutesLeft(breakMinutesLeft)
        props.setTimerSecondsLeft(secondsLeft)
    }
  }
 
  function workCountdown() {
    if (workMinutesLeft <= 0 & secondsLeft <= 0 ){
        setIsWorking(false)
        setWorkMinutesLeft(props.workDefinition)  
    }
    else if (secondsLeft <= 0  ){
        setSecondsLeft(59)
        setWorkMinutesLeft(workMinutesLeft - 1)
        saveWork()

    }
        else{
        setSecondsLeft(secondsLeft => secondsLeft - 1); 
        saveWork()
    
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
          saveWork()
      }
          else{
          setSecondsLeft(secondsLeft => secondsLeft - 1); 
          saveWork()
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
    } else if (!isActive && secondsLeft !== 0) {
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
 
      </div>
    </div>
  );
};

export default Timer;