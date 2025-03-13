import React from 'react'
import { useState } from 'react';
import '../../css/admin.css'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';

function FilterTask({ onFilterChange }) {

    const [inputFilter, setInputFilter] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('');

    const handleSelectChange = (event) => {
        setSelectedFilter(event.target.value)
        setInputFilter('');
    }

    const handleInputChange = (event) => {
        setInputFilter(event.target.value)
    }

    const handleFilterClick = () => {
        if (selectedFilter && inputFilter)
            onFilterChange(selectedFilter, inputFilter);
    }

    return (
        <div className='table-filter'>
            <FilterListOutlinedIcon />
            <select value={selectedFilter} className='select-filter' onChange={handleSelectChange}>
                <option value="" disabled>Select an option</option>
                <option value="project_id">Project id</option>
                <option value="id">Task id</option>
                <option value="taskTitle">Task title</option>
                <option value="username">Name</option>
                <option value="createdDate">Created Date</option>
                <option value="deadline">Deadline</option>
                <option value="status">Status</option>
                <option value="mailAdress">User Mail</option>
            </select>
            <input value={inputFilter} className='input-filter' onChange={handleInputChange} placeholder="Enter filter value..." />
            <button className="button-filter" onClick={handleFilterClick}>Filtrele</button>
        </div>
    )
}

export default FilterTask