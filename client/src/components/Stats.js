import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';

// todo: implement stats
function Stats(props) {

    const [page, setPage] = useState(0) // entries, page 0 will always be "all-time".
    // if (page === 0)
    let ret = props.totalWork.entries[page] // {9/28/2019: tasks[]} or something

    let entry = Object.keys(ret)[page];

    console.log("WOwowow", props.totalWork)
 
    
    console.log("RET RET", props.totalWork.entries.length) 
    return (
        <div> 

            {entry}
            {ret[entry].map( task => {

                let tn = Object.keys(task)[0]
                let mins = task[tn]
                return <div> {tn} - {mins} </div>
            } )}

            current page: {page}
            <Button onClick={() => setPage( Math.max(page-1, 0 ) ) } > Prev </Button>
            <Button onClick={ () => setPage( Math.min( page+1, props.totalWork.entries.length - 1 ) ) } > Next </Button>
        </div>
    );
}


export default Stats 