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
  function workCountdown() {
    if (props.timerWorkMinutesLeft <= 0 & seconds <= 0 ){

      console.log("entering break")
      setIsWorking(false)  

      props.setTimerIsInWorkMode(false) 
      props.setTimerWorkMinutesLeft(props.workDefinition)  
      props.setMinutesCompleted(parseInt(props.minutesCompleted)+1) 
      tick(0)
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

  function updateTask(value){
    setTask(value)
    props.setTask(value)
  }

  function createCard(){
    const now = (isWorking ? (props.timerWorkMinutesLeft / props.workDefinition) :( props.timerBreakMinutesLeft / props.breakDefinition)) * 100

    const progressInstance = <ProgressBar now={now} label={`${now}%`} />;
    
    return(
    <Card className="text-center">
  {/* <Card.Header>Featured</Card.Header> */}
  <Card.Body>
    <Card.Title>{props.task}</Card.Title>
    {progressInstance}
    <Card.Text>
      {generateWorkInfo()}
    </Card.Text>
    <Button variant="primary" className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
          {isActive ? 'Pause' : 'Start'}</Button>
    <Button variant="primary">Go somewhere</Button>
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