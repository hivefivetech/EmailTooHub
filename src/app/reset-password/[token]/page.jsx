"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useUser } from "../../hooks/useUser";

const ResetPasswordPage = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { handleResetPassword } = useUser();
    const { token } = useParams();
    const router = useRouter();
    // const token = searchParams.get("token");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            Swal.fire("Error", "Invalid or expired token", "error");
            return;
        }

        if (newPassword.length < 8 || newPassword.length > 15) {
            Swal.fire("Error", "Password must be between 8 to 15 characters!", "error");
            return;
        }

        if (newPassword !== confirmPassword) {
            Swal.fire("Error", "Passwords do not match!", "error");
            return;
        }

        setLoading(true);
        try {
            await handleResetPassword(token, newPassword);
            Swal.fire("Success", "Password reset successfully!", "success").then(() => {
                router.push("/login");
            });
        } catch (error) {
            console.error("❌ Reset Password Error:", error.response?.data || error.message);
            Swal.fire("Error", error.response?.data?.message || "Failed to reset password", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white/30 backdrop-blur-lg p-8 rounded-xl shadow-2xl max-w-sm w-full border border-white/40"
            >
                <h2 className="text-gray-900 text-2xl font-bold text-center mb-6">Reset Password</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* New Password */}
                    <div className="flex items-center bg-white/20 rounded-lg px-4 py-2 text-gray-700 border border-white/40 relative">
                        <FaLock className="text-gray-700 text-lg mr-3" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter new password"
                            className="bg-transparent focus:outline-none text-gray-800 placeholder-gray-600 w-full"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 text-gray-600"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    {/* Confirm Password */}
                    <div className="flex items-center bg-white/20 rounded-lg px-4 py-2 text-gray-700 border border-white/40 relative">
                        <FaLock className="text-gray-700 text-lg mr-3" />
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm new password"
                            className="bg-transparent focus:outline-none text-gray-800 placeholder-gray-600 w-full"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 text-gray-600"
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    {/* Reset Password Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-600 text-white py-2 font-semibold rounded-lg transition-all duration-300 hover:bg-red-700 shadow-md flex items-center justify-center"
                    >
                        {loading ? (
                            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
                        ) : (
                            "Reset Password"
                        )}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default ResetPasswordPage;
