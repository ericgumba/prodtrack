import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';

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

    const [page, setPage] = useState(0) // entries, page 0 will always be "all-time".
    let ret = null// {9/28/2019: tasks[]} or something
    if (page === 0){

        ret = displayEverything() 
        // {Object.keys(yourObject).map(function(key) {
        //     return <div>Key: {key}, Value: {yourObject[key]}</div>;
        // })}

        ret = Object.keys(ret).map( (key) =>{
            return <div> {key}: {ret[key]} </div>
        } )
 
    } else{
        ret = props.totalWork.entries[page-1] // -1 because we need to display first element

        ret = ret.tasks.map( task => <div> {task.title} - {task.minutesWorked} </div> )
    }
 
    return (
        <div>  

           { page === 0 ? "All Time" : props.totalWork.entries[page-1].entry}

            {ret}
            current page: {page}
            <Button onClick={() => setPage( Math.max(page-1, 0 ) ) } > Prev </Button>
            <Button onClick={ () => setPage( Math.min( page+1, props.totalWork.entries.length ) ) } > Next </Button>
        </div>
    );
}


export default Stats 