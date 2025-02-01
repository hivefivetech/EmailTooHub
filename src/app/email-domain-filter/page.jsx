"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../../variants";
import { saveAs } from "file-saver";
import { TbMedicalCross } from "react-icons/tb";

const EmailDomainRemover = () => {
    const [uploadedEmails, setUploadedEmails] = useState([]);
    const [uniqueDomains, setUniqueDomains] = useState([]);
    const [selectedDomains, setSelectedDomains] = useState([]);
    const [filteredEmails, setFilteredEmails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showDownload, setShowDownload] = useState(false);
    const fileInputRef = useRef(null);

    // Handle File Upload
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result.split(/\r?\n/).map(email => email.trim()).filter(email => email);
            const emailSet = new Set(content);
            setUploadedEmails(Array.from(emailSet));

            // Extract unique lowercase domains
            const domains = Array.from(new Set(content.map(email => email.split("@")[1]?.toLowerCase()).filter(Boolean)));
            setUniqueDomains(domains);
            setSelectedDomains([]);
            setShowDownload(false);
        };

        reader.readAsText(file);
    };

    // Handle Domain Selection
    const handleDomainSelection = (domain) => {
        setSelectedDomains((prev) =>
            prev.includes(domain) ? prev.filter(d => d !== domain) : [...prev, domain]
        );
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
        let content = format === "csv"
            ? `"Email"\n` + filteredEmails.join("\n")
            : filteredEmails.map(email => email.replace(/"/g, '')).join("\n");
        const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        saveAs(blob, `filtered_emails.${format}`);
    };

    // Clear Everything
    const clearAll = () => {
        setUploadedEmails([]);
        setUniqueDomains([]);
        setSelectedDomains([]);
        setFilteredEmails([]);
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

            <div className="container mx-auto max-w-3xl p-6 bg-white shadow-lg rounded-xl mt-20 z-10">
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
                        <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 border border-gray-300 rounded-md">
                            {uniqueDomains.map((domain, index) => (
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
                    <motion.div
                        variants={fadeIn("up", 0.3)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md text-center"
                    >
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
                    </motion.div>
                )}
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
