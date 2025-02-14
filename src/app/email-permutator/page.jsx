"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../../variants";
import { TbMedicalCross } from "react-icons/tb";
import { FiCopy, FiCheck, FiDownload, FiXCircle } from "react-icons/fi";

const EmailPermutator = () => {
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [nickname, setNickname] = useState("");
    const [domain, setDomain] = useState("");
    const [permutations, setPermutations] = useState([]);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState("");

    const generatePermutations = () => {
        if (!firstName || !lastName || !domain) {
            setError("Please fill in all required fields: First Name, Last Name, and Domain.");
            return;
        }

        setError("");

        const baseFirst = firstName.toLowerCase();
        const baseMiddle = middleName ? middleName.toLowerCase() : "";
        const baseLast = lastName.toLowerCase();
        const baseNick = nickname ? nickname.toLowerCase() : "";
        const baseDomain = domain.toLowerCase();

        let patterns = new Set(); // Use a Set to avoid duplicates

        // 1. Basic Combinations
        patterns.add(`${baseFirst}@${baseDomain}`);
        patterns.add(`${baseLast}@${baseDomain}`);
        patterns.add(`${baseFirst}${baseLast}@${baseDomain}`);
        patterns.add(`${baseLast}${baseFirst}@${baseDomain}`);
        patterns.add(`${baseFirst}.${baseLast}@${baseDomain}`);
        patterns.add(`${baseLast}.${baseFirst}@${baseDomain}`);
        patterns.add(`${baseFirst[0]}${baseLast[0]}@${baseDomain}`);
        patterns.add(`${baseFirst[0]}${baseLast}@${baseDomain}`);
        patterns.add(`${baseFirst}${baseLast[0]}@${baseDomain}`);

        // Adding more variations to basic combinations
        patterns.add(`${baseFirst.slice(0, 2)}${baseLast}@${baseDomain}`);
        patterns.add(`${baseFirst}${baseLast.slice(0, 2)}@${baseDomain}`);
        patterns.add(`${baseLast.slice(0, 2)}${baseFirst}@${baseDomain}`);
        patterns.add(`${baseLast}${baseFirst.slice(0, 2)}@${baseDomain}`);

        // 2. Initials (Expanded)
        patterns.add(`${baseFirst[0]}${baseLast}@${baseDomain}`);
        patterns.add(`${baseLast[0]}${baseFirst}@${baseDomain}`);
        patterns.add(`${baseFirst}${baseLast[0]}@${baseDomain}`);
        patterns.add(`${baseLast}${baseFirst[0]}@${baseDomain}`);
        patterns.add(`${baseFirst[0]}.${baseLast}@${baseDomain}`);
        patterns.add(`${baseLast[0]}.${baseFirst}@${baseDomain}`);
        patterns.add(`${baseFirst}.${baseLast[0]}@${baseDomain}`);
        patterns.add(`${baseLast}.${baseFirst[0]}@${baseDomain}`);
        patterns.add(`${baseFirst[0]}${baseLast[0]}@${baseDomain}`);
        patterns.add(`${baseFirst[0]}.${baseLast[0]}@${baseDomain}`);
        patterns.add(`${baseLast[0]}.${baseFirst[0]}@${baseDomain}`);

        //More initial variations with full First/Last names
        patterns.add(`${baseFirst[0]}${baseLast}@${baseDomain}`);
        patterns.add(`${baseLast[0]}${baseFirst}@${baseDomain}`);
        patterns.add(`${baseFirst}${baseLast[0]}@${baseDomain}`);
        patterns.add(`${baseLast}${baseFirst[0]}@${baseDomain}`);
        patterns.add(`${baseFirst[0]}.${baseLast}@${baseDomain}`);
        patterns.add(`${baseLast[0]}.${baseFirst}@${baseDomain}`);
        patterns.add(`${baseFirst}.${baseLast[0]}@${baseDomain}`);
        patterns.add(`${baseLast}.${baseFirst[0]}@${baseDomain}`);

        // 3. Separators (Hyphen, Underscore, Plus Sign) - Covering more initial variations
        patterns.add(`${baseFirst}-${baseLast}@${baseDomain}`);
        patterns.add(`${baseLast}-${baseFirst}@${baseDomain}`);
        patterns.add(`${baseFirst}_${baseLast}@${baseDomain}`);
        patterns.add(`${baseLast}_${baseFirst}@${baseDomain}`);
        patterns.add(`${baseFirst[0]}-${baseLast}@${baseDomain}`);
        patterns.add(`${baseLast[0]}-${baseFirst}@${baseDomain}`);
        patterns.add(`${baseFirst[0]}_${baseLast}@${baseDomain}`);
        patterns.add(`${baseLast[0]}_${baseFirst}@${baseDomain}`);
        patterns.add(`${baseFirst}-${baseLast[0]}@${baseDomain}`);
        patterns.add(`${baseLast}-${baseFirst[0]}@${baseDomain}`);
        patterns.add(`${baseFirst}_${baseLast[0]}@${baseDomain}`);
        patterns.add(`${baseLast}_${baseFirst[0]}@${baseDomain}`);
        patterns.add(`${baseFirst[0]}-${baseLast[0]}@${baseDomain}`);
        patterns.add(`${baseFirst[0]}_${baseLast[0]}@${baseDomain}`);

        // 6. Middle Name/Initial
        if (baseMiddle) {
            patterns.add(`${baseFirst}${baseMiddle}${baseLast}@${baseDomain}`);
            patterns.add(`${baseFirst}.${baseMiddle}.${baseLast}@${baseDomain}`);
            patterns.add(`${baseFirst}${baseMiddle[0]}${baseLast}@${baseDomain}`);
            patterns.add(`${baseFirst}.${baseMiddle[0]}.${baseLast}@${baseDomain}`);
            patterns.add(`${baseFirst}_${baseMiddle}_${baseLast}@${baseDomain}`);
            patterns.add(`${baseFirst}-${baseMiddle}-${baseLast}@${baseDomain}`);
            patterns.add(`${baseFirst}${baseMiddle}@${baseDomain}`);
        }

        // 7. Nickname
        if (baseNick) {
            patterns.add(`${baseNick}@${baseDomain}`);
            patterns.add(`${baseNick}${baseLast}@${baseDomain}`);
            patterns.add(`${baseNick}.${baseLast}@${baseDomain}`);
            patterns.add(`${baseFirst}${baseNick}@${baseDomain}`);
            patterns.add(`${baseFirst}.${baseNick}@${baseDomain}`);
            patterns.add(`${baseNick}_${baseLast}@${baseDomain}`);
            patterns.add(`${baseFirst}_${baseNick}@${baseDomain}`);
            patterns.add(`${baseFirst}-${baseNick}@${baseDomain}`);
        }

        setPermutations([...patterns]);
        setCopied(false);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(permutations.join("\n"));
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    const downloadTxt = () => {
        const blob = new Blob([permutations.join("\n")], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "email_permutations.txt";
        link.click();
    };

    const downloadCsv = () => {
        const csvContent = permutations.map(email => `${email}`).join("\n");
        const blob = new Blob([csvContent], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "email_permutations.csv";
        link.click();
    };

    const clearFields = () => {
        setFirstName("");
        setMiddleName("");
        setLastName("");
        setNickname("");
        setDomain("");
        setPermutations([]);
        setCopied(false);
        setError("");
    };

    return (
        <section className="flex items-center bg-gradient-to-br from-[#f9fafb] to-[#e5e7eb] py-16 min-h-screen relative">
            {/* Background Accents */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#f9fafb]/50 to-[#e5e7eb]/50 z-0"></div>
            <div className="absolute -bottom-16 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>

            {/* Floating Particle Effect */}
            <motion.div
                className="absolute top-50 right-16 w-12 h-12 bg-accent/20 rounded-full blur-md"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>

            <div className="container mx-auto px-6 lg:px-12 text-center max-w-5xl mt-24 z-10">
                <motion.h2
                    variants={fadeIn("down", 0.2)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.6 }}
                    className="text-4xl font-bold text-gray-800 mb-6"
                >
                    Email Permutator
                </motion.h2>

                <motion.p
                    variants={fadeIn("up", 0.3)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.6 }}
                    className="text-lg text-gray-700 leading-relaxed text-center max-w-2xl mx-auto mb-8"
                >
                    Instantly generate multiple <b>email variations</b> based on <b>first name, last name, initials, and domain</b>.
                    Perfect for <b>email discovery, outreach, and lead generation</b>, our tool ensures you get <b>ready-to-use email formats</b> with <i>maximum accuracy</i>.
                    Save time, improve deliverability, and enhance your <b>email marketing</b> and <b>business communication strategies</b>.
                </motion.p>

                {/* Input Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 text-left">
                    {[
                        { label: "First Name", value: firstName, setValue: setFirstName, required: true },
                        { label: "Middle Name (Optional)", value: middleName, setValue: setMiddleName, required: false },
                        { label: "Last Name", value: lastName, setValue: setLastName, required: true },
                        { label: "Nickname (Optional)", value: nickname, setValue: setNickname, required: false },
                    ].map(({ label, value, setValue, required }, index) => (
                        <div key={index}>
                            <label className="block text-gray-700 font-semibold mb-1">{label}</label>
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                                placeholder={required ? `${label} *` : label}
                            />
                        </div>
                    ))}

                    {/* Domain Field (Separate to Ensure @ is Only Here) */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Domain</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">@</span>
                            <input
                                type="text"
                                value={domain}
                                onChange={(e) => setDomain(e.target.value.replace(/^@/, ""))}
                                className="w-full p-3 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                                placeholder="example.com *"
                            />
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                {error && <p className="text-red-600 font-semibold text-lg mb-4">{error}</p>}

                <div className="flex justify-center gap-4">
                    <button
                        onClick={generatePermutations}
                        className="px-6 py-3 bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-blue-700 transition-all"
                    >
                        🚀 Generate Permutations
                    </button>

                    <button
                        onClick={clearFields}
                        className="px-6 py-3 bg-red-600 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-red-700 transition-all flex items-center gap-2"
                    >
                        <FiXCircle /> Clear
                    </button>
                </div>

                {/* Output Section */}
                {permutations.length > 0 && (
                    <>
                        <div className="mt-6 bg-white p-6 rounded-lg shadow-lg text-left max-h-60 overflow-y-auto">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">✨ Possible Emails</h3>
                            <ul className="space-y-2">
                                {permutations.map((email, index) => (
                                    <li key={index} className="text-gray-700 text-lg font-mono bg-gray-100 p-2 rounded">
                                        {email}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex w-full justify-between items-center gap-4 mt-4 bg-white py-3 px-2 rounded-md">
                            <button onClick={copyToClipboard} className="px-4 py-2 bg-green-600 text-white font-semibold w-full flex justify-center items-center gap-3 rounded-lg hover:bg-green-700">
                                {copied ? <FiCheck /> : <FiCopy />} {copied ? "Copied!" : "Copy"}
                            </button>
                            <button onClick={downloadTxt} className="px-4 py-2 bg-blue-600 text-white font-semibold w-full flex justify-center items-center gap-3 rounded-lg hover:bg-blue-700">
                                <FiDownload /> TXT
                            </button>
                            <button onClick={downloadCsv} className="px-4 py-2 bg-blue-600 text-white font-semibold w-full flex justify-center items-center gap-3 rounded-lg hover:bg-blue-700">
                                <FiDownload /> CSV
                            </button>
                        </div>
                    </>
                )}

                <div className="relative mt-16 mb-10">
                    <div className="w-full h-1 bg-gradient-to-r from-gray-300 via-blue-500 to-gray-300 rounded-full"></div>
                </div>

                <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-200 rounded-xl shadow-xl text-center transition-all duration-300 hover:shadow-2xl mt-5">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-5">
                        Email Permutator – Generate Email Variations Instantly
                    </h2>

                    <p className="text-gray-700 leading-relaxed text-lg">
                        Need a <b className="text-accent">quick and effective email permutation tool</b>? Enter a <b>first name, last name, and domain</b>,
                        and our tool will generate multiple <b>email variations</b> automatically. Ideal for <b>email discovery, outreach, and lead generation</b>,
                        ensuring you never miss a potential contact.
                    </p>

                    <br />

                    <p className="text-gray-700 leading-relaxed text-lg">
                        The <b className="text-accent">fastest way</b> to generate email permutations without manual effort! Just input details and get
                        <b>multiple email formats</b> used by professionals worldwide. Perfect for <b>sales teams, recruiters, and marketers</b>
                        who need accurate email guesses in seconds.
                    </p>

                    <br />

                    <div className="bg-white shadow-md p-6 rounded-lg mt-6 text-left">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">✨ Key Features & Benefits</h3>
                        <ul className="space-y-3 text-gray-700 text-lg">
                            <li>✅ <b className="text-green-500">Free online email permutator</b> - Generate email variations instantly.</li>
                            <li>✅ <b className="text-green-500">Best email permutation tool</b> - Fast, accurate, and efficient.</li>
                            <li>✅ <b className="text-green-500">Generate email variations</b> - Works for any domain and name format.</li>
                            <li>✅ <b className="text-green-500">Find professional email formats</b> - Used in business and corporate settings.</li>
                            <li>✅ <b className="text-green-500">No manual work required</b> - Get instant results in one click.</li>
                            <li>✅ <b className="text-green-500">Best tool for email discovery</b> - Ideal for outreach and marketing teams.</li>
                            <li>✅ <b className="text-green-500">Quick and accurate</b> - Generates 30+ possible emails in seconds.</li>
                            <li>✅ <b className="text-green-500">Email format checker</b> - Ensure you're using the most common patterns.</li>
                            <li>✅ <b className="text-green-500">Bulk email permutation</b> - Handle multiple names at once.</li>
                            <li>✅ <b className="text-green-500">Sales and lead generation tool</b> - Perfect for B2B prospecting.</li>
                            <li>✅ <b className="text-green-500">Recruiters & HR friendly</b> - Find candidate emails easily.</li>
                            <li>✅ <b className="text-green-500">Business email finder</b> - Create valid corporate email patterns.</li>
                            <li>✅ <b className="text-green-500">No software needed</b> - Works online for free, anytime.</li>
                            <li>✅ <b className="text-green-500">Best for outreach campaigns</b> - Improve email reach and engagement.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EmailPermutator;
