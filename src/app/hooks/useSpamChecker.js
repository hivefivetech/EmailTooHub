import { useState } from "react";
import { analyzeSpam } from "../api/spamChecker";

export const useSpamChecker = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const checkSpam = async (subject, body) => {
        setLoading(true);
        setError(null);
        setResult(null);
        try {
            const response = await analyzeSpam({ subject, body });
            setResult(response.data.analysis);
        } catch (error) {
            setError(error.response?.data?.error || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return { checkSpam, result, loading, error };
};
