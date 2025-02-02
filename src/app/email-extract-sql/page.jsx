"use client";

import { useState, useRef } from "react";
import { saveAs } from "file-saver";
import Swal from "sweetalert2";
import { FiUploadCloud, FiDownloadCloud, FiTrash2 } from "react-icons/fi";

const EmailExtractorFromSQL = () => {
    const [uploadedFileName, setUploadedFileName] = useState("");
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const [extractedEmails, setExtractedEmails] = useState({});
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [fileContent, setFileContent] = useState(""); // Store file content properly
    const fileInputRef = useRef(null);

    // Extract Emails from SQL File
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

    // Handle SQL File Upload
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            Swal.fire({
                icon: "warning",
                title: "📂 File Size Limit Reached!",
                html: `
                    <p style="font-size:16px;">The uploaded file exceeds the <strong>5MB size limit</strong>.</p>
                    <p style="font-size:14px; color: #555;">For extracting larger files, reach out to us on:</p>
                    <a href="https://t.me/ZplusMan" target="_blank" rel="noopener noreferrer" 
                        style="display: inline-block; padding: 10px 15px; background-color: #0088cc; color: #fff; border-radius: 5px; text-decoration: none; font-weight: bold; margin-top:10px;">
                        📩 Contact on Telegram
                    </a>
                `,
                confirmButtonText: "OK",
            });
            return;
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
            setFileContent(e.target.result); // Store the file content for later extraction
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
                        <div className="bg-blue-600 h-2.5 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
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
            </div>
        </section>
    );
};

export default EmailExtractorFromSQL;
