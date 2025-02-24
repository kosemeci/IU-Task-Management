import * as React from 'react';
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
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Divider } from '@mui/material';


const BASE_URL = "http://localhost:8080/task-management/task/all";

function Row(props) {
    const { row, getTaskList } = props;
    const [open, setOpen] = React.useState(false);
    const { mail, role } = useContext(AuthContext);


    const renderTaskAction = (status, taskId, taskOwnerMail) => {
        if (mail == taskOwnerMail) {
            switch (status) {
                case 'PENDING':
                    return <button className="task-button" onClick={() => chooseTask(taskId)}>Görevi Al</button>
                case 'IN_PROGRESS':
                    return <button className="task-button" onClick={() => completeTask(taskId)}>Görevi Tamamla</button>
                case 'FAILED':
                    return <p>*Görev başarısızlıkla sonuçlandı.</p>
                case 'COMPLETED':
                    return <p>*Görev başarıyla sonuçlandı.</p>
                case 'CANCELLED':
                    return <p>*Görev iptal edildi.</p>
            }
        }
        else {
            switch (status) {
                case 'FAILED':
                    return <p>*Görev başarısızlıkla sonuçlandı.</p>
                case 'COMPLETED':
                    return <p>*Görev başarıyla sonuçlandı.</p>
                case 'CANCELLED':
                    return <p>*Görev iptal edildi.</p>
            }
        }

    }

    const renderTaskActionForAdmin = (status, taskId) => {
        switch (status) {
            case 'IN_PROGRESS':
                return (
                    <>
                        <button className="task-button">Extend Time</button>
                        <button className="task-button">Cancel</button>
                    </>
                );
            case 'COMPLETED':
                return <p>*Görev başarıyla sonuçlandı.</p>
            case 'FAILED':
                return <button className="task-button">Extend Time</button>;
            case 'CANCELLED':
                return <p>*Görev iptal edildi.</p>
            default:
                return (
                    <>
                        <button className="task-button">Extend Time</button>
                        <button className="task-button">Assign Task</button>
                        <button className="task-button">Cancel</button>
                    </>
                );
        }
    }

    const chooseTask = async (taskId) => {
        try {
            const response = await axios.put(`http://localhost:8080/user-management/user/choose/task?taskId=${taskId}`,
                {},//BOŞ BİLE OLSA GÖNDERMEK GEREKİYOR
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true,
                    timeout: 25000
                });
            console.log(response.data);
            getTaskList();

        } catch (error) {
            console.log(error);
        }
    }

    const completeTask = async (taskId) => {
        try {
            const response = await axios.put(`http://localhost:8080/task-management/task/complete?taskId=${taskId}`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true,
                    timeout: 20000
                }
            );
            console.log(response.data);
            getTaskList();
        } catch (error) {
            console.error("Hata oluştu:", error.response ? error.response.data : error.message);
        }
    }

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}
                style={{ cursor: 'pointer' }} onClick={() => setOpen(!open)}

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
                <TableCell sx={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.user ? row.user.firstName + " " + row.user.lastName : ""}</TableCell>
                <TableCell sx={{ maxWidth: 50, overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.project?.id}</TableCell>

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
                                        <TableCell sx={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }}>Priority</TableCell>
                                        <TableCell sx={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }}>Assigned Date</TableCell>
                                        <TableCell sx={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }}>Completion Date</TableCell>
                                        <TableCell sx={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis' }}>User Email</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={row.project?.id}>
                                        <TableCell sx={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.project?.projectName}</TableCell>
                                        <TableCell sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.description}</TableCell>
                                        <TableCell sx={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.priority}</TableCell>
                                        <TableCell sx={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.assignedDate}</TableCell>
                                        <TableCell sx={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.completionDate}</TableCell>
                                        <TableCell sx={{ maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.user?.mailAdress}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <Divider sx={{ borderBottomStyle: "double", borderBottomWidth: "2px", borderColor: '#8e7f8f' }} />
                            <Table>
                                <TableBody>
                                    <TableRow className='task-action' >
                                        <TableCell sx={{ textAlign: 'right', padding: '8px' }} >
                                            {role == 'ADMIN' ? renderTaskActionForAdmin(row.status, row.id) : renderTaskAction(row.status, row.id, row.user?.mailAdress)}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment >
    );
}

