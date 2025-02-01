"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../../variants";
import { saveAs } from "file-saver";
import Swal from "sweetalert2";
import { TbMedicalCross } from "react-icons/tb";
import { FiUploadCloud } from "react-icons/fi";

const EmailSplitter = () => {
    const [emails, setEmails] = useState([]);
    const [batchSize, setBatchSize] = useState("");
    const [batches, setBatches] = useState([]);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState("");

    // Handle File Upload (CSV or TXT)
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setFileName(file.name); // Store the uploaded file name

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
            let content = e.target.result;
            let extractedEmails = [];

            if (file.name.endsWith(".csv")) {
                extractedEmails = content
                    .split("\n")
                    .map((row) => row.split(",")[0].trim()) // Extract first column
                    .filter((email) => email.includes("@"));
            } else if (file.name.endsWith(".txt")) {
                extractedEmails = content
                    .split("\n")
                    .map((email) => email.trim())
                    .filter((email) => email.includes("@"));
            }

            if (extractedEmails.length === 0) {
                Swal.fire({
                    icon: "error",
                    title: "No Emails Found!",
                    text: "The uploaded file does not contain valid emails.",
                });
                return;
            }

            setEmails(extractedEmails);
            setBatches([]);
        };
        reader.readAsText(file);
    };

    // Split Emails into Batches
    const splitEmails = () => {
        if (!batchSize || batchSize <= 0) {
            Swal.fire({
                icon: "warning",
                title: "Invalid Batch Size!",
                text: "Please enter a valid batch size.",
            });
            return;
        }

        setLoading(true);
        setTimeout(() => {
            const size = parseInt(batchSize);
            const splitBatches = [];
            for (let i = 0; i < emails.length; i += size) {
                splitBatches.push(emails.slice(i, i + size));
            }

            setBatches(splitBatches);
            setLoading(false);

            Swal.fire({
                icon: "success",
                title: "Emails Split Successfully!",
                text: `Your emails have been divided into ${splitBatches.length} batches.`,
            });
        }, 1000);
    };

    // Download a Batch as CSV or TXT
    const downloadBatch = (batch, index, format) => {
        let content = format === "csv"
            ? `"Email"\n` + batch.map(email => `"${email.replace(/"/g, '')}"`).join("\n")
            : batch.map(email => email.replace(/"/g, '')).join("\n");
    
        const blob = new Blob([content], { type: format === "csv" ? "text/csv;charset=utf-8" : "text/plain;charset=utf-8" });
        saveAs(blob, `batch_${index + 1}.${format}`);
    };

    // Clear Data
    const clearData = () => {
        setEmails([]);
        setBatchSize("");
        setBatches([]);
        setFileName("");
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    };

    return (
        <section className="flex items-center bg-gradient-to-br from-[#f9fafb] to-[#e5e7eb] py-16 min-h-screen relative">
            {/* Background Accents */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#f9fafb]/50 to-[#e5e7eb]/50 z-0"></div>
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

            <div className="container mx-auto px-6 lg:px-12 text-center max-w-4xl mt-24 z-10">
                {/* Header */}
                <motion.h2
                    variants={fadeIn("down", 0.2)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.6 }}
                    className="text-3xl font-bold text-gray-800 mb-6"
                >
                    Email Splitter
                </motion.h2>

                <motion.p
                    variants={fadeIn("down", 0.4)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.6 }}
                    className="text-lg text-gray-600 mb-8"
                >
                    Upload your email list and split it into smaller batches.
                </motion.p>

                {/* File Upload */}
                <div
                    className="border-2 border-dashed border-gray-400 p-6 rounded-lg text-center cursor-pointer bg-gray-100 hover:bg-gray-200 transition mb-4 flex flex-col items-center"
                    onClick={() => fileInputRef.current.click()}
                >
                    <input
                        type="file"
                        accept=".csv, .txt"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                    />
                    <FiUploadCloud className="text-gray-700 text-4xl mb-2" />
                    <p className="text-gray-700">Click or drag a CSV/TXT file here to upload</p>
                </div>

                {/* Show uploaded file name */}
                {fileName && (
                    <p className="text-gray-700 text-sm mt-2 mb-3">
                        Uploaded File: <span className="font-semibold">{fileName}</span>
                    </p>
                )}

                {/* Batch Input & Buttons */}
                <div className="flex flex-col items-center gap-4">
                    <input
                        type="number"
                        className="p-2 border border-gray-300 rounded-md w-40 text-center"
                        placeholder="Batch size"
                        value={batchSize}
                        onChange={(e) => setBatchSize(e.target.value)}
                    />

                    <div className="flex justify-center gap-4">
                        <button
                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-gray-500"
                            onClick={splitEmails}
                            disabled={loading || emails.length === 0}
                        >
                            {loading ? "Splitting..." : "Split Emails"}
                        </button>

                        <button
                            className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700 transition duration-300"
                            onClick={clearData}
                        >
                            Clear
                        </button>
                    </div>
                </div>

                {/* Display Batches */}
                {batches.length > 0 && (
                    <motion.div
                        variants={fadeIn("up", 0.4)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: true, amount: 0.6 }}
                        className="mt-8 bg-white p-6 rounded-md shadow-md"
                    >
                        <h4 className="text-lg font-bold mb-4 text-gray-800">
                            Batches Created:
                        </h4>

                        {batches.map((batch, index) => (
                            <div key={index} className="mb-4 p-4 border border-gray-300 rounded-md">
                                <p className="text-blue-600 font-semibold">
                                    Batch {index + 1} ({batch.length} emails)
                                </p>

                                {/* Show first 5 emails for preview */}
                                <ul className="text-gray-700 text-sm mt-2">
                                    {batch.slice(0, 5).map((email, idx) => (
                                        <li key={idx} className="border-b py-1">{email}</li>
                                    ))}
                                </ul>

                                <div className="flex justify-center gap-2 mt-2">
                                    <button
                                        className="px-4 py-1 bg-green-500 text-white rounded-md hover:bg-green-700 transition duration-300"
                                        onClick={() => downloadBatch(batch, index, "csv")}
                                    >
                                        Download CSV
                                    </button>
                                    <button
                                        className="px-4 py-1 bg-green-500 text-white rounded-md hover:bg-green-700 transition duration-300"
                                        onClick={() => downloadBatch(batch, index, "txt")}
                                    >
                                        Download TXT
                                    </button>
                                </div>

                                <hr className="my-3 border-gray-300" />
                            </div>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default EmailSplitter;
