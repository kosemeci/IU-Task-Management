import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../../css/table.css'
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AlertMessage from '../common/AlertMessage';
import Row from './RowTableTask';

const BASE_URL = "http://localhost:8080/task-management/task";

export default function CollapsibleTable({ filterCriteria, filterValue }) {
    const [taskList, setTaskList] = useState([]);
    const [orderSelect, setOrderSelect] = useState('id');
    const [allTasks, setAllTasks] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('secondary');

    const { userId } = useContext(AuthContext);
    const navigate = useNavigate('');

    const getTaskList = async () => {
        try {
            if (!userId) navigate('/login');

            const response = await axios.get(`${BASE_URL}/all`, {
                withCredentials: true,
                timeout: 10000
            });
            setTaskList(response.data);
            setAllTasks(response.data);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getTaskList();
    }, [])

    //tablodaki başlıklara göre sıralama yapıyoruz
    const sortedTasks = useMemo(() => {
        return [...taskList].sort((a, b) =>
            typeof a[orderSelect] === "string"
                ? a[orderSelect].localeCompare(b[orderSelect])
                : a[orderSelect] - b[orderSelect]
        );
    }, [taskList, orderSelect]);

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

    //filtrelemeye göre task listesini güncelliyoruz
    useEffect(() => {
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

    const handleAlert = (message, type) => {
        setAlertMessage(message);
        setAlertType(type);
        setTimeout(() => {
            setAlertMessage('');
        }, 3000);
    };

    return (
        <TableContainer component={Paper} >
            <Table aria-label="collapsible table" sx={{ backgroundColor: '#fbf9f9' }} >
                <TableHead>
                    <TableRow className='order-table-row' onClick={(e) => setOrderSelect(e.target.dataset.param)}>
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
                    {sortedTasks.map((row) => (
                        <Row key={row.id} row={row} getTaskList={getTaskList} onAlert={handleAlert}>
                        </Row>
                    ))}
                </TableBody>
            </Table>
            <AlertMessage message={alertMessage} onClose={() => setAlertMessage("")} severity={alertType} />
        </TableContainer>
    );
}