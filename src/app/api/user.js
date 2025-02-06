import apiClient from "./apiClient";

// Get All Users
export const getAllUsers = async () => {
    return await apiClient.get("/profiles/all");
};

// Get User by ID
export const getUserById = async (id) => {
    return await apiClient.get(`/profiles/${id}`);
};

// Update Name
export const updateName = async (id, name) => {
    return await apiClient.put(`/profiles/${id}`, { name });
};

// Update User Type
export const updateType = async (id, type) => {
    return await apiClient.put(`/profiles/${id}`, { type });
};

// Update Password
export const updatePassword = async (id, oldPassword, newPassword) => {
    return await apiClient.post(`/auth/change-password`, {
        id,
        oldPassword,
        newPassword,
    });
};

// Delete User
export const deleteUser = async (id) => {
    return await apiClient.delete(`/profiles/${id}`);
};

// Forgot Password
export const forgotPassword = async (email) => {
    return await apiClient.post("/forgot-password", { email });
};

// Reset Password
export const resetPassword = async (token, newPassword) => {
    // console.log("🔹 API Call: Reset Password with Token:", token, "New Password:", newPassword);
    return await apiClient.post(`/reset-password/${token}`, { newPassword });
};