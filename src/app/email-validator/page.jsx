"use client";

import { useRef } from "react";

// Framer Motion
import { motion } from "framer-motion";

// Variants
import { fadeIn } from "../../../variants";
import { useState } from "react";

// Pie Chart
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const EmailAddressValidator = () => {
    const [inputEmails, setInputEmails] = useState("");
    const [validatedEmails, setValidatedEmails] = useState([]);
    const [csvEmails, setCsvEmails] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [validationResults, setValidationResults] = useState([]);
    const [showGif, setShowGif] = useState(false);
    const [progress, setProgress] = useState(0);
    const [uploadedEmails, setUploadedEmails] = useState([]);
    const [uploadedFileName, setUploadedFileName] = useState("");
    const fileInputRef = useRef(null);

    const Load1 = "/gifs/loading1.gif";
    const Celeb1 = "/gifs/celebration.gif";

    // List of known disposable email domains
    const disposableDomains = [
        "10minutemail.com",
        "tempmail.com",
        "yopmail.com",
        "mailinator.com",
        "guerrillamail.com",
        "816qs.com",
        "hotrokh.com",
        "available-home.com",
        "scatterteam.com",
        "pastipass.com",
        "livegolftv.com",
        "code-gmail.com",
        "disposable.com",
        "fakeinbox.com",
        "throwawaymail.com",
        "trashmail.com",
        "maildrop.cc",
        "getnada.com",
        "mailnesia.com",
        "tempmailaddress.com",
        // Add more domains
    ];

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploadedFileName(file.name);
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                let emails = [];

                if (file.name.endsWith(".csv")) {
                    emails = content
                        .split("\n")
                        // .map((row) => row.split(",")[0].trim().replace(/^"|"$/g, ""))
                        .map((row) => row.replace(/"/g, "").split(",")[0].trim())
                        .filter((email) => email !== "");
                } else if (file.name.endsWith(".txt")) {
                    emails = content
                        .split("\n")
                        .map((email) => email.trim())
                        .filter((email) => email !== "");
                }

                setUploadedEmails(emails);
                setInputEmails("");
            };
            reader.readAsText(file);
        }
    };

    const handleCSVUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                const rows = content.split("\n");
                const emailsFromCSV = rows
                    .map((row) => row.split(",")[0].trim().replace(/^"|"$/g, ""))
                    .filter((email) => email !== "");
                setCsvEmails(emailsFromCSV);
            };
            reader.readAsText(file);
        }
    };

    const uploadFileToDrive = async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://localhost:5000/upload", {
                method: "POST",
                body: formData,
            });

            return await response.json();
        } catch (error) {
            console.error("File Upload Error:", error);
            return { success: false };
        }
    };

    const uploadFileToServer = async (file) => {
        const formData = new FormData();

        try {
            const fileContent = await file.text();
            const cleanedContent = fileContent.replace(/"/g, "");

            // Generating unique filename using timestamp
            const timestamp = Date.now();
            const fileExtension = file.name.split('.').pop();
            const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
            const uniqueFileName = `${fileNameWithoutExt}_${timestamp}.${fileExtension}`;

            const cleanedFile = new File(
                [cleanedContent],
                uniqueFileName,
                { type: file.type }
            );

            formData.append("file", cleanedFile);

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            return result.success ? result.filePath : null;
        } catch (error) {
            console.error("File Upload Error:", error);
            return null;
        }
    };

    const validateEmails = async () => {
        setIsLoading(true);
        setShowGif(false);
        setProgress(0);

        let emailsToValidate = [];

        if (uploadedEmails.length > 0) {
            emailsToValidate = [...uploadedEmails];
        } else if (inputEmails.trim() !== "") {
            emailsToValidate = inputEmails.split(/[\s,;]+/).map(email => email.trim());
        }

        if (emailsToValidate.length === 0) {
            setIsLoading(false);
            return;
        }

        // Step 1: Upload file to Google Drive
        const fileInput = fileInputRef.current;
        let fileURL = null;

        if (fileInput && fileInput.files.length > 0) {
            const file = fileInput.files[0];
            fileURL = await uploadFileToServer(file);
            if (!fileURL) {
                alert("File upload failed. Please try again.");
                setIsLoading(false);
                return;
            }
        }
        // Drive
        // const fileInput = fileInputRef.current;
        // if (fileInput && fileInput.files.length > 0) {
        //     const file = fileInput.files[0];
        //     const uploadResponse = await uploadFileToDrive(file);
        //     if (!uploadResponse.success) {
        //         alert("File upload failed. Please try again.");
        //         setIsLoading(false);
        //         return;
        //     }
        // }

        // Step 2: Start Validation Process
        const uniqueEmails = Array.from(new Set(emailsToValidate));
        const results = [];
        const totalEmails = uniqueEmails.length;

        for (let i = 0; i < uniqueEmails.length; i++) {
            const email = uniqueEmails[i];
            const result = { email, isValid: false, reason: "" };

            if (!validateEmailFormat(email)) {
                result.reason = "Invalid email format";
                results.push(result);
                continue;
            }

            if (isDisposableEmail(email)) {
                result.reason = "Disposable email domain";
                results.push(result);
                continue;
            }

            const domain = email.split("@")[1];
            const domainExists = await checkDomainExistence(domain);
            if (!domainExists) {
                result.reason = "Domain does not exist";
                results.push(result);
                continue;
            }

            const isValidDNS = await checkEmailDNS(email);
            if (!isValidDNS) {
                result.reason = "No MX records found";
                results.push(result);
                continue;
            }

            result.isValid = true;
            results.push(result);

            setProgress(((i + 1) / totalEmails) * 100);
        }

        setValidationResults(results);
        setValidatedEmails(results.filter((result) => result.isValid).map((result) => result.email));
        setIsLoading(false);
        setShowGif(true);
    };

    const validateEmailFormat = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const isDisposableEmail = (email) => {
        const domain = email.split("@")[1];
        return disposableDomains.includes(domain);
    };

    const checkDomainExistence = async (domain) => {
        try {
            const response = await fetch(
                `https://dns.google/resolve?name=${domain}&type=A`
            );
            const data = await response.json();
            return data?.Answer?.length > 0;
        } catch (error) {
            console.error("Domain check error:", error);
            return false;
        }
    };

    const checkEmailDNS = async (email) => {
        const domain = email.split("@")[1];
        if (!domain) return false;

        try {
            const response = await fetch(
                `https://dns.google/resolve?name=${domain}&type=MX`
            );
            const data = await response.json();
            return data?.Answer?.length > 0;
        } catch (error) {
            console.error("DNS check error:", error);
            return false;
        }
    };

    const downloadCSV = (emails, filename) => {
        const csvContent = `data:text/csv;charset=utf-8,${emails.join("\n")}`;
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const downloadFile = (emails, filename, type) => {
        let content;
        if (type === "csv") {
            content = `data:text/csv;charset=utf-8,${emails.map(email => email.replace(/"/g, "")).join("\n")}`;
        } else {
            content = `data:text/plain;charset=utf-8,${emails.map(email => email.replace(/"/g, "")).join("\n")}`;
        }

        const encodedUri = encodeURI(content);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const removeUploadedFile = () => {
        setUploadedEmails([]);
        setUploadedFileName("");
        setInputEmails("");

        // Reset file input field
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const clearResults = () => {
        setValidatedEmails([]);
        setInputEmails("");
        setCsvEmails([]);
        setValidationResults([]);
        setShowGif(false);
        setUploadedEmails([]);
        setUploadedFileName("");

        // Reset file input field
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    // Calculate validation summary
    const totalEmails = validationResults.length;
    const validCount = validationResults.filter((result) => result.isValid).length;
    const invalidCount = totalEmails - validCount;
    const spamCount = validationResults.filter((result) => result.reason === "Disposable email domain").length;
    const invalidDomainCount = validationResults.filter((result) => result.reason === "Domain does not exist" || result.reason === "No MX records found").length;

    // Pie Chart Data
    const pieChartData = {
        labels: [
            "Valid",
            "Invalid",
            // "Duplicates", 
            "Spam",
            "Invalid Domain"
        ],
        datasets: [
            {
                data: [
                    validCount,
                    invalidCount,
                    // duplicateCount, 
                    spamCount,
                    invalidDomainCount
                ],
                backgroundColor: [
                    "#10B981", // Green for valid
                    "#EF4444", // Red for invalid
                    "#8B5CF6", // Purple for spam
                    "#3B82F6", // Blue for invalid domain
                ],
            },
        ],
    };

    return (
        <section
            className="section flex flex-wrap items-center justify-center bg-gradient-to-b from-[#f9fafb] to-[#e5e7eb] py-12 sm:py-16 md:py-20 min-h-screen h-auto"
            id="emailvalidator"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mt-20">
                <motion.h1
                    variants={fadeIn("down", 0.2)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.6 }}
                    className="text-3xl font-bold text-black mb-6"
                >
                    Email Validator Tool
                </motion.h1>

                <motion.h3
                    variants={fadeIn("down", 0.4)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.6 }}
                    className="max-w-[800px] mx-auto mb-8 text-lg text-gray-700"
                >
                    Validate multiple email addresses instantly, including those from CSV files. Clean your data with ease!
                </motion.h3>

                <motion.div
                    variants={fadeIn("left", 0.4)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.6 }}
                    className="flex flex-col justify-center items-center space-y-4 w-full"
                >
                    <textarea
                        placeholder="Enter email addresses (comma, space, or semicolon separated)..."
                        className="w-full h-32 p-3 border border-gray-300 rounded-md shadow-sm resize-none"
                        value={inputEmails}
                        onChange={(e) => setInputEmails(e.target.value)}
                        disabled={uploadedEmails.length > 0}
                    />

                    {uploadedEmails.length > 0 && (
                        <div className="flex items-center justify-between bg-gray-100 p-2 rounded-md w-full mt-2">
                            <p className="text-sm text-gray-700">{uploadedFileName}</p>
                            <button
                                className="text-red-500 hover:text-red-700 text-sm font-bold"
                                onClick={removeUploadedFile}
                            >
                                ❌
                            </button>
                        </div>
                    )}

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".csv, .txt"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        onChange={handleFileUpload}
                    />
                </motion.div>

                <motion.div
                    variants={fadeIn("down", 0.4)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.6 }}
                    className="mt-6 flex justify-center gap-4"
                >
                    <button
                        className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition duration-300 disabled:bg-gray-500 flex justify-center items-center"
                        onClick={validateEmails}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
                        ) : (
                            "Start Validation"
                        )}
                    </button>
                    <button
                        className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                        onClick={clearResults}
                    >
                        Clear
                    </button>
                </motion.div>

                {isLoading && (
                    <motion.div
                        variants={fadeIn("up", 0.4)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: true, amount: 0.6 }}
                        className="mt-8"
                    >
                        <div className="flex justify-center items-center">
                            <img
                                src={Load1}
                                alt="Loading"
                                className="w-[150px] h-[80px]"
                            />
                            <p className="ml-4 text-lg text-gray-700">Validating emails...</p>
                        </div>
                        <div className="w-full bg-gray-300 rounded-full h-2.5 mt-4">
                            <div
                                className="bg-blue-600 h-2.5 rounded-full"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </motion.div>
                )}

                {validationResults.length > 0 && (
                    <motion.div
                        variants={fadeIn("up", 0.4)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: true, amount: 0.6 }}
                        className="mt-8 bg-white w-full p-6 rounded-md shadow-md"
                    >
                        <h4 className="text-lg font-bold mb-4 text-gray-800">
                            Validation Summary:
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="bg-green-100 p-4 rounded-md">
                                <p className="text-green-700 font-semibold">Valid Emails: {validCount}</p>
                            </div>
                            <div className="bg-red-100 p-4 rounded-md">
                                <p className="text-red-700 font-semibold">Invalid Emails: {invalidCount}</p>
                            </div>
                            <div className="bg-purple-100 p-4 rounded-md">
                                <p className="text-purple-700 font-semibold">Spam Emails: {spamCount}</p>
                            </div>
                            <div className="bg-blue-100 p-4 rounded-md">
                                <p className="text-blue-700 font-semibold">Invalid Domain Emails: {invalidDomainCount}</p>
                            </div>
                        </div>

                        <div className="flex justify-center gap-4">
                            <button
                                className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 transition duration-300"
                                onClick={() => downloadFile(validatedEmails, "valid_emails.csv", "csv")}
                            >
                                Download Valid Emails (CSV)
                            </button>
                            <button
                                className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 transition duration-300"
                                onClick={() => downloadFile(validatedEmails, "valid_emails.txt", "txt")}
                            >
                                Download Valid Emails (TXT)
                            </button>
                            <button
                                className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition duration-300"
                                onClick={() => downloadFile(validationResults.filter((result) => !result.isValid).map((result) => result.email), "invalid_emails.csv", "csv")}
                            >
                                Download Invalid Emails (CSV)
                            </button>
                            <button
                                className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition duration-300"
                                onClick={() => downloadFile(validationResults.filter((result) => !result.isValid).map((result) => result.email), "invalid_emails.txt", "txt")}
                            >
                                Download Invalid Emails (TXT)
                            </button>
                        </div>

                        {showGif && (
                            <motion.div
                                variants={fadeIn("up", 0.4)}
                                initial="hidden"
                                whileInView={"show"}
                                viewport={{ once: true, amount: 0.6 }}
                                className="mt-6"
                            >
                                <img
                                    src={Celeb1}
                                    alt="Validation Complete"
                                    className="w-44 mx-auto rounded-md"
                                />
                            </motion.div>
                        )}

                        <div className="mt-6">
                            <h4 className="text-lg font-bold mb-4 text-gray-800">Email Distribution</h4>
                            <div className="w-full md:w-[30%] mx-auto">
                                <Pie data={pieChartData} />
                            </div>
                        </div>

                        <div className="mt-6 text-sm text-gray-600">
                            <p>Emails are validated based on the following criteria:</p>
                            <ul className="list-disc pl-5 text-left">
                                <li>Valid email format</li>
                                <li>Duplicate emails removal</li>
                                <li>Non-disposable domain</li>
                                <li>Domain existence (A or AAAA records)</li>
                                <li>MX records for the domain</li>
                            </ul>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default EmailAddressValidator;
