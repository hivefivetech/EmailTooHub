import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3359/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Attach token if user is logged in
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("userToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// apiClient.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response?.status === 401) {
//             localStorage.removeItem("userToken");
//             window.location.href = "/login";
//         }
//         return Promise.reject(error);
//     }
// );

export default apiClient;
