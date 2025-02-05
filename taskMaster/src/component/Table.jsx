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

function createData(id, title, createdDate, deadline, status, user, projectId, details) {
    return {
        id,
        title,
        createdDate,
        deadline,
        status,
        user,
        projectId,
        details,
    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
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
                <TableCell sx={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.title}</TableCell>
                <TableCell sx={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.createdDate}</TableCell>
                <TableCell sx={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.deadline}</TableCell>
                <TableCell sx={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.status}</TableCell>
                <TableCell sx={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.user}</TableCell>
                <TableCell sx={{ maxWidth: 50, overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.projectId}</TableCell>

            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
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
                                    <TableRow key={row.details.projectTitle}>
                                        <TableCell sx={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.details.projectTitle}</TableCell>
                                        <TableCell sx={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.details.description}</TableCell>
                                        <TableCell sx={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.details.assignedDate}</TableCell>
                                        <TableCell sx={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.details.completionDate}</TableCell>
                                        <TableCell sx={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.details.userMail}</TableCell>
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

Row.propTypes = {
    row: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        createdDate: PropTypes.string.isRequired,
        deadline: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        user: PropTypes.string.isRequired,
        projectId: PropTypes.string.isRequired,
        details: PropTypes.shape({
            projectTitle: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            assignedDate: PropTypes.string.isRequired,
            completionDate: PropTypes.string.isRequired,
            userMail: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};

const rows = [
    createData('1', 'Task 1', '2025-01-01', '2025-01-12', 'In Progress', 'User A', 'P1', {
        projectTitle: 'Project 1',
        description: 'Description for task 1 asdsad a sdas dasd as d asdd as asdda sd as',
        assignedDate: '2025-01-02',
        completionDate: '2025-01-10',
        userMail: 'userA@example.com'
    }),
    createData('2', 'Task 2', '2025-01-05', '2025-01-20', 'Completed', 'User B', 'P2', {
        projectTitle: 'Project 2',
        description: 'Description for task 2',
        assignedDate: '2025-01-06',
        completionDate: '2025-01-15',
        userMail: 'userB@example.com'
    }),
    createData('3', 'Task 3', '2025-01-08', '2025-01-22', 'In Progress', 'User C', 'P3', {
        projectTitle: 'Project 3',
        description: 'Description for task 3',
        assignedDate: '2025-01-09',
        completionDate: '2025-01-18',
        userMail: 'userC@example.com'
    }),
];

export default function CollapsibleTable() {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
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
                    {rows.map((row) => (
                        <Row key={row.id} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
