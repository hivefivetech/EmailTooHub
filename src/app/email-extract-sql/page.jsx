"use client";

import { useState, useRef, useEffect } from "react";
import { saveAs } from "file-saver";
import Swal from "sweetalert2";
import { FiUploadCloud, FiTrash2 } from "react-icons/fi";
import { useUser } from "../hooks/useUser";

const EmailExtractorFromSQL = () => {
    const [uploadedFileName, setUploadedFileName] = useState("");
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const [extractedEmails, setExtractedEmails] = useState({});
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [fileContent, setFileContent] = useState("");
    const fileInputRef = useRef(null);

    const { fetchUserById, user } = useUser();

    useEffect(() => {
        const storedUser = localStorage.getItem("userToken");
        if (storedUser) {
            const userId = JSON.parse(atob(storedUser.split(".")[1])).userId;
            fetchUserById(userId);
        }
    }, []);

    // Extract Emails from SQL File
    const extractEmails = (text) => {
        const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
        let emails = text.match(emailRegex) || [];
        emails = [...new Set(emails)];

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

    // Handle SQL File Upload
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const isLoggedIn = localStorage.getItem("userToken");
        const isFreeUser = isLoggedIn && user?.type === "free";
        const isPaidUser = isLoggedIn && user?.type === "paid";

        const maxSize = !isLoggedIn ? 20 * 1024 * 1024
            : isFreeUser ? 25 * 1024 * 1024
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
                                The file you've attempted to upload exceeds the <strong style="color: #dc3545;">25MB limit</strong>. Please contact on Telegram to upgrade for premium plan to get access to unlimited access.
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

        if (!file.name.endsWith(".sql")) {
            Swal.fire({
                icon: "error",
                title: "Invalid File!",
                text: "Only SQL files are allowed.",
            });
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setFileContent(e.target.result);
            setUploadedFileName(file.name);
            setIsFileUploaded(true);
            setShowResults(false);
        };
        reader.readAsText(file);
    };

    // Handle Extract Button Click
    const handleExtractEmails = () => {
        if (!isFileUploaded || !fileContent.trim()) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please upload a valid SQL file before extracting!",
            });
            return;
        }

        setLoading(true);
        setProgress(0);
        setShowResults(false);

        let progressInterval = setInterval(() => {
            setProgress((prev) => (prev < 100 ? prev + 10 : 100));
        }, 300);

        setTimeout(() => {
            extractEmails(fileContent);
            clearInterval(progressInterval);
            setLoading(false);
            setShowResults(true);
        }, 2000);
    };

    // Generate CSV with Each Domain as a Column
    const downloadCSV = () => {
        const uniqueEmails = Array.from(new Set(Object.values(extractedEmails).flat()));
        if (uniqueEmails.length === 0) return;

        const csvContent = uniqueEmails.join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
        saveAs(blob, "extracted_emails.csv");
    };

    // Generate TXT with One Email per Line
    const downloadTXT = () => {
        const uniqueEmails = Array.from(new Set(Object.values(extractedEmails).flat()));
        if (uniqueEmails.length === 0) return;

        const blob = new Blob([uniqueEmails.join("\n")], { type: "text/plain;charset=utf-8" });
        saveAs(blob, "extracted_emails.txt");
    };

    // Clear Input & Results
    const handleClear = () => {
        setExtractedEmails({});
        setUploadedFileName("");
        setIsFileUploaded(false);
        setShowResults(false);
        setFileContent(""); // Clear stored file content
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <section className="flex items-center bg-gradient-to-br from-[#f9fafb] to-[#e5e7eb] py-16 min-h-screen relative">
            <div className="container mx-auto px-6 lg:px-12 text-center max-w-4xl mt-24 z-10">
                <h2 className="text-4xl font-bold text-gray-800 mb-6">
                    SQL Email Extractor
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                    Upload an SQL file and click "Extract Emails" to process.
                </p>

                {/* File Upload */}
                <div className="mt-4">
                    <label className="flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-md cursor-pointer bg-gray-100 hover:border-accent transition duration-300">
                        <FiUploadCloud className="text-gray-600" />
                        <span className="text-gray-600">Upload SQL File</span>
                        <input
                            type="file"
                            accept=".sql"
                            className="hidden"
                            onChange={handleFileUpload}
                            ref={fileInputRef}
                        />
                    </label>
                </div>

                {isFileUploaded && (
                    <p className="mt-2 text-gray-700 text-sm">
                        📂 Uploaded File: <strong>{uploadedFileName}</strong>
                    </p>
                )}

                {/* Buttons */}
                <div className="mt-6 flex justify-center gap-4">
                    <button
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                        onClick={handleExtractEmails}
                        disabled={loading || !isFileUploaded}
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
                </div>

                {/* Progress Bar */}
                {loading && (
                    <div className="w-full bg-gray-300 rounded-full h-2.5 mt-4">
                        <div className="bg-red-600 h-2.5 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
                    </div>
                )}

                {showResults && Object.keys(extractedEmails).length > 0 && (
                    <div className="mt-8 bg-white p-6 rounded-md shadow-lg">
                        <h4 className="text-lg font-bold mb-4 text-gray-800">
                            Extracted Emails ({Object.values(extractedEmails).flat().length} found)
                        </h4>
                        <div className="w-full flex justify-center items-center gap-4">
                            <button className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 transition duration-300" onClick={downloadCSV}>
                                Download CSV
                            </button>
                            <button className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 transition duration-300" onClick={downloadTXT}>
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
                        SQL Email Extractor – Extract Emails from SQL Files
                    </h2>

                    <p className="text-gray-700 leading-relaxed text-lg">
                        Looking for a <b className="text-accent">powerful SQL email extractor</b>? Upload an <b>SQL file</b>, and our tool will
                        instantly scan and extract all <b>valid email addresses</b>.
                    </p>

                    <br />

                    <p className="text-gray-700 leading-relaxed text-lg">
                        The <b className="text-accent">fastest way</b> to extract emails from large databases without writing complex queries!
                        Simply upload your SQL file, and within seconds, download your clean, duplicate-free email list in <b>CSV</b> or <b>TXT format</b>.
                        Ideal for <b>database administrators, developers, and marketers</b>.
                    </p>

                    <br />

                    <div className="bg-white shadow-md p-6 rounded-lg mt-6 text-left">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">✨ Key Features & Benefits</h3>
                        <ul className="space-y-3 text-gray-700 text-lg">
                            <li>✅ <b className="text-green-500">Extract emails from SQL files online</b> - No coding required.</li>
                            <li>✅ <b className="text-green-500">Free SQL email extractor</b> - Extract emails instantly from SQL files.</li>
                            <li>✅ <b className="text-green-500">Best SQL email scraper</b> - Fast, reliable, and easy to use.</li>
                            <li>✅ <b className="text-green-500">Extract email addresses from SQL backups</b> - Works with all database formats.</li>
                            <li>✅ <b className="text-green-500">SQL database email extractor</b> - Find all emails inside SQL tables and queries.</li>
                            <li>✅ <b className="text-green-500">Bulk email extraction from SQL files</b> - Extract thousands of emails in one go.</li>
                            <li>✅ <b className="text-green-500">Fastest SQL email finder</b> - Process large files within seconds.</li>
                            <li>✅ <b className="text-green-500">Extract emails from a large SQL file</b> - No coding required.</li>
                            <li>✅ <b className="text-green-500">Secure SQL email parsing</b> - No risk of data corruption or leaks.</li>
                            <li>✅ <b className="text-green-500">Extract emails from SQL files free</b> - No coding required.</li>
                            <li>✅ <b className="text-green-500">Free online sql file email extraction</b> - Extract emails from sql files perfectly.</li>
                            <li>✅ <b className="text-green-500">Best SQL to email converter</b> - Extracts clean and validated lists.</li>
                            <li>✅ <b className="text-green-500">Online SQL email extraction</b> - No software installation required.</li>
                            <li>✅ <b className="text-green-500">Export extracted emails to CSV or TXT</b> - Ready for marketing and outreach.</li>
                            <li>✅ <b className="text-green-500">SQL email address parser</b> - Automatically finds valid emails from SQL.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EmailExtractorFromSQL;
