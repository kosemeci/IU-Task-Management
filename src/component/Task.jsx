import React, { useState } from 'react'
import '../css/task.css'
import CollapsibleTable from './TaskUtils/TableTask';
import FilterTask from './TaskUtils/FilterTask';


function Task() {

    const [filterCriteria, setFilterCriteria] = useState('');
    const [filterValue, setFilterValue] = useState('');

    const handleFilterChange = (criteria, value) => {
        setFilterCriteria(criteria);
        setFilterValue(value);
    }

    return (
        <div className='task-container'>
            <p>All task are displaying...</p>
            <FilterTask onFilterChange={handleFilterChange} />
            <CollapsibleTable filterCriteria={filterCriteria} filterValue={filterValue} />
        </div>
    )
}

export default Task