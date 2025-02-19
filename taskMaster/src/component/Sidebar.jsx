import React from 'react'
import { Box, List, ListItem, Divider, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const menuItems = [
    { icon: <HomeIcon sx={{ pr: '10px', color: 'black' }} />, text: 'Main Page' },
    { icon: <AssignmentIcon sx={{ pr: '10px', color: 'green' }} />, text: 'Tasks' },
    { icon: <AccountCircleIcon sx={{ pr: '10px', color: 'purple' }} />, text: 'My Info' },
    { icon: <SettingsIcon sx={{ pr: '10px', color: 'gray' }} />, text: 'Settings' },
];

const listItemStyles = {
    cursor: "pointer",
    ":hover": { backgroundColor: "#E0E0E0" },
    display: "flex",
    alignItems: "center"
}

function Sidebar() {

    return (
        <Box sx={{ width: 200, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <List sx={{ flexGrow: 1 }}>
                {menuItems.map((item, index) => (
                    <div key={index}>
                        <ListItem sx={listItemStyles}>
                            {item.icon} {item.text}
                        </ListItem>
                        {index !== menuItems.length - 1 && <Divider />}
                    </div>
                ))}
            </List>
            <Button
                variant="contained"
                sx={{ width: '100%', backgroundColor: '#1565c0', '&:hover': { backgroundColor: '#222DC9' }, cursor: 'pointer' }}
            >
                Çıkış Yap  <ExitToAppIcon sx={{ px: '4px' }} />
            </Button>
        </Box>
    );
}

export default Sidebar;