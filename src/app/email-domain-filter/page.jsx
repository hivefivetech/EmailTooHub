"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../../variants";
import Swal from "sweetalert2";
import { saveAs } from "file-saver";
import { TbMedicalCross } from "react-icons/tb";
import { useUser } from "../hooks/useUser";

const EmailDomainRemover = () => {
    const [uploadedEmails, setUploadedEmails] = useState([]);
    const [uniqueDomains, setUniqueDomains] = useState([]);
    const [selectedDomains, setSelectedDomains] = useState([]);
    const [filteredEmails, setFilteredEmails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("@");
    const [showDownload, setShowDownload] = useState(false);
    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState("");

    const { fetchUserById, user } = useUser();

    useEffect(() => {
        const storedUser = localStorage.getItem("userToken");
        if (storedUser) {
            const userId = JSON.parse(atob(storedUser.split(".")[1])).userId;
            fetchUserById(userId);
        }
    }, []);

    // Handle File Upload
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const isLoggedIn = localStorage.getItem("userToken");
        const isFreeUser = isLoggedIn && user?.type === "free";
        const isPaidUser = isLoggedIn && user?.type === "paid";

        const maxSize = !isLoggedIn ? 5 * 1024 * 1024
            : isFreeUser ? 10 * 1024 * 1024
                : null;

        if (maxSize && file.size > maxSize) {
            if (!isLoggedIn) {
                Swal.fire({
                    icon: "warning",
                    title: "📂 File Too Large!",
                    html: `
                            <div style="font-family: 'Arial', sans-serif; padding: 20px; background-color: #f8f9fa; border: 1px solid #ddd; border-radius: 8px;">
                                <p style="font-size: 18px; font-weight: 600; color: #212529; margin-bottom: 8px;">
                                    File Size Limit Exceeded
                                </p>
                                <p style="font-size: 15px; color: #495057; margin-bottom: 20px;">
                                    The file you've attempted to upload exceeds the <strong style="color: #dc3545;">5MB limit</strong>. Please log in now!
                                </p>
                                <a href="/login" 
                                    style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #ffffff;
                                    border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                                    Log In
                                </a>
                            </div>
                           `,
                    confirmButtonText: "OK",
                }).then(() => {
                    if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                    }
                });
                return;
            }

            if (isFreeUser) {
                Swal.fire({
                    icon: "warning",
                    title: "📂 Upgrade Required!",
                    html: `
                            <div style="font-family: 'Arial', sans-serif; padding: 20px; background-color: #f8f9fa; border: 1px solid #ddd; border-radius: 8px;">
                                <p style="font-size: 18px; font-weight: 600; color: #212529; margin-bottom: 8px;">
                                    File Size Limit Exceeded
                                </p>
                                <p style="font-size: 15px; color: #495057; margin-bottom: 20px;">
                                    The file you've attempted to upload exceeds the <strong style="color: #dc3545;">10MB limit</strong>. Please contact on telegram to upgrade for premium plan to get access to unlimited access.
                                </p>
                                <a href="https://t.me/ZplusMan" target="_blank" rel="noopener noreferrer"
                                    style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #ffffff;
                                    border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                                    📩 Contact on Telegram
                                </a>
                            </div>
                           `,
                    confirmButtonText: "OK",
                }).then(() => {
                    if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                    }
                });
                return;
            }
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result.split(/\r?\n/).map(email => email.trim()).filter(email => email);
            const emailSet = new Set(content);
            setUploadedEmails(Array.from(emailSet));
            setUniqueDomains([]); // Clear previous domains
            setSelectedDomains([]);
            setShowDownload(false);
        };
        setFileName(file.name);
        reader.readAsText(file);
    };

    const extractDomains = () => {
        const domains = Array.from(new Set(uploadedEmails.map(email => email.split("@")[1]?.toLowerCase()).filter(Boolean)));
        setUniqueDomains(domains);
    };

    // Handle Domain Selection
    const handleDomainSelection = (domain) => {
        setSelectedDomains((prev) =>
            prev.includes(domain) ? prev.filter(d => d !== domain) : [...prev, domain]
        );
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    // Remove Selected Domains
    const removeSelectedDomains = () => {
        setLoading(true);
        setTimeout(() => {
            const filtered = uploadedEmails.filter(email => !selectedDomains.includes(email.split("@")[1]?.toLowerCase()));
            setFilteredEmails(filtered);
            setLoading(false);
            setShowDownload(true);
        }, 1500);
    };

    // Download Filtered Emails
    const downloadFile = (format) => {
        let content = filteredEmails.map(email => email.replace(/"/g, '')).join("\n");

        const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        saveAs(blob, `filtered_emails.${format}`);
    };

    // Clear Everything
    const clearAll = () => {
        setUploadedEmails([]);
        setUniqueDomains([]);
        setSelectedDomains([]);
        setFilteredEmails([]);
        setFileName("");
        setShowDownload(false);
        fileInputRef.current.value = null;
    };

    return (
        <section className="flex items-center bg-gradient-to-br from-[#f9fafb] to-[#e5e7eb] py-16 min-h-screen relative">
            {/* Background Effects */}
            <motion.div
                className="absolute top-50 right-16 w-12 h-12 bg-accent/20 rounded-full blur-md"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>
            <motion.div
                className="absolute top-28 left-24 text-accent opacity-30 w-6 h-6"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
                <TbMedicalCross className="w-full h-full" />
            </motion.div>

            <div className="container mx-auto max-w-3xl p-6 bg-white shadow-lg rounded-xl mt-24 z-10">
                <motion.h2
                    variants={fadeIn("down", 0.2)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="text-3xl font-bold text-center text-gray-800 mb-6"
                >
                    Email Domain Remover
                </motion.h2>

                {/* File Upload Box */}
                <div
                    className="border-2 border-dashed border-gray-400 p-6 rounded-lg text-center cursor-pointer bg-gray-100 hover:bg-gray-200 transition"
                    onClick={() => fileInputRef.current.click()}
                >
                    <input
                        type="file"
                        accept=".csv,.txt"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                    />
                    <p className="text-gray-700">Click or drag a CSV/TXT file here to upload</p>
                </div>

                {fileName && (
                    <p className="text-gray-700 text-sm mt-2">
                        Uploaded File: <span className="font-semibold">{fileName}</span>
                    </p>
                )}

                {uploadedEmails.length > 0 && uniqueDomains.length === 0 && (
                    <button
                        onClick={extractDomains}
                        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition w-full"
                    >
                        Find Domains for Removal
                    </button>
                )}

                {/* Clear Button */}
                {uploadedEmails.length > 0 && (
                    <button
                        onClick={clearAll}
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition w-full"
                    >
                        Clear
                    </button>
                )}

                {/* Display Domains */}
                {uniqueDomains.length > 0 && (
                    <motion.div
                        variants={fadeIn("up", 0.3)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md"
                    >
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">Select Domains to Remove:</h3>
                        <div className="mb-4">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                placeholder="Search domain..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none duration-300 focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                        <div className="flex justify-between mb-4">
                            <button
                                onClick={() => setSelectedDomains([...uniqueDomains])}
                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 transition"
                            >
                                Select All Domains
                            </button>
                            <button
                                onClick={() => setSelectedDomains([])}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition"
                            >
                                Deselect All Domains
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 border border-gray-300 rounded-md">
                            {uniqueDomains.filter(domain => domain.includes(searchQuery.replace("@", ""))).map((domain, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleDomainSelection(domain)}
                                    className={`px-3 py-1 rounded-lg text-sm border ${selectedDomains.includes(domain) ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"
                                        }`}
                                >
                                    @{domain}
                                </button>
                            ))}
                        </div>

                        {/* Remove Button */}
                        <button
                            onClick={removeSelectedDomains}
                            disabled={selectedDomains.length === 0}
                            className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition disabled:bg-gray-400 w-full"
                        >
                            Remove Selected Domains
                        </button>

                        {/* Loader */}
                        {loading && (
                            <div className="mt-4 text-center">
                                <span className="loader"></span>
                                <p className="text-gray-600 text-sm mt-2">Processing...</p>
                            </div>
                        )}
                    </motion.div>
                )}

                {/* Download Buttons */}
                {showDownload && filteredEmails.length > 0 && (
                    <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md text-center">
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">Filtered Emails Ready!</h3>
                        <p className="text-gray-600 text-sm mb-4">{filteredEmails.length} emails remaining.</p>
                        <div className="flex justify-center gap-4">
                            <button
                                className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 transition"
                                onClick={() => downloadFile("csv")}
                            >
                                Download CSV
                            </button>
                            <button
                                className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 transition"
                                onClick={() => downloadFile("txt")}
                            >
                                Download TXT
                            </button>
                        </div>
                    </div>
                )}

                <div className="relative mt-16 mb-10">
                    <div className="w-full h-1 bg-gradient-to-r from-gray-300 via-blue-500 to-gray-300 rounded-full"></div>
                </div>

                <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-200 rounded-xl shadow-xl text-center transition-all duration-300 hover:shadow-2xl mt-5">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-5">
                        Email Domain Filter – Remove & Sort Emails by Domain
                    </h2>

                    <p className="text-gray-700 leading-relaxed text-lg">
                        Need to <b className="text-accent">filter email addresses by domain</b>? Our <b className="text-accent">Email Domain Filter </b>
                        allows you to <b>remove unwanted domains</b>, keep only specific email providers, or segment email lists by domain type.
                        Upload your list and instantly refine it with <b>precise domain filtering</b>.
                    </p>

                    <br />

                    <div className="bg-white shadow-md p-6 rounded-lg mt-6 text-left">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">✨ Key Features & Benefits</h3>
                        <ul className="space-y-3 text-gray-700 text-lg">
                            <li>✅ <b className="text-green-500">Filter emails by domain</b> - Keep or remove specific domains instantly.</li>
                            <li>✅ <b className="text-green-500">Remove unwanted email domains</b> - Delete temporary or spam-prone providers.</li>
                            <li>✅ <b className="text-green-500">Sort emails by provider</b> - Separate Gmail, Yahoo, Outlook, and custom domains.</li>
                            <li>✅ <b className="text-green-500">Bulk email domain filter</b> - Process thousands of emails in seconds.</li>
                            <li>✅ <b className="text-green-500">Free email list filter</b> - No software installation required.</li>
                            <li>✅ <b className="text-green-500">Email blacklist remover</b> - Exclude blacklisted or spam-trap domains.</li>
                            <li>✅ <b className="text-green-500">Domain-specific email segmentation</b> - Categorize emails for targeted outreach.</li>
                            <li>✅ <b className="text-green-500">Export refined lists in CSV or TXT</b> - Ready for marketing & outreach.</li>
                            <li>✅ <b className="text-green-500">Best email domain filter online</b> - Fast, accurate, and easy to use.</li>
                            <li>✅ <b className="text-green-500">Organize emails by business or personal domains</b> - Enhance targeting.</li>
                            <li>✅ <b className="text-green-500">Custom domain removal tool</b> - Instantly refine email lists.</li>
                        </ul>
                    </div>
                </div>

            </div>

            {/* Loader CSS */}
            <style jsx>{`
                .loader {
                    border: 4px solid rgba(0, 0, 0, 0.1);
                    border-left-color: #3498db;
                    border-radius: 50%;
                    width: 30px;
                    height: 30px;
                    animation: spin 1s linear infinite;
                    display: inline-block;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </section>
    );
};

export default EmailDomainRemover;
