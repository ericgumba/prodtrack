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
 
  

    return(
        <div> 
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
                return (<tr> <td> {i} </td> <td>{dicTask.title} </td> <td> { computeTime( dicTask.minutesWorked )} </td> <td> pomodoros </td>  </tr> )
            } ) : null
        
        } 
        </tbody>
      </Table>
        </div>
    )
}

export default EntryList