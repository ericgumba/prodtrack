// todo: header = current date = entry
// list of tasks = { name minutes hours pomodoros }


import React from 'react'; 
import {useState, useEffect} from "react"
import Table from 'react-bootstrap/Table'


// give children 
function EntryList(props){

    let todaysEntry = new Date()
    todaysEntry = todaysEntry.getFullYear() + '-' + (todaysEntry.getMonth() + 1) + '-' + todaysEntry.getDate();

    props.setEntry(todaysEntry)

    // const [task, setTask] = useState(props.tasks)

    // useEffect(() => { 

    //     console.log("changed prop")
    //     setTask(props.task)

    // },[ props.task]) 


    let totalMinutes = 0
    if ( 
        props.taskEntryDictionary.entry )
    props.taskEntryDictionary.tasks.map( tsk =>{ 
        totalMinutes += tsk.minutesWorked 
        return tsk
   } )

   function computeTime(mins){
       let hours = parseInt(mins / 60)
       let minutes = mins % 60

       return ` ${hours} hours and ${minutes} minutes `
   }
 
  
   function computePomodorosCompleted(mins){
    let pomodoros = parseInt( mins/props.workDefinition )

    return pomodoros
}
    // todo: progress bar
    return(
        <div className="EntryList">
            <h1> 
            Today's Date: {todaysEntry} </h1> 
            <div>
                <h2>

            Total Time Spent Working: {computeTime(totalMinutes)}  
                </h2>
            </div>

        
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Task</th>
            <th>Total Time Worked</th>
            <th>Pomodoros Completed</th>
          </tr>
        </thead>
        <tbody>

        { 
                props.taskEntryDictionary.tasks ?
                props.taskEntryDictionary.tasks.map( (dicTask, i) =>{
                 let taskName = Object.keys(dicTask)[0] 
                 let totalMinutes = dicTask[taskName] 
                return (<tr> <td> {i} </td> <td>{dicTask.title} </td> <td> { computeTime( dicTask.minutesWorked )} </td> <td> {computePomodorosCompleted(dicTask.minutesWorked)} </td>  </tr> )
            } ) : null
        
        } 
        </tbody>
      </Table>


      <h1>
          Tutorial
      </h1>
    <p>1. This app lets you define your own work flow. A pomodoro is traditionally designed as 25 minutes of work, followed by a 5 minute break. 
        The settings menu on the top left allows you to customize the length of each work and break period.</p>

    <p>2. This app will also keep a log of how long you've worked on each task and records the total hours, minutes, and pomodoros you've completed, which you can access under the stats menu. </p>

    <p>3. If you have any suggestions on how I can improve this website, please feel free to email me at ericgumba@gmail.com</p>
 

        </div>
    )
}

export default EntryList