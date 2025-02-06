"use client";

import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("userToken");
        if (storedUser) {
            setUser({ token: storedUser });
        }
    }, []);

    const loginUser = (token) => {
        localStorage.setItem("userToken", token);
        setUser({ token });
    };

    const logoutUser = () => {
        localStorage.removeItem("userToken");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};
