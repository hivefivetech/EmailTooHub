import apiClient from "./apiClient";

// Convert HTML to JPG
export const convertHtmlToJpg = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post("/conversion/html-to-jpg", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob",
    });

    return new Blob([response.data], { type: "image/jpeg" });
};

// Convert HTML to PNG
export const convertHtmlToPng = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post("/conversion/html-to-png", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob",
    });

    return new Blob([response.data], { type: "image/png" });
};

// Convert HTML to PDF
export const convertHtmlToPdf = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post("/conversion/html-to-pdf", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob",
    });

    return new Blob([response.data], { type: "application/pdf" });
};

// Convert HTML to TXT
export const convertHtmlToTxt = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post("/conversion/html-to-txt", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob",
    });

    return new Blob([response.data], { type: "text/plain" });
};

// Convert HTML to DOCX
export const convertHtmlToDocx = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post("/conversion/html-to-docx", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob",
    });

    return new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
};

// Convert HTML to WebP
export const convertHtmlToWebp = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post("/conversion/html-to-webp", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob",
    });

    return new Blob([response.data], { type: "image/webp" });
};
