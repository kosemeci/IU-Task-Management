import React from 'react'
import '../css/task.css'
import CollapsibleTable from './Table';


function Task() {
    return (
        <div className='task-container'>
            <p>All task are displaying...</p>
            <CollapsibleTable />
        </div>
    )
}

export default Task