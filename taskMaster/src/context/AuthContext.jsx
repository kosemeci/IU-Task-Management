import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [mail, setMail] = useState(null);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    // useEffect(() => {
    //     const storedUser = JSON.parse(localStorage.getItem("user"));
    //     if (storedUser) {
    //         setUser(storedUser);  // Mail adresini al
    //     }
    // }, []);

    const login = ({ email, userId }) => {
        setMail(email);  // Sadece maili set et
        setUserId(userId);  // userId'yi sadece state'te tut
        localStorage.setItem("user", JSON.stringify(email));  // Maili localStorage'a kaydet
    };

    const logout = () => {
        setMail(null);
        setUserId(null);  // userId'yi de sıfırla
        localStorage.removeItem("user");  // Maili kaldır
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ mail, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
