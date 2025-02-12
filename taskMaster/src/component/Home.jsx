import React, { useContext } from 'react';
import '../css/home.css'
import { AuthContext } from '../context/AuthContext';

function Home() {
    const { user, logout } = useContext(AuthContext);
    return (
        <div>
            <h1>Hoş geldin, {user?.email}!</h1>
            <button onClick={logout}>Çıkış Yap</button>
        </div>
    );
}

export default Home;
