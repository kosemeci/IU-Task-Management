import React from 'react'
import '../css/header.css'
import CasesOutlinedIcon from '@mui/icons-material/CasesOutlined'; import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
function Header() {

    const navigate = useNavigate();
    const { role } = useContext(AuthContext);

    const handleNavigate = (path) => {
        navigate(path);
    }

    const handleNavigateByRole = () => {
        if (role == 'ADMIN') { handleNavigate('/admin') }
        else { handleNavigate('/user') }
    }

    return (
        <>
            <div className='header'>
                <h2 className='header-title' onClick={() => handleNavigate('/')}>Task Manager</h2>
                <div className='header-body'>
                    <CasesOutlinedIcon className='header-icon'
                        onClick={() => handleNavigate('/tasks')} />
                    <NotificationsNoneIcon className='header-icon' onClick={() => handleNavigate('/notification')} />
                    <PermIdentityIcon className='header-icon' onClick={() => handleNavigateByRole()} />
                    <MenuOutlinedIcon className='header-icon' />
                </div>
            </div>
        </>
    )
}
export default Header