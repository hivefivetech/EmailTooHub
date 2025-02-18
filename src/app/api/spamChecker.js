import apiClient from "./apiClient";

// Spam Checker API
export const analyzeSpam = async (emailData) => {
    return await apiClient.post("/spam/analyze", emailData);
};
