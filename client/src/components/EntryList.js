// todo: header = current date = entry
// list of tasks = { name minutes hours pomodoros }


import React from 'react'; 
import {useState, useEffect} from "react"

function EntryList(props){

    let todaysEntry = new Date()
    todaysEntry = todaysEntry.getFullYear() + '-' + (todaysEntry.getMonth() + 1) + '-' + todaysEntry.getDate();

    const [task, setTask] = useState(props.tasks)

    useEffect(() => { 

        console.log("changed prop")
        setTask(props.task)

    },[ props.task]) 
 
  

    return(
        <div>
            {todaysEntry}
            Total Time Spent Working: {props.minutesCompleted} 
            {props.task}
        </div>
    )
}

export default EntryList