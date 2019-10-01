// todo: header = current date = entry
// list of tasks = { name minutes hours pomodoros }


import React from 'react'; 
import {useState, useEffect} from "react"


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
        props.taskEntryDictionary[todaysEntry] )
    props.taskEntryDictionary[todaysEntry].map( dicTask =>{ 
        let taskName = Object.keys(dicTask)[0] 
        let taskMinutes = dicTask[taskName] 
        totalMinutes += taskMinutes 
        return dicTask
   } )
 
  

    return(
        <div>
            {todaysEntry}
            Total Time Spent Working: {totalMinutes}  

            { 
                props.taskEntryDictionary[todaysEntry] ?
                props.taskEntryDictionary[todaysEntry].map( dicTask =>{
                 let taskName = Object.keys(dicTask)[0] 
                 let totalMinutes = dicTask[taskName]
                //  console.log(taskName)
                //  console.log(totalMinutes)
                return (<div> {taskName}, {totalMinutes} </div> )
            } ) : null
        
        }
        </div>
    )
}

export default EntryList