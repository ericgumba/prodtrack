import React from 'react';  
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Timer = (props) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(props.timerSecondsLeft)
  const [workMinutesLeft, setWorkMinutesLeft] = useState(props.timerWorkMinutesLeft)
  const [breakMinutesLeft, setBreakMinutesLeft] = useState(props.timerBreakMinutesLeft)
  const [ isWorking, setIsWorking ] = useState(props.timerIsInWorkMode)

  const [minutesCompleted, setMinutesCompleted] = useState(props.minutesCompleted)
  function toggle() {
    setIsActive(!isActive);
  }
 
  function saveWork(){ 
    if ( isWorking ){
      props.setTimerWorkMinutesLeft(workMinutesLeft)
      props.setTimerSecondsLeft(secondsLeft)
    } else{
        props.setTimerBreakMinutesLeft(breakMinutesLeft)
        props.setTimerSecondsLeft(secondsLeft)
    }
  }


  // todo: replace with udpate stats instead
  function workCountdown() {
    if (workMinutesLeft <= 0 & secondsLeft <= 0 ){
        setIsWorking(false)
        setWorkMinutesLeft(props.workDefinition)  
        console.log('testere') 
        props.setMinutesCompleted(minutesCompleted+1)
    }
    else if (secondsLeft <= 0  ){
        setSecondsLeft(59)
        if ( workMinutesLeft != props.workDefinition )
        console.log('tester')
        props.setMinutesCompleted(props.minutesCompleted+1)
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
      }, 100);
    } else if (!isActive && secondsLeft !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft, workMinutesLeft, breakMinutesLeft, isWorking]);


  //todo add form that sets task.
  // bug possibility: may reset timer somehow. 

  return (
    <div className="app">
      <div className="time">
        {props.timerIsInWorkMode ? "Working" + props. timerWorkMinutesLeft + "m" + secondsLeft + "s" : `Breaking ${props.timerBreakMinutesLeft}m${secondsLeft}`} 
      </div>
      <div className="row">

        <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
          {isActive ? 'Pause' : 'Start'}
        </button> 
 
      </div> 
          <h1> Input your task here </h1>
        <Form.Control size="lg" type="text" placeholder="Large text" onChange={(e) => {props.setTask(e.target.value)}} /> 
    </div>
  );
};

export default Timer;