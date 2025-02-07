import React from 'react'
import '../css/task.css'
import CollapsibleTable from './TableTask';
import { useState } from 'react';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';


function Task() {

    const [inputValue, setInputValue] = useState('');
    const [selectOption, setSelectOption] = useState('');

    const handleChange = (event) => {
        setSelectOption(event.target.value)
    }

    const inputChange = (event) => {
        setInputValue(event.target.value)
    }

    return (
        <div className='task-container'>
            <p>All task are displaying...</p>
            <div className='table-filter'>
                <FilterListOutlinedIcon />
                <select value={selectOption} id="options" className='select-filter' onChange={handleChange}>
                    <option value="" disabled>Select an option</option>
                    <option value="project_id">Project id</option>
                    <option value="task_id">Task id</option>
                    <option value="taskTitle">Task title</option>
                    <option value="username">Username</option>
                    <option value="createdDate">Created Date</option>
                    <option value="deadline">Deadline</option>
                    <option value="status">Status</option>
                    <option value="mailAdress">User Mail</option>
                </select>
                <input type="text" value={inputValue} className='input-filter' onChange={inputChange} />
                <button className="button-filter">Filtrele</button>
            </div>
            <CollapsibleTable />
        </div>
    )
}

export default Task