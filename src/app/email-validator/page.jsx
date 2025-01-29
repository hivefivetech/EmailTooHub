"use client";

// Framer Motion
import { motion } from "framer-motion";

// Variants
import { fadeIn } from "../../../variants";
import { useState } from "react";

const EmailAddressValidator = () => {
    const [inputEmails, setInputEmails] = useState("");
    const [validatedEmails, setValidatedEmails] = useState([]);
    const [csvEmails, setCsvEmails] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [validationResults, setValidationResults] = useState([]);
    const [showGif, setShowGif] = useState(false);

    const Load1 = "/gifs/loading1.gif";

    // List of known disposable email domains
    const disposableDomains = [
        "10minutemail.com",
        "tempmail.com",
        "yopmail.com",
        "mailinator.com",
        "guerrillamail.com",
        // Add more domains
    ];

    const handleCSVUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                const rows = content.split("\n");
                const emailsFromCSV = rows
                    .map((row) => row.split(",")[0].trim())
                    .filter((email) => email !== "");
                setCsvEmails(emailsFromCSV);
            };
            reader.readAsText(file);
        }
    };

    const validateEmails = async () => {
        setIsLoading(true);
        setShowGif(false); // Hide GIF during validation
        const combinedEmails = [
            ...inputEmails.split(/[\s,;]+/), // Split on spaces, commas, or semicolons
            ...csvEmails, // Add emails from the CSV
        ]
            .map((email) => email.trim()) // Trim each email
            .filter((email) => email !== ""); // Remove empty strings

        const uniqueEmails = Array.from(new Set(combinedEmails)); // Remove duplicates

        const results = [];
        for (const email of uniqueEmails) {
            const result = { email, isValid: false, reason: "" };

            // Step 1: Validate email format
            if (!validateEmailFormat(email)) {
                result.reason = "Invalid email format";
                results.push(result);
                continue;
            }

            // Step 2: Check for disposable email domains
            if (isDisposableEmail(email)) {
                result.reason = "Disposable email domain";
                results.push(result);
                continue;
            }

            // Step 3: Check domain existence (A or AAAA records)
            const domain = email.split("@")[1];
            const domainExists = await checkDomainExistence(domain);
            if (!domainExists) {
                result.reason = "Domain does not exist";
                results.push(result);
                continue;
            }

            // Step 4: Check MX records
            const isValidDNS = await checkEmailDNS(email);
            if (!isValidDNS) {
                result.reason = "No MX records found";
                results.push(result);
                continue;
            }

            // If all checks pass, mark as valid
            result.isValid = true;
            results.push(result);
        }

        setValidationResults(results);
        setValidatedEmails(results.filter((result) => result.isValid).map((result) => result.email));
        setIsLoading(false);
        setShowGif(true); // Show GIF after validation
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
            return data?.Answer?.length > 0; // Domain exists if A records exist
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
            return data?.Answer?.length > 0; // DNS is valid if MX records exist
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

    const clearResults = () => {
        setValidatedEmails([]);
        setInputEmails("");
        setCsvEmails([]);
        setValidationResults([]);
        setShowGif(false); // Hide GIF when clearing results
    };

    // Calculate validation summary
    const totalEmails = validationResults.length;
    const validCount = validationResults.filter((result) => result.isValid).length;
    const invalidCount = totalEmails - validCount;
    const validPercentage = totalEmails > 0 ? ((validCount / totalEmails) * 100).toFixed(2) : 0;
    const invalidPercentage = totalEmails > 0 ? ((invalidCount / totalEmails) * 100).toFixed(2) : 0;

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
                    />

                    <input
                        type="file"
                        accept=".csv"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        onChange={handleCSVUpload}
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
                    </motion.div>
                )}

                {/* {isLoading && (
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
                                className="w-[250px] h-[150px]"
                            />
                        </div>
                    </motion.div>
                )} */}

                {validationResults.length > 0 && (
                    <motion.div
                        variants={fadeIn("up", 0.4)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: true, amount: 0.6 }}
                        className="mt-8 bg-gray-100 w-full p-6 rounded-md shadow-md"
                    >
                        <h4 className="text-lg font-bold mb-4 text-gray-800">
                            Validation Summary:
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="bg-green-100 p-4 rounded-md">
                                <p className="text-green-700 font-semibold">Valid Emails: {validCount} ({validPercentage}%)</p>
                            </div>
                            <div className="bg-red-100 p-4 rounded-md">
                                <p className="text-red-700 font-semibold">Invalid Emails: {invalidCount} ({invalidPercentage}%)</p>
                            </div>
                        </div>

                        <div className="flex justify-center gap-4">
                            <button
                                className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 transition duration-300"
                                onClick={() => downloadCSV(validationResults.filter((result) => result.isValid).map((result) => result.email), "valid_emails.csv")}
                            >
                                Download Valid Emails
                            </button>
                            <button
                                className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition duration-300"
                                onClick={() => downloadCSV(validationResults.filter((result) => !result.isValid).map((result) => result.email), "invalid_emails.csv")}
                            >
                                Download Invalid Emails
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
                                    src="https://media.giphy.com/media/3o7abAHdYvZdBNnGZq/giphy.gif" // Replace with your GIF URL
                                    alt="Validation Complete"
                                    className="w-48 mx-auto rounded-md"
                                />
                            </motion.div>
                        )}

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