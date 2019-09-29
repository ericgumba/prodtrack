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
import Stats from './components/Stats'

function App() {

  const TIMER = "TIMER"
  const SETTINGS = "SETTINGS"
  const STATS = "STATS"
  const REGISTER = "REGISTER"
  const LOGIN = "LOGIN"

  // state of app and user's stats
  let [username, setUsername] = useState("")
  let [minutesCompleted, setMinutesCompleted] = useState( 0)  
  let [ workDefinition, setWorkDefinition ] = useState(
    localStorage.getItem('workDefinition') || 1 ) 
  let [ breakDefinition, setBreakDefinition ] = useState(
    localStorage.getItem('breakDefinition') || 0)  
  let [ task, setTask ] = useState(
    localStorage.getItem('task') || "") 
  let [ entry, setEntry ] = useState(
    localStorage.getItem('entry') || "") 
  const [screen, setScreen] = useState(TIMER)
  const [taskEntryDictionary, setTaskEntryDictionary] = useState(
    JSON.parse(localStorage.getItem('taskEntryDictionary')) || 
    {}
    )
  const [totalWork, setTotalWork] = useState([taskEntryDictionary])

  
  
  // below saves state of timer
  const [timerWorkMinutesLeft, setTimerWorkMinutesLeft] = useState(
    localStorage.getItem('timerWorkMinutesLeft') || workDefinition)
  const [timerSecondsLeft, setTimerSecondsLeft] = useState(
    localStorage.getItem('timerSecondsLeft') || 0)
  const [timerBreakMinutesLeft, setTimerBreakMinutesLeft ] = useState(
    localStorage.getItem('timerBreakMinutesLeft') || breakDefinition)
  const [timerIsInWorkMode, setTimerIsInWorkMode ] = useState(
    localStorage.getItem('timerIsInWorkMode') || true)
  const [timerIsActive, setTimerIsActive] = useState(
    localStorage.getItem('timerIsActive') || false)


  function save(){
    localStorage.setItem('timerIsActive', timerIsActive)
    localStorage.setItem('timerIsInWorkMode', timerIsInWorkMode)
    localStorage.setItem('timerBreakMinutesLeft', timerBreakMinutesLeft)
    localStorage.setItem('timerSecondsLeft', timerSecondsLeft)
    localStorage.setItem('timerWorkMinutesLeft', timerWorkMinutesLeft)
    localStorage.setItem('entry', entry)
    localStorage.setItem('task', task)
    localStorage.setItem('breakDefinition', breakDefinition)
    localStorage.setItem('workDefinition', workDefinition)
    localStorage.setItem('minutesCompleted', parseInt(minutesCompleted))
//     localStorage.setItem('user', JSON.stringify(user));   
// var user = JSON.parse(localStorage.getItem('user')); 
    localStorage.setItem('taskEntryDictionary', JSON.stringify(taskEntryDictionary))
  }

  function createSettings(){

    //TODO pass in timer state to reset values
    return(
      <>
        <Settings 
        setTimerIsInWorkMode={setTimerIsInWorkMode}
        setTimerBreakMinutesLeft={setTimerBreakMinutesLeft}
        setTimerWorkMinutesLeft={setTimerWorkMinutesLeft}
        setTimerSecondsLeft={setTimerSecondsLeft}
        setWorkDefinition={setWorkDefinition}
        setBreakDefinition={setBreakDefinition}
        />
      </>
    )
  }
  function createStats(){
    return (
      <Stats>

      </Stats>
    )
  }
  function createTimer(){
    return(
      <div>
        <Timer  
        timerIsActive={timerIsActive}
        setTimerIsActive={setTimerIsActive}
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
        task={task}
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
      if (screen === TIMER){
        
      setScreenDisplayed( createTimer() )
      
    } else if (screen === SETTINGS ){
      
      setScreenDisplayed( createSettings() )
      
    } else if (screen === STATS){
      setScreenDisplayed( createStats() )
    }
    else if (screen === REGISTER){ 
      setScreenDisplayed(<Register></Register>)
    }
    else if (screen === LOGIN){
      setScreenDisplayed(createLogin())
    }
  }

  // todo: fix this to init or update
  
  // {
//       entry: [ {task, minute}, {}, {} ]
  // }
  function print(str){
    console.log(str)
  }

  function updateTaskEntryDictionary(task){ 
    print(taskEntryDictionary)

    // if task is in entry of dictionary
    let updated = false
    let updatedTasks = taskEntryDictionary[entry].map( dicTask =>{
      print("TASK NAME: ")
      let taskName = Object.keys(dicTask)[0] 

      if (taskName === task){
        console.log("you got it")
        let updatedTaskObject = {}
        updatedTaskObject[task] = dicTask[taskName] + 1
        console.log(updatedTaskObject)
        updated = true
        return updatedTaskObject
      } else{
        return dicTask
      }


    } )

    console.log(updated, "WAS TASKET N")
    
    if (!updated){ // if not updated then that means new task was entered
      taskEntryDictionary[entry].push({[task]: 1})
    } else{
      taskEntryDictionary[entry] = updatedTasks
}
    setTaskEntryDictionary(taskEntryDictionary)
  }

  function createNewEntry(task){ 
    let newTaskObject = {}
    newTaskObject[task] = 1
    taskEntryDictionary[entry] = [newTaskObject]
  }

  // todo, finish this abstraction
  function updateStats(){   


    let nTask = task
    if (!task || task === ""){ 
      setTask('unspecified') 
      nTask='unspecified' 
    }

    if (entry){
      if (taskEntryDictionary.hasOwnProperty(entry)){ 
        updateTaskEntryDictionary(nTask)
      } else{  
        createNewEntry(nTask)
      }
    }
    setTaskEntryDictionary(taskEntryDictionary)
    


  }

  function updateTotal(){

  }

  useEffect( ()=> {  

    
    screenToBeDisplayed()
    save()
  }, [screen,
    timerWorkMinutesLeft,
    timerBreakMinutesLeft,
    timerIsInWorkMode, 
    timerSecondsLeft,
    timerIsActive,
    workDefinition,
    breakDefinition,
    entry
  ] )

  useEffect( () =>{
    console.log('hey there dog man', console.log(minutesCompleted))
    if (minutesCompleted > 0){
    updateStats()
    updateTotal()
    screenToBeDisplayed()
    save()}
  }, [minutesCompleted] )
 
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
