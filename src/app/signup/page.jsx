"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaUserCircle, FaLock, FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa";
import { IoTriangle } from "react-icons/io5";
import { useAuth } from "../hooks/useAuth";
import Swal from "sweetalert2";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const { handleSignup: signupUser, loading } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password.length < 8 || password.length > 15) {
            Swal.fire("Error", "Password must be between 8 to 15 characters!", "error");
            return;
        }

        if (password !== confirmPassword) {
            Swal.fire("Error", "Passwords do not match!", "error");
            return;
        }

        setIsLoading(true);
        try {
            await signupUser({ name: username, email, password });
            Swal.fire("Success", "Signup successful! Please log in.", "success");
            router.push("/login");
        } catch (error) {
            Swal.fire("Error", error.response?.data?.message || "Signup failed!", "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 relative">
            {/* Background Glow Effect */}
            <motion.div
                className="absolute top-16 right-16 w-24 h-24 bg-red-400 opacity-90 rounded-full blur-3xl"
                animate={{ x: [0, 40, 0], y: [0, 40, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute top-16 left-16 w-8 h-8"
                animate={{
                    x: [0, 40, 0],
                    y: [0, 40, 0],
                    rotate: [0, 360]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 8,
                    ease: "easeInOut"
                }}
            >
                <IoTriangle className="text-accent" />
            </motion.div>
            <motion.div
                className="absolute bottom-16 left-16 w-32 h-32 bg-red-500 opacity-90 rounded-full blur-3xl"
                animate={{ x: [0, -40, 0], y: [0, -40, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-16 right-16 w-8 h-8"
                animate={{
                    x: [0, -60, 0],
                    y: [0, -80, 0],
                    rotate: [0, 360]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 8,
                    ease: "easeInOut"
                }}
            >
                <IoTriangle className="text-accent" />
            </motion.div>

            {/* Glassmorphic Signup Card */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white/30 backdrop-blur-lg p-8 rounded-xl shadow-2xl max-w-sm w-full border border-white/40"
            >
                <h2 className="text-gray-900 text-2xl font-bold text-center mb-6">Create an Account</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Username Field */}
                    <div className="flex items-center bg-white/20 backdrop-blur-md rounded-lg px-4 py-2 text-gray-700 border border-white/40 focus-within:ring-2 focus-within:ring-red-500 duration-300">
                        <FaUserCircle className="text-gray-700 text-lg mr-3" />
                        <input
                            type="text"
                            placeholder="Enter your username"
                            className="bg-transparent focus:outline-none text-gray-800 placeholder-gray-600 w-full"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    {/* Email Field */}
                    <div className="flex items-center bg-white/20 backdrop-blur-md rounded-lg px-4 py-2 text-gray-700 border border-white/40 focus-within:ring-2 focus-within:ring-red-500 duration-300">
                        <FaEnvelope className="text-gray-700 text-lg mr-3" />
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="bg-transparent focus:outline-none text-gray-800 placeholder-gray-600 w-full"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="flex items-center bg-white/20 backdrop-blur-md rounded-lg px-4 py-2 text-gray-700 border border-white/40 focus-within:ring-2 focus-within:ring-red-500 duration-300 relative">
                        <FaLock className="text-gray-700 text-lg mr-3" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="bg-transparent focus:outline-none text-gray-800 placeholder-gray-600 w-full"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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

                    {/* Confirm Password Field */}
                    <div className="flex items-center bg-white/20 backdrop-blur-md rounded-lg px-4 py-2 text-gray-700 border border-white/40 focus-within:ring-2 focus-within:ring-red-500 duration-300 relative">
                        <FaLock className="text-gray-700 text-lg mr-3" />
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
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

                    {/* Signup Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-red-600 text-white py-2 font-semibold rounded-lg transition-all duration-300 hover:bg-red-700 shadow-md flex items-center justify-center"
                    >
                        {isLoading ? (
                            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
                        ) : (
                            "Sign Up"
                        )}
                    </motion.button>
                </form>

                {/* Login Link */}
                <p className="text-gray-800 text-sm mt-4 text-center">
                    Already have an account?{" "}
                    <a href="/login" className="font-semibold text-red-600 hover:text-red-700 duration-300 hover:font-bold">
                        Login
                    </a>
                </p>

                <p className="text-gray-800 bg-red-100 rounded-lg py-2 text-sm mt-4 text-center">
                    <a href="/" className="font-semibold duration-300 hover:font-bold text-gray-600 hover:text-gray-800">
                        Go Back to Home
                    </a>
                </p>
            </motion.div>
        </div>
    );
};

export default Signup;
