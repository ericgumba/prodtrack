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


    let todaysEntry = new Date()
    todaysEntry = todaysEntry.getFullYear() + '-' + (todaysEntry.getMonth() + 1) + '-' + todaysEntry.getDate();

  let [ entry, setEntry ] = useState(
    localStorage.getItem('entry') || todaysEntry ) 
  const [screen, setScreen] = useState(TIMER)
  const [taskEntryDictionary, setTaskEntryDictionary] = useState(
    JSON.parse(localStorage.getItem('taskEntryDictionary')) || 
    {} // { entry: String, tasks: [ { title:String, minutesWorked:Number } ] }
    )
  const [totalWork, setTotalWork] = useState(    
    JSON.parse(localStorage.getItem('totalWork')) || 
   { entries: 
    [
     { entry: "2019-9-28", 
       tasks: 
       [ 
         {
          title: "wow", 
          minutesWorked:4
         } 
       ] 
     }
    ]
  }
    )

  
  
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
    localStorage.setItem('totalWork', JSON.stringify(totalWork))
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
      <Stats
      totalWork={totalWork}
      >

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

  function createNewTask(task){ 
    return {title:task, minutesWorked: 1}
  }
  function createNewEntry(task){  
    setTaskEntryDictionary ({ entry:todaysEntry, tasks: [createNewTask(task)]} )
  }

  function getIndexOfEntry(){
    let index = -1
    totalWork.entries.map( (ent, i) => {
      if (entry === ent.entry) index = i
      return ent
    })
    return index
  }

  function updateTaskEntryDictionary(task){  

    let updated = false
    let indexOfEntry = getIndexOfEntry()
    let updatedTasks = taskEntryDictionary.tasks.map( dicTask =>{
    console.log("TASK NAME: ") 
 // { entry: String, tasks: [ { title:String, minutesWorked:Number } ] }
    if (dicTask.title === task){ 
      updated = true
      return {title: dicTask.title, minutesWorked: dicTask.minutesWorked+1 }
    } else{
      return dicTask
    }


    } ) 
    
    if (!updated){ // if not updated then that means new task was entered
      taskEntryDictionary.tasks.push( createNewTask(task))
    } else{
      taskEntryDictionary.tasks = updatedTasks
    }
    setTaskEntryDictionary(taskEntryDictionary)
  }


  // todo, finish this abstraction
  function updateStats(){   


    let nTask = task
    if (!task || task === ""){ 
      setTask('unspecified')   
      nTask='unspecified' 
    }

    // entry is always a thing 

    if (entry){
        updateTaskEntryDictionary(nTask)
      } else{  
        createNewEntry(nTask)
      }
     
    


  }

  function updateTotalWork(){

    let ind = getIndexOfEntry() 
    if ( ind === -1 ){
      totalWork.entries.push(taskEntryDictionary)
    } else {
      totalWork.entries[ind] = taskEntryDictionary
    }

    setTotalWork(totalWork)
  }


  useEffect( () =>{ 
    if (minutesCompleted > 0){
      updateStats()
      updateTotalWork()
      screenToBeDisplayed()
      save()

      console.log(taskEntryDictionary)
      console.log(totalWork)
  }
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
