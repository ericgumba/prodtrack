import React from 'react';  
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form' 
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ProgressBar from 'react-bootstrap/ProgressBar'

const Timer = (props) => { 
  const [seconds, setSeconds] = useState(props.timerSecondsLeft)
  const [isActive, setIsActive] = useState(false) 
  const [isWorking, setIsWorking] = useState(props.timerIsInWorkMode) 
  const [task, setTask] = useState(props.task)
  function toggle() {
    setIsActive(!isActive)
    props.setTimerIsActive(!props.timerIsActive);
  }
  

  function tick(seconds){
    setSeconds(seconds)
    props.setTimerSecondsLeft(seconds)
  }

  // todo: replace with udpate stats instead
 

  function endSession(){ 
    if( isWorking){
      props.setTimerWorkMinutesLeft(props.workDefinition)
      props.setWorkSessionsCompleted(parseInt(props.workSessionsCompleted) + 1)

      if ( longBreakReward() ){
        props.setWorkSessionsCompleted(parseInt(0))
        console.log("TAKE A VREAK")
        props.setTimerBreakMinutesLeft(props.longBreakDefinition)
      }

    } else{ 

      props.setTimerBreakMinutesLeft(props.breakDefinition)
    } 
    setIsWorking(!isWorking)  
    props.setTimerIsInWorkMode(!props.timerIsInWorkMode)  
    tick(0)
  }

  function skip(){ 
    endSession()
    
    if (isActive){
      toggle()
    }
  }

  function incrementWorkSessionsCompleted(){
    props.setWorkSessionsCompleted(parseInt(props.workSessionsCompleted) + 1)
  }
  function workCountdown() {
    if (props.timerWorkMinutesLeft <= 0 & seconds <= 0 ){
      endSession() 
      props.setMinutesCompleted(parseInt(props.minutesCompleted)+1)  
    }
    else if ( seconds <= 0  ){  
      tick(59)
      props.setTimerWorkMinutesLeft(props.timerWorkMinutesLeft - 1) 

      if ( props.timerWorkMinutesLeft !== props.workDefinition )
      props.setMinutesCompleted(parseInt( props.minutesCompleted)+1) 
 

    }
    else{  
 
      tick(seconds-1)
    }
  }

  function breakCountdown() {
      if(props.timerBreakMinutesLeft <= 0 & seconds <= 0){         
        endSession()
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
            workCountdown()
        } else { 
            breakCountdown()
        }
      }, 1000);
    } 
    
    //BUG POSSIBILITY
    else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [seconds, isActive, isWorking]);


  //todo add form that sets task.
  // bug possibility: may reset timer somehow. 

  function updateTask(value){
    setTask(value)
    props.setTask(value)
  }

  function progressBarPercentage(){
    return (isWorking ? (props.timerWorkMinutesLeft / props.workDefinition) :  props.workSessionsCompleted===0 ? (props.timerBreakMinutesLeft / props.longBreakDefinition ) : ( props.timerBreakMinutesLeft / props.breakDefinition)) * 100
  }

  function longBreakReward(){
    return props.workSessionsCompleted >= props.longBreakPeriods -1
  }

  function createCard(){
    const now = progressBarPercentage()

    const progressInstance = <ProgressBar now={now} label={`${now}%`} />;
    
    return(
    <Card className="text-center">
  <Card.Header> {parseInt(props.workSessionsCompleted)} / {props.longBreakPeriods} </Card.Header>
  <Card.Body>
    <Card.Title>{props.task}</Card.Title>
    {progressInstance}
    <Card.Text>
      {generateWorkInfo()}
    </Card.Text>
    <Button variant="primary" className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
          {isActive ? 'Pause' : 'Start'}</Button>
    <Button variant="primary" onClick={skip} >Skip</Button>
  </Card.Body> 
</Card>)
  }

  function generateWorkInfo(){
    return isWorking ? `You are currently working on ${props.task} with ${props. timerWorkMinutesLeft} minutes left and ${seconds} left for current work session` : `You are currently taking a break from, ${props.task} with ${props. timerBreakMinutesLeft} minutes left and ${seconds} seconds left for current break session`
  }

  return (
    <div className="TimerApp">
      <div className="time">


        {createCard()} 
      </div>
      <div className="row">
 
 
      </div> 
          Input your task below
        <Form.Control size="lg" type="text" placeholder="Large text" value={task} onChange={(e) => {updateTask(e.target.value)}} /> 
    
    

    </div>
  );
};

export default Timer;