export default function CollapsibleTable({ filterCriteria, filterValue }) {
    const [taskList, setTaskList] = useState([]);
    const [orderSelect, setOrderSelect] = useState('id');
    const [allTasks, setAllTasks] = useState([]);
    const { userId } = useContext(AuthContext);
    const navigate = useNavigate('');

    const getTaskList = async () => {
        try {
            if (!userId) navigate('/login'); // userId yoksa API isteği yapma

            const response = await axios.get(BASE_URL, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
                timeout: 10000
            });
            console.log(response.data);
            const sortedData = response.data.sort((a, b) => a.id - b.id);
            setTaskList(sortedData);
            setAllTasks(sortedData);
            return sortedData;
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getTaskList();
    }, [])

    const sortedList = (param) => {
        setOrderSelect(param);
    };

    useEffect(() => {
        setTaskList((prevList) =>
            [...prevList].sort((a, b) =>
                typeof a[orderSelect] === "string"
                    ? a[orderSelect].localeCompare(b[orderSelect])
                    : a[orderSelect] - b[orderSelect]
            )
        );
    }, [orderSelect]);

    const filterDataByCriteria = (task, filterCriteria, filterValue) => {
        const value = String(task[filterCriteria]).toLowerCase();
        return value.includes(filterValue.toLowerCase());
    };
    const filterByUserProperty = (task, property, filterValue) => {
        if (task.user && task.user[property]) {
            return String(task.user[property]).toLowerCase().includes(filterValue.toLowerCase());
        }
        return false;
    };
    const filterByUserFullName = (task, filterValue) => {
        if (task.user) {
            const fullName = `${task.user.firstName} ${task.user.lastName}`.toLowerCase();
            return fullName.includes(filterValue.toLowerCase());
        }
        return false;
    };

    useEffect(() => {
        //filtrelemeye göre task listesini güncelliyoruz
        // console.log(filterCriteria);
        // console.log(filterValue)
        if (!filterCriteria || !filterValue) {
            setTaskList(allTasks);
        } else {
            let filteredData;

            switch (filterCriteria) {
                case 'id':
                    filteredData = allTasks.filter(task => {
                        return String(task[filterCriteria]) === filterValue;
                    });
                    break;
                case 'project_id':
                    filteredData = allTasks.filter(task => {
                        return String(task.project.id) === filterValue;
                    });
                    break;
                case 'username':
                    filteredData = allTasks.filter(task => filterByUserFullName(task, filterValue));
                    break;
                case 'mailAdress':
                    filteredData = allTasks.filter(task => filterByUserProperty(task, 'mailAdress', filterValue));
                    break;
                default:
                    filteredData = allTasks.filter(task => filterDataByCriteria(task, filterCriteria, filterValue));
                    break;
            }

            setTaskList(filteredData);
        }
    }, [filterCriteria, filterValue, allTasks])


    return (
        <TableContainer component={Paper} >
            <Table aria-label="collapsible table" sx={{ backgroundColor: '#fbf9f9' }} >
                <TableHead>
                    <TableRow className='order-table-row' onClick={(e) => sortedList(e.target.dataset.param)}>
                        <TableCell />
                        <TableCell style={{ textDecoration: orderSelect === 'id' ? "underline" : "none", cursor: "pointer" }}
                            data-param="id">ID</TableCell>
                        <TableCell style={{ textDecoration: orderSelect === 'taskTitle' ? "underline" : "none", cursor: "pointer" }}
                            data-param="taskTitle">Title</TableCell>
                        <TableCell style={{ textDecoration: orderSelect === 'createdDate' ? "underline" : "none", cursor: "pointer" }}
                            data-param="createdDate">Created Date</TableCell>
                        <TableCell style={{ textDecoration: orderSelect === 'deadline' ? "underline" : "none", cursor: "pointer" }}
                            data-param="deadline">Deadline</TableCell>
                        <TableCell style={{ textDecoration: orderSelect === 'status' ? "underline" : "none", cursor: "pointer" }}
                            data-param="status">Status</TableCell>
                        <TableCell >User</TableCell>
                        <TableCell >Project ID</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {taskList.map((row) => (
                        <Row key={row.id} row={row} getTaskList={getTaskList} >
                        </Row>

                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}