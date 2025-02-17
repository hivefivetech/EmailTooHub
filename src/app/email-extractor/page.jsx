"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../../variants";
import { saveAs } from "file-saver";
import Swal from "sweetalert2";
import { FiUploadCloud, FiDownloadCloud, FiTrash2 } from "react-icons/fi";
import { TbMedicalCross } from "react-icons/tb";
import { useUser } from "../hooks/useUser";

const EmailExtractor = () => {
    const [textEmailAreaValue, setTextEmailAreaValue] = useState("");
    const [uploadedFileName, setUploadedFileName] = useState("");
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const [extractedEmails, setExtractedEmails] = useState({});
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const fileInputRef = useRef(null);

    const { fetchUserById, user } = useUser();

    useEffect(() => {
        const storedUser = localStorage.getItem("userToken");
        if (storedUser) {
            const userId = JSON.parse(atob(storedUser.split(".")[1])).userId;
            fetchUserById(userId);
        }
    }, []);

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
        if (!isFileUploaded && !textEmailAreaValue.trim()) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please enter or upload text before extracting!",
            });
            return;
        }

        if (!isFileUploaded) {
            const isLoggedIn = localStorage.getItem("userToken");
            const isFreeUser = isLoggedIn && user?.type === "free";
            const isPaidUser = isLoggedIn && user?.type === "paid";

            const maxChars = !isLoggedIn ? 100000 : isFreeUser ? 120000 : null;

            if (maxChars && textEmailAreaValue.length > maxChars) {
                if (!isLoggedIn) {
                    Swal.fire({
                        icon: "info",
                        title: "🚀 Extract More Data!",
                        html: `
                            <div style="font-family: 'Arial', sans-serif; padding: 20px; background-color: #f8f9fa; border: 1px solid #ddd; border-radius: 8px;">
                                <p style="font-size: 18px; font-weight: 600; color: #212529; margin-bottom: 8px;">
                                    Character Limit Exceeded
                                </p>
                                <p style="font-size: 15px; color: #495057; margin-bottom: 20px;">
                                    Your text exceeds the <strong style="color: #dc3545;">100,000 character limit</strong>. Please log in now!
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
                        setTextEmailAreaValue("");
                        setExtractedEmails({});
                    });
                    return;
                }

                if (isFreeUser) {
                    Swal.fire({
                        icon: "info",
                        title: "🚀 Upgrade Required!",
                        html: `
                            <div style="font-family: 'Arial', sans-serif; padding: 20px; background-color: #f8f9fa; border: 1px solid #ddd; border-radius: 8px;">
                                <p style="font-size: 18px; font-weight: 600; color: #212529; margin-bottom: 8px;">
                                    Character Limit Exceeded
                                </p>
                                <p style="font-size: 15px; color: #495057; margin-bottom: 20px;">
                                    Your text exceeds the <strong style="color: #dc3545;">120,000 character limit</strong>. Please contact on Telegram to upgrade for unlimited access.
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
                        setTextEmailAreaValue("");
                        setExtractedEmails({});
                    });
                    return;
                }
            }
        }

        setLoading(true);
        setProgress(0);
        setShowResults(false);

        setTimeout(() => {
            setProgress(100);
            if (isFileUploaded) {
                const file = fileInputRef.current.files[0];
                const reader = new FileReader();
                reader.onload = (e) => {
                    extractEmails(e.target.result);
                    setLoading(false);
                    setShowResults(true);
                };
                reader.readAsText(file);
            } else {
                extractEmails(textEmailAreaValue);
                setLoading(false);
                setShowResults(true);
            }
        }, 1000);
    };

    // Handle File Upload (TXT)
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const maxSize = !localStorage.getItem("userToken") ? 20 * 1024 * 1024
            : user?.type === "free" ? 25 * 1024 * 1024
                : null;

        if (maxSize && file.size > maxSize) {
            if (!localStorage.getItem("userToken")) {
                Swal.fire({
                    icon: "warning",
                    title: "📂 File Too Large!",
                    html: `
                                <div style="font-family: 'Arial', sans-serif; padding: 20px; background-color: #f8f9fa; border: 1px solid #ddd; border-radius: 8px;">
                                    <p style="font-size: 18px; font-weight: 600; color: #212529; margin-bottom: 8px;">
                                        File Size Limit Exceeded
                                    </p>
                                    <p style="font-size: 15px; color: #495057; margin-bottom: 20px;">
                                        The file you've attempted to upload exceeds the <strong style="color: #dc3545;">20MB limit</strong>. Please log in now!
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

            if (user?.type === "free") {
                Swal.fire({
                    icon: "warning",
                    title: "📂 Upgrade Required!",
                    html: `
                                <div style="font-family: 'Arial', sans-serif; padding: 20px; background-color: #f8f9fa; border: 1px solid #ddd; border-radius: 8px;">
                                    <p style="font-size: 18px; font-weight: 600; color: #212529; margin-bottom: 8px;">
                                        File Size Limit Exceeded
                                    </p>
                                    <p style="font-size: 15px; color: #495057; margin-bottom: 20px;">
                                        The file you've attempted to upload exceeds the <strong style="color: #dc3545;">25MB limit</strong>. Please contact on telegram to upgrade for premium plan to get access to unlimited upload size.
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

        setUploadedFileName(file.name);
        setIsFileUploaded(true);
        setTextEmailAreaValue("");
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
        setUploadedFileName("");
        setIsFileUploaded(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
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
                    disabled={isFileUploaded}
                />
                {/* Character Count Display */}
                <div className="text-right text-sm text-gray-500 mt-1">
                    {textEmailAreaValue.length} characters
                </div>

                {isFileUploaded && (
                    <p className="mt-2 text-gray-700 text-sm">📂 Uploaded File: <strong>{uploadedFileName}</strong></p>
                )}

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
                            className="bg-red-600 h-2.5 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                )}

                {loading && (
                    <div className="mt-8 flex justify-center">
                        <div className="animate-spin h-10 w-10 border-t-4 border-blue-600 border-solid rounded-full"></div>
                    </div>
                )}

                {showResults && Object.keys(extractedEmails).length > 0 && (
                    <div className="mt-8 bg-white/80 backdrop-blur-lg p-6 rounded-md shadow-lg">
                        <h4 className="text-lg font-bold mb-4 text-gray-800">Extracted Emails:</h4>

                        {/* Display Domains in a Row, Emails Below */}
                        <div className="overflow-x-auto border border-gray-300 rounded-md">
                            <div className="max-h-96 overflow-y-auto"> {/* Fixed height with vertical scroll */}
                                <table className="w-full text-left text-sm text-gray-600">
                                    <thead className="bg-gray-200 sticky top-0"> {/* Sticky header */}
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
                    </div>
                )}

                <div className="relative mt-16 mb-10">
                    <div className="w-full h-1 bg-gradient-to-r from-gray-300 via-blue-500 to-gray-300 rounded-full"></div>
                </div>

                <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-200 rounded-xl shadow-xl text-center transition-all duration-300 hover:shadow-2xl mt-5">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-5">
                        Email Extractor – Extract Emails Instantly
                    </h2>

                    <p className="text-gray-700 leading-relaxed text-lg">
                        Need a <b className="text-accent">simple and efficient email extractor</b>? Upload a <b>TXT file</b>, and our tool will
                        instantly extract all <b>valid email addresses</b>. Whether it's a list of mixed text, a document, or raw data, our
                        <b>smart email filtering</b> ensures you get only <b>clean, duplicate-free emails</b>.
                    </p>

                    <br />

                    <p className="text-gray-700 leading-relaxed text-lg">
                        The <b className="text-accent">fastest way</b> to extract emails without manual effort! Just upload, process, and download
                        your email list as in text or csv file. Supports extraction from <b>any domain</b>, making it perfect for <b>lead generation, email marketing,
                            and business outreach</b>.
                    </p>

                    <br />

                    <div className="bg-white shadow-md p-6 rounded-lg mt-6 text-left">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">✨ Key Features & Benefits</h3>
                        <ul className="space-y-3 text-gray-700 text-lg">
                            <li>✅ <b className="text-green-500">Free online email extractor</b> - Extract emails instantly with ease.</li>
                            <li>✅ <b className="text-green-500">Extract emails from text files</b> - No manual work required.</li>
                            <li>✅ <b className="text-green-500">Extract any email address free</b> - Works with any text or file.</li>
                            <li>✅ <b className="text-green-500">Best email extractor online</b> - Fast, accurate, and easy to use.</li>
                            <li>✅ <b className="text-green-500">Email address extractor</b> - Extracts emails from multiple sources.</li>
                            <li>✅ <b className="text-green-500">Email extractor software online</b> - Automates email extraction with ease.</li>
                            <li>✅ <b className="text-green-500">Extract emails from text and files</b> - No manual work required.</li>
                            <li>✅ <b className="text-green-500">Free email extractor online</b> - Extract emails instantly with ease.</li>
                            <li>✅ <b className="text-green-500">Email address extractor</b> - Quickly gathers emails from different formats.</li>
                            <li>✅ <b className="text-green-500">Best bulk email scraper</b> - Perfect for marketers, businesses, and researchers.</li>
                            <li>✅ <b className="text-green-500">Email extractor tool</b> - Simple, fast, and reliable for all needs.</li>
                            <li>✅ <b className="text-green-500">Fastest email extractor</b> - Extracts thousands of emails in seconds.</li>
                            <li>✅ <b className="text-green-500">Email scraper</b> - Extracts email addresses efficiently.</li>
                            <li>✅ <b className="text-green-500">Extract email online</b> - Extracts and organizes email lists effortlessly.</li>
                            <li>✅ <b className="text-green-500">Extract emails from txt files online</b> - No manual work required.</li>
                            <li>✅ <b className="text-green-500">Extract email addresses in bulk</b> - Ideal for high-volume email marketing.</li>
                            <li>✅ <b className="text-green-500">Best email extractor</b> - Accurate, efficient, and user-friendly.</li>
                            <li>✅ <b className="text-green-500">Bulk email extractor</b> - Extracts large lists effortlessly.</li>
                            <li>✅ <b className="text-green-500">Extract email addresses for free</b> - No cost, no limitations.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EmailExtractor;
