"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaUserCircle, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { IoTriangle } from "react-icons/io5";
import { useAuth } from "../hooks/useAuth";
import Swal from "sweetalert2";
import { useUser } from "../hooks/useUser";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { handleLogin } = useAuth();
    const { handleForgotPassword } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await handleLogin({ email, password });
            Swal.fire("Success", "Login successful!", "success");
            router.push("/dashboard");
        } catch (error) {
            Swal.fire("Error", error.response?.data?.message || "Login failed!", "error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPasswordClick = async () => {
        // console.log("🔹 Forgot Password Modal Opened");
        const { value: email } = await Swal.fire({
            title: "Forgot Password?",
            input: "email",
            inputPlaceholder: "Enter your email",
            confirmButtonText: "Submit",
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) return "Email is required!";
            },
        });
    
        if (email) {
            // console.log("🔹 Forgot Password Submitted for Email:", email);
            await handleForgotPassword(email);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 relative">
            {/* Background Glow Effect */}
            <motion.div
                className="absolute top-16 left-16 w-24 h-24 bg-red-400 opacity-90 rounded-full blur-3xl"
                animate={{ x: [0, 40, 0], y: [0, 40, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute top-16 right-16 w-8 h-8"
                animate={{
                    x: [0, -60, 0],
                    y: [0, 80, 0],
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
                className="absolute bottom-16 right-16 w-32 h-32 bg-red-500 opacity-90 rounded-full blur-3xl"
                animate={{ x: [0, -40, 0], y: [0, -40, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-16 left-16 w-8 h-8"
                animate={{
                    x: [0, 60, 0],
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

            {/* Glassmorphic Login Card */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white/30 backdrop-blur-lg p-8 rounded-xl shadow-2xl max-w-sm w-full border border-white/40"
            >
                <h2 className="text-gray-900 text-2xl font-bold text-center mb-6">Welcome Back</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email Field */}
                    <div className="flex items-center bg-white/20 backdrop-blur-md rounded-lg px-4 py-2 text-gray-700 border border-white/40 focus-within:ring-2 focus-within:ring-red-500 duration-300">
                        <FaUserCircle className="text-gray-700 text-lg mr-3" />
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

                    {/* Login Button with Loader */}
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
                            "Login"
                        )}
                    </motion.button>
                </form>

                {/* Forgot Password */}
                <p
                    onClick={handleForgotPasswordClick}
                    className="text-sm text-red-600 duration-300 hover:font-semibold block text-right mt-3 cursor-pointer"
                >
                    Forgot Password?
                </p>

                {/* Signup Link */}
                <p className="text-gray-800 text-sm mt-4 text-center">
                    Don't have an account?{" "}
                    <a href="/signup" className="font-semibold text-red-600 hover:text-red-700 duration-300 hover:font-bold">
                        Sign up
                    </a>
                </p>

                {/* Go Back to Home */}
                <p className="text-gray-800 bg-red-100 rounded-lg py-2 text-sm mt-4 text-center">
                    <a href="/" className="font-semibold duration-300 hover:font-bold text-gray-600 hover:text-gray-800">
                        Go Back to Home
                    </a>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
