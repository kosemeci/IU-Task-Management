import React from 'react'
import '../css/header.css'
import CasesOutlinedIcon from '@mui/icons-material/CasesOutlined'; import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useNavigate } from 'react-router-dom';
function Header() {

    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    }

    return (
        <>
            <div className='header'>
                <h2 className='header-title'>Task Manager</h2>
                <div className='header-body'>
                    <CasesOutlinedIcon className='header-icon'
                        onClick={() => handleNavigate('/')} />
                    <NotificationsNoneIcon className='header-icon' onClick={() => handleNavigate('/notification')} />
                    <PermIdentityIcon className='header-icon' onClick={() => handleNavigate('/user')} />
                    <MenuOutlinedIcon className='header-icon' />
                </div>
            </div>
        </>
    )
}
export default Header