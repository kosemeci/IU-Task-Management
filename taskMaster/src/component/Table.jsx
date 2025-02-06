import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import '../css/table.css'
import { useState, useEffect } from 'react';
import axios from 'axios'


const BASE_URL = "http://localhost:8080/task-management/task/all";


function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}
                style={{ cursor: 'pointer' }}
            >
                <TableCell style={{ padding: "2px", textAlign: 'center' }}>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell sx={{ maxWidth: 50, overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.id}</TableCell>
                <TableCell sx={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.taskTitle}</TableCell>
                <TableCell sx={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.createdDate}</TableCell>
                <TableCell sx={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.deadline}</TableCell>
                <TableCell sx={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.status}</TableCell>
                <TableCell sx={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.user?.firstName}</TableCell>
                <TableCell sx={{ maxWidth: 50, overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.project?.projectId}</TableCell>

            </TableRow>
            <TableRow className='table-details'>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }} className='table-details-box'>
                            <Typography variant="h6" gutterBottom component="div">
                                Task Details
                            </Typography>
                            <Table size="small" aria-label="details">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis' }}>Project Title</TableCell>
                                        <TableCell sx={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis' }}>Description</TableCell>
                                        <TableCell sx={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }}>Assigned Date</TableCell>
                                        <TableCell sx={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }}>Completion Date</TableCell>
                                        <TableCell sx={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis' }}>User Email</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={row.project.projectTitle}>
                                        <TableCell sx={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.project.projectName}</TableCell>
                                        <TableCell sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.description}</TableCell>
                                        <TableCell sx={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.assignedDate}</TableCell>
                                        <TableCell sx={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.completionDate}</TableCell>
                                        <TableCell sx={{ maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.user?.mailAdress}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function CollapsibleTable() {
    const [taskList, setTaskList] = useState([]);
    const getTaskList = async () => {
        const response = await axios.get(BASE_URL);
        setTaskList(response.data);
        //console.log(response.data);
        return response.data;
    }
    useEffect(() => {
        getTaskList();
    }, [])

    return (
        <TableContainer component={Paper} >
            <Table aria-label="collapsible table" sx={{ backgroundColor: '#fbf9f9' }} >
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>ID</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Created Date</TableCell>
                        <TableCell>Deadline</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>User</TableCell>
                        <TableCell>Project ID</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {taskList.map((row) => (
                        <Row key={row.id} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
