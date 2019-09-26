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

  const [screenDisplayed, setScreenDisplayed] = useState(<Timer workDefinition={workDefinition} breakDefinition={breakDefinition} isWorking={isWorking} setIsWorking={ () => setIsWorking( !isWorking ) } ></Timer>)
  
  // todo: save state of timer ...
  
  function screenToBeDisplayed(){
    console.log(screen)
    if (screen === TIMER){

      setScreenDisplayed(<Timer workDefinition={workDefinition} breakDefinition={breakDefinition} isWorking={isWorking} setIsWorking={ () => setIsWorking( !isWorking ) } ></Timer>)
      
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
