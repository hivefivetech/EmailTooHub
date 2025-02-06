import apiClient from "./apiClient";

// Signup API
export const signup = async (userData) => {
    return await apiClient.post("/auth/create-user", userData);
};

// Login API
export const login = async (credentials) => {
    return await apiClient.post("/auth/login", credentials);
};

// Change Password API
export const changePassword = async (data) => {
    return await apiClient.post("/auth/change-password", data);
};
