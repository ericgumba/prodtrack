import React from 'react';  
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form' 

const Timer = (props) => { 
  const [seconds, setSeconds] = useState(props.timerSecondsLeft)
  const [isActive, setIsActive] = useState(false) 
  const [isWorking, setIsWorking] = useState(props.timerIsInWorkMode) 
  function toggle() {
    setIsActive(!isActive)
    props.setTimerIsActive(!props.timerIsActive);
  }
  

  function tick(seconds){
    setSeconds(seconds)
    props.setTimerSecondsLeft(seconds)
  }

  // todo: replace with udpate stats instead
  function workCountdown() {
    if (props.timerWorkMinutesLeft <= 0 & seconds <= 0 ){

      console.log("entering break")
      setIsWorking(false)  

      props.setTimerIsInWorkMode(false) 
      props.setTimerWorkMinutesLeft(props.workDefinition)  
      props.setMinutesCompleted(props.minutesCompleted+1) 
      tick(0)
    }
    else if (seconds <= 0  ){  
      tick(59)
      props.setTimerWorkMinutesLeft(props.timerWorkMinutesLeft - 1) 

      if ( props.timerWorkMinutesLeft !== props.workDefinition )
      props.setMinutesCompleted(props.minutesCompleted+1) 
 

    }
    else{  
 
      tick(seconds-1)
    }
  }

  function breakCountdown() {
      if(props.timerBreakMinutesLeft <= 0 & seconds <= 0){        
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

  function print(str){
    console.log(str)
  }

  useEffect(() => { 
    let interval = null;
    if (isActive) { 
      interval = setInterval(() => {
        print(isWorking)

        if (isWorking){ 
            workCountdown()
        } else { 
            breakCountdown()
        }
      }, 100);
    } 
    
    //BUG POSSIBILITY
    else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [seconds, isActive, isWorking]);


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