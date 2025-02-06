import { useState } from "react";
import { login, signup, changePassword } from "../api/auth";

export const useAuth = () => {
    const [loading, setLoading] = useState(false);

    // Login User
    const handleLogin = async (credentials) => {
        setLoading(true);
        try {
            const response = await login(credentials);
            localStorage.setItem("userToken", response.data.token);
            return response.data;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Signup User
    const handleSignup = async (userData) => {
        setLoading(true);
        try {
            const response = await signup(userData);
            return response.data;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Change Password
    const handleChangePassword = async (id, oldPassword, newPassword) => {
        setLoading(true);
        try {
            const response = await changePassword({ id, oldPassword, newPassword });

            return {
                success: response.data?.message === "Password updated successfully!",
                message: response.data?.message || "Password update failed."
            };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || "Password update failed." };
        } finally {
            setLoading(false);
        }
    };

    return { handleLogin, handleSignup, handleChangePassword, loading };
};
