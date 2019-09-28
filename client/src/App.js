import React from 'react'; 
import {useState, useEffect} from "react"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Timer from './components/Timer'
import Navbar from './components/Navbar'
import Register from './components/Register' // form
import Login from './components/Login'
import EntryList from './components/EntryList'
import Settings from './components/Settings'

function App() {

  const TIMER = "TIMER"
  const SETTINGS = "SETTINGS"
  const STATS = "STATS"
  const REGISTER = "REGISTER"
  const LOGIN = "LOGIN"


  let [username, setUsername] = useState("")
  let [minutesCompleted, setMinutesCompleted] = useState(0)  
  let [ workDefinition, setWorkDefinition ] = useState(1) 
  let [ breakDefinition, setBreakDefinition ] = useState(0)  
  let [ task, setTask ] = useState("") 
  let [ entry, setEntry ] = useState("") 
  const [screen, setScreen] = useState(TIMER)
  const [taskEntryDictionary, setTaskEntryDictionary] = useState({})

  
  
  // below saves state of timer
  const [timerWorkMinutesLeft, setTimerWorkMinutesLeft] = useState(workDefinition)
  const [timerSecondsLeft, setTimerSecondsLeft] = useState(0)
  const [timerBreakMinutesLeft, setTimerBreakMinutesLeft ] = useState(breakDefinition)
  const [timerIsInWorkMode, setTimerIsInWorkMode ] = useState(true)
  
  function createSettings(){
    return(
      <>
        <Settings
        setWorkDefinition={setWorkDefinition}
        setBreakDefinition={setBreakDefinition}
        />
      </>
    )
  }
  
  function createTimer(){
    return(
      <div>
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
        setTask={setTask}
        setMinutesCompleted={setMinutesCompleted}
        minutesCompleted={minutesCompleted}
        ></Timer>

        <EntryList
        task={task}
        setEntry={setEntry}
        taskEntryDictionary={taskEntryDictionary}
        entry={entry}
        minutesCompleted={minutesCompleted} 
        workDefinition={workDefinition}
        >

        </EntryList>
      </div>
      
      )
    }

    function createLogin(){
      return (
        <Login></Login>
      )
    }

    


    const [screenDisplayed, setScreenDisplayed] = useState(createTimer())


    function screenToBeDisplayed(){
      console.log(screen)
      if (screen === TIMER){
        
      setScreenDisplayed( createTimer() )
      
    } else if (screen === SETTINGS ){
      
      setScreenDisplayed( createSettings() )
      
    } else if (screen === STATS){

    }
    else if (screen === REGISTER){ 
      setScreenDisplayed(<Register></Register>)
    }
    else if (screen === LOGIN){
      setScreenDisplayed(createLogin())
    }
  }

  // todo: fix this to init or update 
  function updateStats(){  
    console.log("TEST")
    if(taskEntryDictionary[task])
      taskEntryDictionary[task] = taskEntryDictionary[task] +1
    else
      taskEntryDictionary[task] = 1 

      setTaskEntryDictionary(taskEntryDictionary)


  }

  useEffect( ()=> {
    console.log("testest")
    screenToBeDisplayed()
  }, [screen,timerWorkMinutesLeft,timerBreakMinutesLeft,timerIsInWorkMode] )
 
  return (
    <div className="App"> 

    <Navbar
    setScreen={setScreen}
    ></Navbar> 
    {screenDisplayed}
    {minutesCompleted} 
 

    </div>
  );
}

export default App;
