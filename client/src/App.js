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
  //local storage this
  let [username, setUsername] = useState(
    localStorage.getItem('username') || "")
  let [minutesCompleted, setMinutesCompleted] = useState( 0)  
  let [ workDefinition, setWorkDefinition ] = useState(
    localStorage.getItem('workDefinition') || 25 ) 
  let [ breakDefinition, setBreakDefinition ] = useState(
    localStorage.getItem('breakDefinition') || 5)  
  let [ longBreakDefinition, setLongBreakDefinition ] = useState(
    localStorage.getItem('longBreakDefinition') || 25) 
  const [longBreakPeriods, setLongBreakPeriods] = useState(
    localStorage.getItem('longBreakPeriods') || 4)
    
  const [workSessionsCompleted, setWorkSessionsCompleted] = useState(
   parseInt( localStorage.getItem('workSessionsCompleted')) || 0)
  
    
  let [ task, setTask ] = useState(
    localStorage.getItem('task') || "") 


    let todaysEntry = new Date()
    todaysEntry = todaysEntry.getFullYear() + '-' + (todaysEntry.getMonth() + 1) + '-' + todaysEntry.getDate();

  let [ entry, setEntry ] = useState( todaysEntry ) 
  const [screen, setScreen] = useState(TIMER)
  const [taskEntryDictionary, setTaskEntryDictionary] = useState(
    JSON.parse(localStorage.getItem('taskEntryDictionary')) || 
    { entry: entry, tasks: [] } // { entry: String, tasks: [ { title:String, minutesWorked:Number } ] }
    )
  const [totalWork, setTotalWork] = useState(    
    JSON.parse(localStorage.getItem('totalWork')) || 
   { entries: 
    [
     taskEntryDictionary
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


  function register(username, password){
    fetch("http://localhost:3000/register", {
      method: 'post',
      body:JSON.stringify( { username: username, password: password, entries: totalWork.entries } )
    })
    .then(response => response.json())
    .then(data => {
      console.log("DATUM fROM REGISTER", data)
      if ( data.msg ){
        alert("Username already exists")
      } else {
        setUsername(data.username) 
        setScreenDisplayed( createTimer() )
        setScreen( TIMER )

        console.log(username)
      }
    }); 
  }

  // register() 

  function resetTimer(){
    setWorkDefinition(25)
    setBreakDefinition(5)
    setMinutesCompleted(0)
    setTimerWorkMinutesLeft(25)
    setTimerBreakMinutesLeft(5)
    setTimerSecondsLeft(0)
  }
  
  function login(username, password){

    if (username){
    fetch('http://localhost:3000/login', {
      method: 'post',
      body: JSON.stringify({username: username, password: password})
    })
    .then(response => response.json())
    .then(data =>  {

      console.log("DATAR", data)

      if (data.msg){
        alert("incorrect name")
      }else{
        setUsername(data.username)
        totalWork.entries = data.entries 
        setTotalWork(totalWork)
        if (getIndexOfEntry() >= 0){
          setTaskEntryDictionary(totalWork.entries[getIndexOfEntry()] )}
        resetTimer() 
        setScreenDisplayed( createTimer() )
        setScreen( TIMER )
        save()  
    }
    }
      )}

  }

  function logout(){
    totalWork.entries = []
    setTotalWork(totalWork)
    setTaskEntryDictionary({ entry: entry, tasks: [] })
    setUsername("")
    resetTimer()
    setScreenDisplayed( createTimer() )
    setScreen( TIMER )
  }

  function updateUser(){
 
    if(username){
      fetch('http://localhost:3000/update', {
        method: 'post',
        body: JSON.stringify({username: username, entries: totalWork.entries })
      })
      .then(response => response.json())
      .then(data =>  {
 
      }
        )
    }

  }

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
    localStorage.setItem('username', username);   
// var user = JSON.parse(localStorage.getItem('user')); 
    localStorage.setItem('taskEntryDictionary', JSON.stringify(taskEntryDictionary))
    localStorage.setItem('totalWork', JSON.stringify(totalWork))
    localStorage.setItem('longBreakDefinition', longBreakDefinition)
    localStorage.setItem('longBreakPeriods', longBreakPeriods)
    localStorage.setItem('workSessionsCompleted', parseInt(workSessionsCompleted))
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
        setLongBreakDefinition={setLongBreakDefinition}
        setLongBreakPeriods={setLongBreakPeriods}
        workDefinition={workDefinition}
        breakDefinition={breakDefinition}
        longBreakDefinition={longBreakDefinition}
        longBreakPeriods={longBreakPeriods}
        />
      </>
    )
  }
  function createStats(){
    return (
      <Stats
      totalWork={totalWork}
      workDefinition={workDefinition}
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

        workSessionsCompleted={workSessionsCompleted}
        setWorkSessionsCompleted={setWorkSessionsCompleted}
        longBreakDefinition={longBreakDefinition}
        longBreakPeriods={longBreakPeriods}
        ></Timer>

        <div>

        </div>
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
        <Login
        login={login}
        ></Login>
      )
    }

    


    const [screenDisplayed, setScreenDisplayed] = useState(createTimer())
    const [header, setHeader] = useState(<Navbar setScreen={setScreen}></Navbar>)   
    function updateHeader(){
      if (username){
            
        setHeader(<Navbar
        setScreen={setScreen}
        username={username}
        logout={logout}

        ></Navbar>) 
      }else {
        setHeader(<Navbar
          setScreen={setScreen}
          ></Navbar>)
      }
    }

    function screenToBeDisplayed(){ 
      if (screen === TIMER){
        
      setScreenDisplayed( createTimer() )
      
    } else if (screen === SETTINGS ){
      
      setScreenDisplayed( createSettings() )
      
    } else if (screen === STATS){
      setScreenDisplayed( createStats() )
    }
    else if (screen === REGISTER){ 
      setScreenDisplayed(<Register register={register} ></Register>)
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
    longBreakDefinition,
    longBreakPeriods,
    entry,
    workSessionsCompleted
  ] )

  useEffect( ()=>{
    updateHeader()
  }, [username] )

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
    let updatedTasks = taskEntryDictionary.tasks.map( dicTask =>{ 
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

  function taskInEntry(){
    let res = false
    taskEntryDictionary.tasks.map( task => {
      if (task.title === task){
        res = true
      }
      return task
    } )
    return res
  }
  // todo, finish this abstraction
  function updateStats(){   
    let now = new Date()
    now = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();

    setEntry(now)

    let nTask = task
    if (!task || task === ""){ 
      setTask('unspecified')   
      nTask='unspecified' 
    }
 
    if (taskEntryDictionary.entry !== now){
      createNewEntry(nTask)
    }

    else if ( taskInEntry(nTask) ){
        updateTaskEntryDictionary(nTask)
      } else{  
        updateTaskEntryDictionary(nTask)
      }
     
    


  }

  function removeDuplicatesFromTotalWork(){
    // myObj.hasOwnProperty('key')

    let set = new Set()

    let debuggedEntries = totalWork.entries.filter( ent => {
      
      if (set.has(ent.entry)) return false 
      else {
        set.add(ent.entry)
        return true
      }  
       
    })

 

    totalWork.entries = debuggedEntries

    setTotalWork(totalWork)
  }

  function updateTotalWork(){

    let ind = getIndexOfEntry() 

    if (taskEntryDictionary){
      if ( ind === -1 ){
        totalWork.entries.push(taskEntryDictionary)
      } else {
        totalWork.entries[ind] = taskEntryDictionary
      }
    }
    setTotalWork(totalWork)
  }


  useEffect( () =>{ 
    if (minutesCompleted > 0){
      updateStats()
      updateTotalWork()
      removeDuplicatesFromTotalWork() // hacking a bug
      screenToBeDisplayed()
      save()
      updateUser()
 
  }
  }, [minutesCompleted] )
 
 
  return (
    <div className="App">


      {header}
    {screenDisplayed} 
 

    </div>
  );
}

export default App; 