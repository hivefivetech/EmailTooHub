"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaUserCircle, FaEnvelope, FaUserTag, FaEdit, FaLock, FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useUser } from "../hooks/useUser";
import { useAuth } from "../hooks/useAuth";
import Swal from "sweetalert2";
import { TbPremiumRights } from "react-icons/tb";

const Dashboard = () => {
    const router = useRouter();
    const [showOptionsModal, setShowOptionsModal] = useState(false);
    const [showNameModal, setShowNameModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [username, setUsername] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showOldPass, setShowOldPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [loadingName, setLoadingName] = useState(false);
    const [loadingPassword, setLoadingPassword] = useState(false);

    const { fetchUserById, fetchUsers, users, user, handleUpdateName, handleDeleteUser, handleUpdateType } = useUser();
    const { handleChangePassword } = useAuth();

    useEffect(() => {
        const storedUser = localStorage.getItem("userToken");
        if (!storedUser) {
            router.push("/");
        } else {
            const userId = JSON.parse(atob(storedUser.split(".")[1])).userId;
            fetchUserById(userId);
            fetchUsers();
        }
    }, []);

    const handleUpdateNameClick = async () => {
        setLoadingName(true);
        try {
            await handleUpdateName(user._id, username);
            Swal.fire("Success", "Name updated successfully!", "success");
            fetchUserById(user._id);
            setUsername("");
            setShowNameModal(false);
        } catch (error) {
            Swal.fire("Error", error.response?.data?.message || "Failed to update name", "error");
        } finally {
            setLoadingName(false);
        }
    };

    const handleUpdatePasswordClick = async () => {
        if (newPassword.length < 8 || newPassword.length > 15) {
            Swal.fire("Error", "Password must be between 8 to 15 characters!", "error");
            return;
        }

        if (newPassword !== confirmPassword) {
            Swal.fire("Error", "New passwords do not match!", "error");
            return;
        }

        setLoadingPassword(true);
        try {
            const response = await handleChangePassword(user._id, oldPassword, newPassword);
            Swal.fire("Success", response.message, "success");

            if (response.success) closeModals();
        } finally {
            setLoadingPassword(false);
        }
    };

    const handleDeleteUserClick = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await handleDeleteUser(user._id);
                localStorage.removeItem("userToken");
                router.push("/");
            }
        });
    };

    const handleUpdateTypeClick = async (id, currentType) => {
        const newType = currentType === "free" ? "paid" : "free";

        Swal.fire({
            title: `Change user type to ${newType}?`,
            text: "This action will update the user's access level.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, update to ${newType}`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                await handleUpdateType(id, newType);
                fetchUsers();
            }
        });
    };

    const closeModals = () => {
        setShowNameModal(false);
        setShowPasswordModal(false);
        setUsername("");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 relative">
            {/* Background Animation */}
            <motion.div
                className="absolute top-20 left-20 w-32 h-32 bg-red-400 opacity-50 rounded-full blur-3xl"
                animate={{ x: [0, 30, 0], y: [0, 30, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-20 right-20 w-32 h-32 bg-red-500 opacity-50 rounded-full blur-3xl"
                animate={{ x: [0, -30, 0], y: [0, -30, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            />

            {/* Dashboard Card */}
            <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white/30 backdrop-blur-lg p-8 rounded-xl shadow-2xl max-w-3xl w-full border border-white/40 mt-32 mb-16"
            >
                <div className="text-center">
                    <FaUserCircle className="text-gray-800 text-6xl mx-auto" />
                    <motion.h2 className="text-gray-900 text-2xl font-bold mt-4"
                        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Welcome, {user?.name}
                    </motion.h2>
                </div>

                {/* User Info Section */}
                <div className="mt-6 space-y-4">
                    <div className="flex items-center bg-white/20 backdrop-blur-md rounded-lg px-4 py-2 text-gray-800 border border-white/40">
                        <FaEnvelope className="text-gray-700 text-lg mr-3" />
                        <p className="text-gray-800">{user?.email}</p>
                    </div>
                    <div className="flex items-center bg-white/20 backdrop-blur-md rounded-lg px-4 py-2 text-gray-800 border border-white/40">
                        <FaUserTag className="text-gray-700 text-lg mr-3" />
                        <p className="text-gray-800">{user?.type}</p>
                    </div>
                </div>

                {/* Buttons Section */}
                <div className="mt-6 flex flex-col gap-3">
                    {user?.role !== "admin" && (
                        <>
                            {user?.type === "free" ? (
                                <>
                                    <p className="text-gray-800 text-sm mb-3">
                                        Upgrade to <span className="font-bold text-red-600">Premium</span> for <i className="font-semibold">unlimited access! </i>
                                        Contact us on Telegram <a href="https://t.me/ZplusMan" target="_blank" className="underline font-semibold">(ZplusMan)</a> to upgrade.
                                    </p>
                                    <motion.a href="https://t.me/ZplusMan" target="_blank"
                                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                        className="w-full bg-blue-600 text-white py-2 font-semibold rounded-lg transition-all duration-300 hover:bg-blue-700 shadow-md flex items-center justify-center gap-2"
                                    >
                                        <TbPremiumRights className="text-xl" />
                                        Upgrade to Premium
                                    </motion.a>
                                </>
                            ) : (
                                <p className="text-gray-800 text-sm mb-3 font-semibold">
                                    🎉 Congratulations! You are a <span className="text-green-600">Premium Member</span>.
                                </p>
                            )}

                            <motion.button
                                onClick={handleDeleteUserClick}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full bg-red-700 text-white py-2 font-semibold rounded-lg transition-all duration-300 hover:bg-red-800 shadow-md flex items-center justify-center gap-2"
                            >
                                <FaUser /> Delete Account
                            </motion.button>
                        </>
                    )}
                    <motion.button onClick={() => setShowOptionsModal(true)}
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        className="w-full bg-gray-700 text-white py-2 font-semibold rounded-lg transition-all duration-300 hover:bg-gray-900 shadow-md flex items-center justify-center gap-2"
                    >
                        <FaEdit className="text-xl" />
                        Update Account
                    </motion.button>
                </div>

                {/* Table */}
                {user?.role === "admin" && (
                    <div className="mt-8 bg-white rounded-lg shadow-md p-4 overflow-x-auto">
                        <h3 className="text-lg font-bold text-gray-900 mb-3">All Users</h3>
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 px-4 py-2">Name</th>
                                    <th className="border border-gray-300 px-4 py-2">Email</th>
                                    <th className="border border-gray-300 px-4 py-2">Role</th>
                                    <th className="border border-gray-300 px-4 py-2">Type</th>
                                    <th className="border border-gray-300 px-4 py-2">Purchased Date</th>  {/* New Column */}
                                    <th className="border border-gray-300 px-4 py-2">Expiry Date</th>     {/* New Column */}
                                    <th className="border border-gray-300 px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((userData) => (
                                    <tr key={userData._id} className="text-center">
                                        <td className="border border-gray-300 px-4 py-2">{userData.name}</td>
                                        <td className="border border-gray-300 px-4 py-2">{userData.email}</td>
                                        <td className="border border-gray-300 px-4 py-2">{userData.role}</td>
                                        <td className="border border-gray-300 px-4 py-2">{userData.type}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {userData.purchasedDate ? new Date(userData.purchasedDate).toLocaleDateString() : "N/A"}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {userData.expiryDate ? new Date(userData.expiryDate).toLocaleDateString() : "N/A"}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <motion.button
                                                onClick={() => handleUpdateTypeClick(userData._id, userData.type)}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className={`px-3 py-1 rounded-lg transition-all duration-300 ${userData.type === "free" ? "bg-green-600 hover:bg-green-700" : "bg-gray-600 hover:bg-gray-700"
                                                    } text-white`}
                                            >
                                                {userData.type === "free" ? "Upgrade to Premium" : "Downgrade to Free"}
                                            </motion.button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </motion.div>

            {/* Update Account Options Modal */}
            {showOptionsModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-900">Update Account</h2>
                            <button onClick={() => setShowOptionsModal(false)} className="text-gray-600 hover:text-gray-900">
                                <IoClose size={24} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <button onClick={() => { setShowOptionsModal(false); setShowNameModal(true); }}
                                className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-900 transition flex items-center justify-center gap-2"
                            >
                                <FaUser /> Update Name
                            </button>

                            <button onClick={() => { setShowOptionsModal(false); setShowPasswordModal(true); }}
                                className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-900 transition flex items-center justify-center gap-2"
                            >
                                <FaLock /> Update Password
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Update Name Modal */}
            {showNameModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-900">Update Name</h2>
                            <button
                                onClick={() => {
                                    setShowNameModal(false)
                                    closeModals()
                                }}
                                className="text-gray-600 hover:text-gray-900"
                            >
                                <IoClose size={24} />
                            </button>
                        </div>
                        <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2"
                            value={username} onChange={(e) => setUsername(e.target.value)}
                        />
                        <button onClick={handleUpdateNameClick} disabled={loadingName}
                            className={`w-full text-white py-2 mt-4 rounded-lg transition ${loadingName ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}`}
                        >
                            {loadingName ? <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white mx-auto"></div> : "Save Changes"}
                        </button>
                    </motion.div>
                </div>
            )}

            {/* Update Password Modal */}
            {showPasswordModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-900">Update Password</h2>
                            <button
                                onClick={() => {
                                    setShowPasswordModal(false)
                                    closeModals()
                                }}
                                className="text-gray-600 hover:text-gray-900"
                            >
                                <IoClose size={24} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Old Password Field */}
                            <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2 border border-gray-300 relative">
                                <FaLock className="text-gray-600 text-lg mr-3" />
                                <input
                                    type={showOldPass ? "text" : "password"}
                                    placeholder="Old Password"
                                    className="bg-transparent focus:outline-none text-gray-800 w-full"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                                <button onClick={() => setShowOldPass(!showOldPass)} className="absolute right-4">
                                    {showOldPass ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>

                            {/* New Password Field */}
                            <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2 border border-gray-300 relative">
                                <FaLock className="text-gray-600 text-lg mr-3" />
                                <input
                                    type={showNewPass ? "text" : "password"}
                                    placeholder="New Password"
                                    className="bg-transparent focus:outline-none text-gray-800 w-full"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <button onClick={() => setShowNewPass(!showNewPass)} className="absolute right-4">
                                    {showNewPass ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>

                            {/* Confirm Password Field */}
                            <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2 border border-gray-300 relative">
                                <FaLock className="text-gray-600 text-lg mr-3" />
                                <input
                                    type={showConfirmPass ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    className="bg-transparent focus:outline-none text-gray-800 w-full"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <button onClick={() => setShowConfirmPass(!showConfirmPass)} className="absolute right-4">
                                    {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>

                            <button onClick={handleUpdatePasswordClick} disabled={loadingPassword}
                                className={`w-full text-white py-2 rounded-lg transition ${loadingPassword ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}`}
                            >
                                {loadingPassword ? <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white mx-auto"></div> : "Save Changes"}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
