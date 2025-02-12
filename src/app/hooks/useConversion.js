import { useState } from "react";
import { convertHtmlToJpg, convertHtmlToPng, convertHtmlToPdf, convertHtmlToTxt, convertHtmlToDocx, convertHtmlToWebp } from "../api/conversion";

export const useConversion = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleConversion = async (file, format) => {
        setLoading(true);
        setError("");

        try {
            let convertedBlob;

            if (format === "JPG") {
                convertedBlob = await convertHtmlToJpg(file);
            } else if (format === "PNG") {
                convertedBlob = await convertHtmlToPng(file);
            } else if (format === "PDF") {
                convertedBlob = await convertHtmlToPdf(file);
            } else if (format === "TXT") {
                convertedBlob = await convertHtmlToTxt(file);
            } else if (format === "DOCX") {
                convertedBlob = await convertHtmlToDocx(file);
            } else if (format === "WEBP") {
                convertedBlob = await convertHtmlToWebp(file);
            } else {
                throw new Error("Unsupported format.");
            }

            return URL.createObjectURL(convertedBlob);
        } catch (err) {
            setError(err.message || "Conversion failed.");
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { handleConversion, loading, error };
};
