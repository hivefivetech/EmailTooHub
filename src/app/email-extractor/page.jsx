"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../../variants";
import { saveAs } from "file-saver";
import Swal from "sweetalert2";
import { FiUploadCloud, FiDownloadCloud, FiTrash2 } from "react-icons/fi";
import { TbMedicalCross } from "react-icons/tb";

const EmailExtractor = () => {
    const [textEmailAreaValue, setTextEmailAreaValue] = useState("");
    const [extractedEmails, setExtractedEmails] = useState({});
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    // Extract & Categorize Emails
    const extractEmails = (text) => {
        const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
        let emails = text.match(emailRegex) || [];
        emails = [...new Set(emails)]; // Remove duplicates

        const categorizedEmails = {};
        emails.forEach((email) => {
            const domain = email.split("@")[1];
            if (!categorizedEmails[domain]) {
                categorizedEmails[domain] = [];
            }
            categorizedEmails[domain].push(email);
        });

        setExtractedEmails(categorizedEmails);
    };

    // Handle Extract Button Click
    const handleExtractEmails = () => {
        if (!textEmailAreaValue.trim()) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please enter or upload text before extracting!",
            });
            return;
        }
        setLoading(true);
        setProgress(0);
        setTimeout(() => {
            setProgress(100);
            extractEmails(textEmailAreaValue);
            setLoading(false);
        }, 1000);
    };

    // Handle File Upload (TXT)
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            Swal.fire({
                icon: "error",
                title: "File too large!",
                text: "File size should be less than 2MB.",
            });
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setTextEmailAreaValue(e.target.result);
        };
        reader.readAsText(file);
    };

    // Generate CSV with Each Domain as a Column
    const downloadCSV = () => {
        const domains = Object.keys(extractedEmails);
        if (domains.length === 0) return;

        let maxRows = Math.max(...Object.values(extractedEmails).map(arr => arr.length));
        let csvContent = domains.join(",") + "\n";

        for (let i = 0; i < maxRows; i++) {
            csvContent += domains.map(domain => extractedEmails[domain][i] || "").join(",") + "\n";
        }

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
        saveAs(blob, "extracted_emails.csv");
    };

    // Generate TXT with One Email per Line
    const downloadTXT = () => {
        let emails = Object.values(extractedEmails).flat();
        const blob = new Blob([emails.join("\n")], { type: "text/plain;charset=utf-8" });
        saveAs(blob, "extracted_emails.txt");
    };

    // Clear Input & Results
    const handleClear = () => {
        setTextEmailAreaValue("");
        setExtractedEmails({});

        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Clear file input
        }
    };

    return (
        <section className="flex items-center bg-gradient-to-br from-[#f9fafb] to-[#e5e7eb] py-16 min-h-screen relative">

            {/* Background Accents */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#f9fafb]/50 to-[#e5e7eb]/50 z-0"></div>
            {/* <div className="absolute -top-24 left-1/3 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div> */}
            <div className="absolute -bottom-16 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>

            {/* Floating Particle Effect */}
            <motion.div
                className="absolute top-50 right-16 w-12 h-12 bg-accent/20 rounded-full blur-md"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>

            {/* Rotating Icon on Top Left */}
            <motion.div
                className="absolute top-28 left-24 text-accent opacity-30 w-6 h-6"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
                <TbMedicalCross className="w-full h-full" />
            </motion.div>

            <div className="container mx-auto px-6 lg:px-12 text-center max-w-4xl mt-24 z-10">
                <motion.h2
                    variants={fadeIn("down", 0.2)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.6 }}
                    className="text-4xl font-bold text-gray-800 mb-6"
                >
                    Email Extractor
                </motion.h2>

                <motion.p
                    variants={fadeIn("down", 0.4)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.6 }}
                    className="text-lg text-gray-600 mb-8"
                >
                    Extract email addresses from any text file or content instantly.
                </motion.p>

                {/* Text Input Area */}
                <motion.textarea
                    variants={fadeIn("right", 0.6)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.6 }}
                    className="w-full h-40 p-3 border border-gray-300 rounded-md shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Paste your text here..."
                    value={textEmailAreaValue}
                    onChange={(e) => setTextEmailAreaValue(e.target.value)}
                />

                {/* File Upload */}
                <div className="mt-4">
                    <label className="flex items-center justify-center gap-2 p-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 transition duration-300">
                        <FiUploadCloud className="text-gray-600" />
                        <span className="text-gray-600">Upload TXT File</span>
                        <input
                            type="file"
                            accept=".txt"
                            className="hidden"
                            onChange={handleFileUpload}
                            ref={fileInputRef}
                        />
                    </label>
                </div>

                {/* Buttons */}
                <motion.div
                    variants={fadeIn("down", 0.4)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.6 }}
                    className="mt-6 flex justify-center gap-4"
                >
                    <button
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-gray-500 flex items-center gap-2"
                        onClick={handleExtractEmails}
                        disabled={loading}
                    >
                        {loading ? "Extracting..." : "Extract Emails"}
                    </button>

                    <button
                        className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700 transition duration-300 flex items-center gap-2"
                        onClick={handleClear}
                    >
                        <FiTrash2 />
                        Clear
                    </button>
                </motion.div>

                {/* Progress Bar */}
                {loading && (
                    <div className="w-full bg-gray-300 rounded-full h-2.5 mt-4">
                        <div
                            className="bg-blue-600 h-2.5 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                )}

                {/* Extracted Results */}
                {Object.keys(extractedEmails).length > 0 && (
                    <motion.div
                        variants={fadeIn("up", 0.4)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: true, amount: 0.6 }}
                        className="mt-8 bg-white/80 backdrop-blur-lg p-6 rounded-md shadow-lg"
                    >
                        <h4 className="text-lg font-bold mb-4 text-gray-800">
                            Extracted Emails:
                        </h4>

                        {/* Display Domains in a Row, Emails Below */}
                        <div className="overflow-x-auto border border-gray-300 rounded-md">
                            <table className="w-full text-left text-sm text-gray-600">
                                <thead className="bg-gray-200">
                                    <tr>
                                        {Object.keys(extractedEmails).map((domain, index) => (
                                            <th key={index} className="p-2 text-blue-600 font-semibold">
                                                @{domain}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.from({ length: Math.max(...Object.values(extractedEmails).map(arr => arr.length)) }).map((_, rowIndex) => (
                                        <tr key={rowIndex} className="border-t">
                                            {Object.keys(extractedEmails).map((domain, colIndex) => (
                                                <td key={colIndex} className="p-2">
                                                    {extractedEmails[domain][rowIndex] || ""}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Download Buttons */}
                        <div className="flex justify-center gap-4 mt-4">
                            <button
                                className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 transition duration-300 flex items-center gap-2"
                                onClick={downloadCSV}
                            >
                                <FiDownloadCloud />
                                Download CSV
                            </button>
                            <button
                                className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 transition duration-300 flex items-center gap-2"
                                onClick={downloadTXT}
                            >
                                <FiDownloadCloud />
                                Download TXT
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default EmailExtractor;
