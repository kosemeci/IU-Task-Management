import { CircularProgress, LinearProgress, Box } from "@mui/material";

const LoadingSpinner = () => (
    // <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
    //     <CircularProgress size={50} />
    // </Box>
    <Box sx={{ width: '100%' }}>
        <LinearProgress />
    </Box>
);
export default LoadingSpinner;
