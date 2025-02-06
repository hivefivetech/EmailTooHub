import { useState } from "react";
import {
    getAllUsers,
    getUserById,
    updateName,
    deleteUser,
    updateType,
    forgotPassword,
    resetPassword
} from "../api/user";
import Swal from "sweetalert2";

export const useUser = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Get All Users
    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await getAllUsers();
            setUsers(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Get User by ID
    const fetchUserById = async (id) => {
        try {
            setLoading(true);
            const response = await getUserById(id);
            setUser(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Update Name
    const handleUpdateName = async (id, name) => {
        try {
            setLoading(true);
            await updateName(id, name);
            await fetchUserById(id);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Update User Type
    const handleUpdateType = async (id, type) => {
        try {
            setLoading(true);
            await updateType(id, type);
            fetchUsers();
            Swal.fire("Success", "User type updated successfully!", "success");
        } catch (err) {
            Swal.fire("Error", err.message || "Failed to update user type", "error");
        } finally {
            setLoading(false);
        }
    };

    // Delete User
    const handleDeleteUser = async (id) => {
        try {
            setLoading(true);
            await deleteUser(id);
            fetchUsers();
            Swal.fire("Success", "User deleted successfully!", "success");
        } catch (err) {
            Swal.fire("Error", err.message || "Failed to delete user", "error");
        } finally {
            setLoading(false);
        }
    };

    // Forgot Password
    const handleForgotPassword = async (email) => {
        try {
            // console.log("🔹 Forgot Password Request Sent for Email:", email);
            setLoading(true);
            const response = await forgotPassword(email);
            // console.log("✅ Forgot Password Response:", response.data);
            Swal.fire("Success", response.data.message, "success");
        } catch (err) {
            console.error("❌ Forgot Password Error:", err.response?.data || err.message);
            Swal.fire("Error", err.response?.data?.message || "Failed to send reset email", "error");
        } finally {
            setLoading(false);
        }
    };

    // Reset Password
    const handleResetPassword = async (token, newPassword) => {
        try {
            if (!token) {
                // console.error("❌ Reset Password Error: Token is missing");
                Swal.fire("Error", "Invalid or expired token", "error");
                return;
            }

            setLoading(true);
            // console.log("🔹 Reset Password Request Sent:", { token, newPassword });

            const response = await resetPassword(token, newPassword);

            // console.log("✅ Reset Password Response:", response.data);
            Swal.fire("Success", response.data.message, "success");
        } catch (err) {
            // console.error("❌ Reset Password Error:", err.response?.data || err.message);
            Swal.fire("Error", err.response?.data?.message || "Failed to reset password", "error");
        } finally {
            setLoading(false);
        }
    };

    return {
        users,
        user,
        loading,
        error,
        fetchUsers,
        fetchUserById,
        handleUpdateName,
        handleDeleteUser,
        handleUpdateType,
        handleForgotPassword,
        handleResetPassword,
    };
};
