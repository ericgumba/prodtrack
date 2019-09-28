import React from 'react';  
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Timer = (props) => { 
  const [seconds, setSeconds] = useState(props.timerSecondsLeft)
  const [isActive, setIsActive] = useState(props.timerIsActive) 
  const [isWorking, setIsWorking] = useState(props.timerIsInWorkMode)
  function toggle() {
    setIsActive(!isActive)
    props.setTimerIsActive(!props.timerIsActive);
  }
  


  // todo: replace with udpate stats instead
  function workCountdown() {
    if (props.timerWorkMinutesLeft < 0){
      setIsWorking(false)  

      props.setTimerIsInWorkMode(false) 
      props.setTimerWorkMinutesLeft(props.workDefinition)  
      setSeconds(0)
      props.setTimerSecondsLeft(0)  
    }
    else if (seconds <= 0  ){ 
      setSeconds(59)
      props.setTimerSecondsLeft(59)
      props.setTimerWorkMinutesLeft(props.timerWorkMinutesLeft - 1) 

      if ( props.timerWorkMinutesLeft !== props.workDefinition )
      props.setMinutesCompleted(props.minutesCompleted+1) 

    }
    else{ 
        
      setSeconds(seconds-1)  
      props.setTimerSecondsLeft(props.timerSecondsLeft-1)
    
    }
  }

  function breakCountdown() {
      if(props.timerBreakMinutesLeft < 0){        
        setIsWorking(true)  

        props.setTimerIsInWorkMode(true)  
        props.setTimerBreakMinutesLeft(props.breakDefinition)
        props.setTimerSecondsLeft(0)
        setSeconds(0)
      }
      else if (seconds <= 0){
        setSeconds(59)
        props.setTimerSecondsLeft(59)
        props.setTimerBreakMinutesLeft(props.timerBreakMinutesLeft - 1) 
      }
      else{ 
        setSeconds(seconds - 1)
        props.setTimerSecondsLeft(props.timerSecondsLeft-1) 
      }
  }
 

  useEffect(() => { 
    let interval = null;
    if (isActive) { 
      interval = setInterval(() => {

        if (isWorking){
          console.log("WORK")
            workCountdown()
        } else {
          console.log("BREAK")
            breakCountdown()
        }
      }, 100);
    } 
    
    //BUG POSSIBILITY
    else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [seconds, isActive]);


  //todo add form that sets task.
  // bug possibility: may reset timer somehow. 

  return (
    <div className="app">
      <div className="time">
        {isWorking ? "Working" + props. timerWorkMinutesLeft + "m" + seconds + "s" : `Breaking ${props.timerBreakMinutesLeft}m${seconds}`} 
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