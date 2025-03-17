import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button, Stack, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import AlertMessage from '../common/AlertMessage';
import { getUsers } from '../Api/users';

const columns = [
    { id: 'id', label: 'id', minWidth: 20 },
    { id: 'firstName', label: 'First Name', minWidth: 120 },
    {
        id: 'lastName', label: 'Last Name',
        minWidth: 120, align: 'left',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'mailAdress', label: 'Mail Address',
        minWidth: 130, align: 'left',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'telNumber', label: 'Tel Number',
        minWidth: 90, align: 'left',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'role', label: 'Role',
        minWidth: 50, align: 'left',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'position', label: 'Position',
        minWidth: 120, align: 'left',
        format: (value) => value.toFixed(2),
    },
];

function StickyHeadTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = useState([]);
    const [editingRow, setEditingRow] = useState(null);
    const [editingColumn, setEditingColumn] = useState(null);
    const [editedValue, setEditedValue] = useState(null);
    const [editedCells, setEditedCells] = useState({});
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("secondary")

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const fetchUsers = async () => {
        try {
            const sortedUserList = await getUsers();
            const userList = sortedUserList.map((user) => (
                {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    mailAdress: user.mailAdress,
                    telNumber: user.telNumber,
                    role: user.role,
                    position: user.position
                }
            ));
            setRows(userList);

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    const handleEdit = ((row, column) => {
        setEditingRow(row.id);
        setEditingColumn(column.id)
        setEditedValue(row[column.id]);
    })

    const handleSave = ((id, columnId) => {
        setRows(rows.map(row => row.id === id ? { ...row, [editingColumn]: editedValue } : row));
        setEditingRow(null);
        setEditingColumn(null);
        setEditedCells(prev => ({
            ...prev,
            [id]: { ...(prev[id] || {}), [columnId]: editedValue }
        }));

    })

    const handleValueChange = (e, row, column) => {
        let newValue = e.target.value;

        if (column.id === 'telNo') {
            if (!/^\d*$/.test(newValue)) {
                return;
            }
            if (newValue.length > 11) {
                return;
            }
        } else if (column.id === 'firstName' || column.id === 'lastName' || column.id === 'role') {
            if (!/^[a-zA-Z\s]*$/.test(newValue)) {
                return; // Eğer harf ve boşluk dışında bir şey girildiyse, değişikliği engelle
            }
        }
        setEditedValue(newValue);
    };

    const getColor = (rowId, columnId) => {
        return editedCells[rowId]?.[columnId] ? 'green' : 'black';
    };

    const saveAllChanges = async () => {
        const updatedData = Object.entries(editedCells).map(([id, changes]) => ({
            id: Number(id),
            ...changes
        }));

        try {
            await axios.put('http://localhost:8080/user-management/user/update',
                updatedData,
                {
                    withCredentials: true,
                    timeout: 30000
                }
            );
            window.scrollTo({ top: 0, behavior: "smooth" });

            setAlertMessage("The User updated successfully.")
            setAlertType("success");
            setTimeout(() => {
                setAlertMessage("");
            }, 3000);
            setEditedCells({});
        } catch (error) {
            console.error('Error updating users:', error);
            setAlertMessage("An error occured while updating user.")
            setAlertType("error");
            setTimeout(() => {
                setAlertMessage("");
            }, 3000);
        }
    };

    const deleteAllChanges = () => {
        setEditedCells({});
    }

    return (
        <>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell sx={{ color: getColor(row.id, column.id) }} key={column.id} align={column.align} onClick={() => handleEdit(row, column)} >
                                                        {editingRow === row.id && editingColumn === column.id ? (
                                                            <TextField
                                                                sx={{ padding: 0, height: "auto", margin: 0 }}
                                                                size="small"
                                                                margin='none'
                                                                padding='0'
                                                                value={editedValue}
                                                                autoFocus
                                                                onChange={(e) => handleValueChange(e, row, column)}
                                                                onBlur={() => handleSave(row.id, column.id)}
                                                                onKeyDown={(e) => {
                                                                    if (e.key === 'Enter') {
                                                                        handleSave(row.id, column.id)
                                                                    }
                                                                }}
                                                                inputProps={{
                                                                    style: { padding: 4 },
                                                                }}
                                                            />
                                                        ) : (
                                                            <>
                                                                {
                                                                    column.format && typeof value === 'number'
                                                                        ? column.format(value)
                                                                        : value
                                                                }
                                                            </>
                                                        )}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <Stack direction="row" spacing={2} sx={{ marginTop: 2 }} justifyContent={'flex-end'}>
                <Button variant="contained" color='error' size='small' onClick={() => deleteAllChanges()}>Delete <DeleteIcon style={{ 'marginLeft': '4px', 'fontSize': '16px' }} /> </Button>
                <Button variant="contained" color='success' size='small' onClick={() => saveAllChanges()}> Save <SaveIcon style={{ 'marginLeft': '4px', 'fontSize': '16px' }} /></Button>
            </Stack>
            <AlertMessage message={alertMessage} onClose={() => setAlertMessage("")} severity={alertType} />
        </>
    );
}

function UserEditForm() {
    return (
        <div><StickyHeadTable /> </div>
    )
}

export default UserEditForm