import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import '../../css/table.css'
import { useEffect, useState } from 'react';
import axios from 'axios'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Divider, Input } from '@mui/material';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { getUsers } from '../Api/users'

const BASE_URL = "http://localhost:8080/task-management/task";
function Row(props) {
    const { row, getTaskList, onAlert } = props;
    const { mail, role } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(new Date().toISOString().split('T')[0]);
    const [selectedUser, setSelectedUser] = useState("");
    const [users, setUser] = useState([]);

    const modalStyle = {
        position: 'absolute',
        top: '25%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "max-content",
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2
    };
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const [openAssignTaskModal, setOpenAssignTaskModal] = useState(false);
    const handleOpenAssignTaskModal = () => setOpenAssignTaskModal(true);
    const handleCloseAssignTaskModal = () => setOpenAssignTaskModal(false);

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
                        <button className="task-button" onClick={handleOpenModal}>Extend Time</button>
                        <button className="task-button" onClick={() => cancelTask(taskId)}>Cancel </button>
                        <button className="task-button" onClick={() => deleteTask(taskId)}>Delete </button>
                    </>
                );
            case 'COMPLETED':
                return <p>*Görev başarıyla sonuçlandı.</p>
            case 'FAILED':
                return (
                    <>
                        <button className="task-button" onClick={handleOpenModal}>Extend Time</button>
                        <button className="task-button" onClick={() => deleteTask(taskId)}>Delete</button>
                    </>
                )
            case 'CANCELLED':
                return (
                    <>
                        <p>*Görev iptal edildi.</p>
                        <button className="task-button" onClick={() => deleteTask(taskId)}>Delete</button>
                    </>
                )
            default:
                return (
                    <>
                        <button className="task-button" onClick={handleOpenModal}>Extend Time</button>
                        <button className="task-button" onClick={handleOpenAssignTaskModal}>Assign Task</button>
                        <button className="task-button" onClick={() => cancelTask(taskId)}>Cancel</button>
                        <button className="task-button" onClick={() => deleteTask(taskId)}>Delete</button>
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

    const deleteTask = async (taskId) => {
        try {
            window.scrollTo({ top: 0, behavior: "smooth" });
            await axios.delete(`${BASE_URL}/delete/${taskId}`, {
                withCredentials: true,
                timeout: 20000
            })
            getTaskList();
            onAlert('The Task has been deleted successfully.', 'success');
        } catch (error) {
            onAlert('An error occured while deleting the task.', 'error');
        }
    }

    const cancelTask = async (taskId) => {
        try {
            await axios.put(`${BASE_URL}/cancel?taskId=${taskId}`,
                {},
                {
                    withCredentials: true,
                    timeout: 20000
                })
            getTaskList();
            onAlert('The Task has been canceled successfully.', 'success');
        } catch (error) {
            onAlert('An error occured while cancelling the task.', 'error');
        }
    }

    const extendTimeTask = async (taskId) => {
        handleCloseModal();
        try {
            await axios.put(`${BASE_URL}/update/deadline?taskId=${taskId}&newDate=${value}`,
                {},
                { withCredentials: true }
            )
            getTaskList();
            onAlert('The Task has been update deadline successfully.', 'success');
        } catch (error) {
            onAlert('An error occured while updating deadline the task.', 'error');
        }
    }

    const assignTask = async (taskId, selectedUserId) => {
        handleCloseAssignTaskModal();
        try {
            await axios.put(`${BASE_URL}/assign?taskId=${taskId}&userId=${selectedUserId}`,
                {},
                { withCredentials: true }
            )
            getTaskList();
            onAlert('The Task has been assigned user successfully.', 'success');
        } catch (error) {
            onAlert('An error occured while assigning user the task.', 'error');
        }
    }

    const fetchUsers = async () => {
        if (role == 'ADMIN') {
            try {
                const response = await getUsers();
                const userList = response.map((res) => ({
                    id: res.id,
                    name: res.firstName + " " + res.lastName
                }))
                setUser(userList);
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    return (
        <>
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
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <input
                        type="date"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="form-input"
                    />
                    <Button size='small' variant='contained' onClick={() => extendTimeTask(row.id)} >Save</Button>
                </Box>
            </Modal>
            <Modal
                open={openAssignTaskModal}
                onClose={handleCloseAssignTaskModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <select
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                        className="form-input"
                    >
                        <option value="">Select a user</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                    <Button size='small' variant='contained' onClick={() => assignTask(row.id, selectedUser)}>Save</Button>
                </Box>
            </Modal>
        </>
    );
}

export default Row;