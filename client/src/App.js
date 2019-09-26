import React from 'react'; 
import {useState, useEffect} from "react"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Timer from './components/Timer'
import Navbar from './components/Navbar'
import Register from './components/Register' // form


function App() {

  const TIMER = "TIMER"
  const SETTINGS = "SETTINGS"
  const STATS = "STATS"
  const REGISTER = "REGISTER"
  const LOGIN = "LOGIN"


  let [username, setUsername] = useState("")
  let [minutesCompleted, setMinutesCompleted] = useState(0) 
  let [hoursCompleted, setHoursCompleted] = useState(minutesCompleted/60) 
  let [ workDefinition, setWorkDefinition ] = useState(1) 
  let [ breakDefinition, setBreakDefinition ] = useState(2) 
  let [ pomodorosCompleted, setPomodorosCompleted ] = useState( minutesCompleted / workDefinition)
  let [ task, setTask ] = useState("")
  let [ isWorking, setIsWorking ] = useState(false)
   

  const [screen, setScreen] = useState(TIMER)

  
  
  // below saves state of timer
  const [timerWorkMinutesLeft, setTimerWorkMinutesLeft] = useState(workDefinition)
  const [timerSecondsLeft, setTimerSecondsLeft] = useState(0)
  const [timerBreakMinutesLeft, setTimerBreakMinutesLeft ] = useState(breakDefinition)
  const [timerIsInWorkMode, setTimerIsInWorkMode ] = useState(true)
  
  
  function createTimer(){
    return(
      <Timer  
      workDefinition={workDefinition}
      breakDefinition={breakDefinition}
      timerWorkMinutesLeft={timerWorkMinutesLeft}
      setTimerWorkMinutesLeft={setTimerWorkMinutesLeft}
      timerSecondsLeft={timerSecondsLeft}
      setTimerSecondsLeft={setTimerSecondsLeft}
      timerBreakMinutesLeft={timerBreakMinutesLeft}
      setTimerBreakMinutesLeft={setTimerBreakMinutesLeft}
      timerIsInWorkMode={timerIsInWorkMode}
      setTimerIsInWorkMode={setTimerIsInWorkMode}  
      ></Timer>
      )
    }


    const [screenDisplayed, setScreenDisplayed] = useState(createTimer())


    function screenToBeDisplayed(){
      console.log(screen)
      if (screen === TIMER){
        
      setScreenDisplayed( createTimer() )
      
    } else if (screen === SETTINGS ){
      
      
    } else if (screen === STATS){

    }
    else if (screen === REGISTER){ 
      setScreenDisplayed(<Register></Register>)
    }
  }

  useEffect( ()=> {
    screenToBeDisplayed()
  }, [screen] )

  return (
    <div className="App"> 

    <Navbar
    setScreen={setScreen}
    ></Navbar> 
    {screenDisplayed}
 

    </div>
  );
}

export default App;
