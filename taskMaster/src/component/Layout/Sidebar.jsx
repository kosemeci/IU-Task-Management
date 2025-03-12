import React from 'react'
import { Box, List, ListItem, Divider, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';

const menuItems = [
    { icon: <HomeIcon sx={{ pr: '10px', color: 'black' }} />, text: 'Main Page', nav: "/" },
    { icon: <AssignmentIcon sx={{ pr: '10px', color: 'green' }} />, text: 'Tasks', nav: "/task" },
    { icon: <AccountCircleIcon sx={{ pr: '10px', color: 'purple' }} />, text: 'My Info', nav: "/user" },
    { icon: <SettingsIcon sx={{ pr: '10px', color: 'gray' }} />, text: 'Settings', nav: "/settings" },
];

const listItemStyles = {
    cursor: "pointer",
    ":hover": { backgroundColor: "#E0E0E0" },
    display: "flex",
    alignItems: "center"
}

function Sidebar({ open, toggleMenu }) {
    const { mail, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    return (
        <Drawer anchor='right' open={open} onClose={() => toggleMenu(false)} >
            <Box sx={{ width: 200, display: 'flex', flexDirection: 'column', height: '100%' }}>
                <List sx={{ flexGrow: 1 }}>
                    {menuItems.map((item, index) => (
                        <div key={index}>
                            <ListItem
                                sx={listItemStyles}
                                onClick={() => {
                                    toggleMenu(false);
                                    navigate(item.nav);
                                }}>
                                {item.icon} {item.text}
                            </ListItem>
                            {index !== menuItems.length - 1 && <Divider />}
                        </div>
                    ))}
                </List>
                {mail ? (
                    <Button
                        variant="contained"
                        sx={{ width: '100%', backgroundColor: '#E6B54C', '&:hover': { backgroundColor: '#e6b5a9' }, cursor: 'pointer' }}
                        onClick={() => {
                            toggleMenu(false);
                            logout()
                        }}
                    >
                        Logout  <ExitToAppIcon sx={{ px: '4px' }} />
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        sx={{ width: '100%', backgroundColor: '#a22dc0', '&:hover': { backgroundColor: '#a94DC9' }, cursor: 'pointer' }}
                        onClick={() => {
                            toggleMenu(false);
                            navigate('/login')
                        }}
                    >
                        Login   <ExitToAppIcon sx={{ px: '4px' }} />
                    </Button>
                )}
            </Box>
        </Drawer>
    );
}

export default Sidebar;