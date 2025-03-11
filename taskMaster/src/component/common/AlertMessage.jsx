import { IconButton, Stack } from '@mui/material';
import Alert from '@mui/material/Alert';
import CloseIcon from "@mui/icons-material/Close";
import LinearDeterminate from './LinearDeterminate';


const AlertMessage = ({ severity = "success", message, onClose }) => {
    if (!message) return null;
    return (
        <Stack sx={{
            width: "auto",
            position: "fixed",
            top: '15%',
            zIndex: 1000,
            minWidth: "400px",
            maxWidth: "70%",
        }} spacing={2}>
            <Alert
                severity={severity}
                action={
                    <IconButton aria-label="close" color="inherit" size="small" onClick={onClose}>
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
            >
                {message}
            </Alert>
            {/* <LinearDeterminate severity={severity} /> */}
        </Stack>
    );

}

export default AlertMessage;