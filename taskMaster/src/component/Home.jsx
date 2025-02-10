import React, { useContext } from 'react';
import '../css/home.css'
import { AuthContext } from '../context/AuthContext';

function Home() {
    const { user, token, logout } = useContext(AuthContext);
    return (
        <div>
            <h1>Hoş geldin, {user?.email}!</h1>
            <p>Token: {token}</p>
            <button onClick={logout}>Çıkış Yap</button>
        </div>
    );
}

export default Home;
