import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [mail, setMail] = useState(null);
    const [userId, setUserId] = useState(null);
    const [role, setRole] = useState(null);
    const navigate = useNavigate();

    // useEffect(() => {
    //     const storedUser = JSON.parse(localStorage.getItem("user"));
    //     if (storedUser) {
    //         setUser(storedUser);  // Mail adresini al
    //     }
    // }, []);

    useEffect(() => {
        if (role == 'ADMIN') navigate('/admin');
        else navigate('/')
    }, [userId, role])

    const login = ({ email, userId, role }) => {
        setMail(email);  // Sadece maili set et
        setUserId(userId);  // userId'yi sadece state'te tut
        setRole(role);
    };

    const logout = () => {
        setMail(null);
        setUserId(null);  // userId'yi de sıfırla
        setRole(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ mail, userId, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
