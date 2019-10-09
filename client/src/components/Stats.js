import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'

// todo: implement stats
function Stats(props) {

    function displayEverything() {
        
        const res = {}
        props.totalWork.entries.map( entry => {

            entry.tasks.map( task => {
                if (res[task.title]){
                res[task.title] += task.minutesWorked} 
                else{ res[task.title] = task.minutesWorked}
                return task
            } )

            return entry

        } )

        return res

    }
    function computeTime(mins){
        let hours = parseInt(mins / 60)
        let minutes = mins % 60
 
        return ` ${hours} hours and ${minutes} minutes `
    }
    function computePomodorosCompleted(mins){
        let pomodoros = parseInt( mins/props.workDefinition )

        return pomodoros
    }
    function createTable(tsk, i) {
        
        return (
        
        <tr> <td> {i} </td> <td>{tsk.title} </td> <td> { computeTime( tsk.minutesWorked )} </td> <td> {computePomodorosCompleted( tsk.minutesWorked )} </td>  </tr> )
    }
    let n = props.totalWork.entries.length
    const [page, setPage] = useState(n) // entries, page 0 will always be "all-time".
    let ret = null// {9/28/2019: tasks[]} or something
    if (page === n){

        ret = displayEverything()  

        ret = Object.keys(ret).map( (task, i) =><tr> <td> {i} </td> <td>{task} </td> <td> { computeTime( ret[task] )} </td> <td> {computePomodorosCompleted( ret[task] )} </td>  </tr> )
 
    } else{
        ret = props.totalWork.entries[page] 

        ret = ret.tasks.map( (task, i) => createTable(task, i) )
    }
    function intValue(entry){
  
      let mv = 100
      let cs = ""
      let res = 0
      for (let i = 0; i < entry.length; i++){
        if (entry[i] === "-"){
            res += parseInt(cs*mv)
            cs = ""
            mv = mv/ 10
          }
        else{
          cs += entry[i]
          }
          
        } 
        
        res += parseInt(cs)
        return res
    
    }

    function sortEntries(){
       let clonedEntries = props.totalWork.entries.slice(0)

       console.log("CE ", clonedEntries)

       let res = []
       
       let test = 0
       while (clonedEntries.length >0){
         let ma = 0
         let popIndex = 0
         for (let i = 0; i < clonedEntries.length; i++){
           if (intValue(clonedEntries[i].entry) > ma){
             popIndex = i
             ma = intValue(clonedEntries[i].entry)
           }  
         }
         res.push(clonedEntries[popIndex])
         clonedEntries.splice(popIndex,1)  
     
       }
       return res
    } 

    let tables = sortEntries().map( entry => (
        <div>
            
         <h1>
         
         {entry.entry}
          </h1> 
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

        {entry.tasks.map( (task, i) => createTable(task,i) )  }
        </tbody>
      </Table>
        </div>
      
      ))


        
    return (
        <div className="Stats" >  

        <h1>

           {page === n ? "All Time" : props.totalWork.entries[page].entry}
        </h1>
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

            {ret}
        </tbody>
      </Table>


      {tables} 
        </div>
    );
}


export default Stats 