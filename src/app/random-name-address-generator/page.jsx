"use client";

import { useState } from "react";
import { faker } from "@faker-js/faker";
import { motion } from "framer-motion";
import { fadeIn } from "../../../variants";
import { BiCopy } from "react-icons/bi";
import { TbMedicalCross } from "react-icons/tb";

const RandomNameAddressGenerator = () => {
    const [numOfRecords, setNumOfRecords] = useState(1);
    const [generatedData, setGeneratedData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const generateData = () => {
        setIsLoading(true);
        setTimeout(() => {
            const newData = Array.from({ length: numOfRecords }, () => ({
                name: faker.person.fullName(),
                address: `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.zipCode()}, ${faker.location.country()}`
            }));
            setGeneratedData(newData);
            setIsLoading(false);
        }, 1000);
    };

    const copyToClipboard = () => {
        const text = generatedData.map(item => `${item.name} - ${item.address}`).join("\n");
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <section className="flex items-center min-h-screen bg-gray-100 py-12 relative">

            {/* Background Accents */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#f9fafb]/50 to-[#e5e7eb]/50 z-0"></div>
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

            <div className="container mx-auto max-w-3xl p-6 bg-white shadow-lg rounded-xl mt-24 z-10">
                <motion.h2
                    variants={fadeIn("down", 0.2)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="text-3xl font-bold text-center text-gray-800 mb-6"
                >
                    Random Name & Address Generator
                </motion.h2>

                {/* Selection */}
                <div className="flex justify-center items-center gap-4 mb-6">
                    <label className="text-lg text-gray-700">Generate:</label>
                    <select
                        value={numOfRecords}
                        onChange={(e) => setNumOfRecords(Number(e.target.value))}
                        className="p-2 border rounded-md shadow-sm"
                    >
                        <option value="1">1</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>

                {/* Generate Button */}
                <div className="flex justify-center">
                    <button
                        onClick={generateData}
                        disabled={isLoading}
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition disabled:bg-gray-400"
                    >
                        {isLoading ? "Generating..." : "Generate"}
                    </button>
                </div>

                {/* Display Generated Data */}
                {generatedData.length > 0 && (
                    <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-lg font-semibold text-gray-700">Generated Results</h3>
                            <div className="flex gap-4">
                                {/* Copy Button */}
                                <button
                                    onClick={copyToClipboard}
                                    className="flex items-center text-blue-600 hover:text-blue-800 relative"
                                >
                                    <BiCopy className="w-5 h-5 mr-1" />
                                    {copied && (
                                        <span className="absolute -top-6 left-6 text-xs bg-black text-white px-2 py-1 rounded-md">
                                            Copied!
                                        </span>
                                    )}
                                </button>

                                {/* Clear Button */}
                                <button
                                    onClick={() => setGeneratedData([])}
                                    className="px-3 py-1 bg-red-600 text-white text-sm font-semibold rounded-md shadow hover:bg-red-700 transition"
                                >
                                    Clear
                                </button>
                            </div>
                        </div>

                        <div className="overflow-y-auto max-h-64 p-3 border border-gray-300 rounded-md text-gray-700 text-sm">
                            {generatedData.map((item, index) => (
                                <p key={index} className="mb-2">
                                    <strong>{item.name}</strong> - {item.address}
                                </p>
                            ))}
                        </div>
                    </div>
                )}

                <div className="relative mt-16 mb-10">
                    <div className="w-full h-1 bg-gradient-to-r from-gray-300 via-blue-500 to-gray-300 rounded-full"></div>
                </div>

                <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-200 rounded-xl shadow-xl text-center transition-all duration-300 hover:shadow-2xl mt-5">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-5">
                        Random Name & Address Generator – Unlimited Unique Names & Addresses
                    </h2>

                    <p className="text-gray-700 leading-relaxed text-lg">
                        Need a <b className="text-accent">random name and address</b>? Our <b className="text-accent">Random Name & Address Generator </b>
                        allows you to generate <b>unlimited unique names and addresses</b> instantly. Whether you need <b>fake names for testing,
                            anonymous identities, or sample addresses</b>, this tool provides <b>realistic and randomly generated data</b>.
                    </p>

                    <br />

                    <p className="text-gray-700 leading-relaxed text-lg">
                        Generate names and addresses for <b>testing applications, databases, form filling, or fictional characters</b>.
                        Perfect for <b>developers, marketers, writers, and businesses</b>. Each generated result includes <b>full name and full address</b>.
                    </p>

                    <br />

                    <p className="text-gray-700 leading-relaxed text-lg">
                        No need for manual input—simply click <b>Generate</b>, and instantly get a <b>realistic random name and address</b>.
                    </p>

                    <br />

                    <div className="bg-white shadow-md p-6 rounded-lg mt-6 text-left">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">✨ Key Features & Benefits</h3>
                        <ul className="space-y-3 text-gray-700 text-lg">
                            <li>✅ <b className="text-green-500">Free random address generator online</b> – Instant unique results every time.</li>
                            <li>✅ <b className="text-green-500">Fake name generator</b> – Create realistic names for testing & privacy.</li>
                            <li>✅ <b className="text-green-500">Unlimited name generation</b> – No restrictions, generate as many as needed.</li>
                            <li>✅ <b className="text-green-500">Random address generator</b> – Get street address, city, state, ZIP, and country.</li>
                            <li>✅ <b className="text-green-500">Anonymous identity generator</b> – Perfect for security, anonymity, and testing.</li>
                            <li>✅ <b className="text-green-500">Fake address for testing</b> – Use sample addresses in software testing.</li>
                            <li>✅ <b className="text-green-500">Bulk name and address generator</b> – Export CSV or TXT files for bulk data.</li>
                            <li>✅ <b className="text-green-500">Free random name generator online</b> – Instant unique results every time.</li>
                            <li>✅ <b className="text-green-500">Realistic name generator</b> – Creates human-like names with different cultures.</li>
                            <li>✅ <b className="text-green-500">Customizable random data</b> – Generate names with specific regions or criteria.</li>
                            <li>✅ <b className="text-green-500">Fictional name generator</b> – Perfect for book writers, gamers, and roleplay.</li>
                            <li>✅ <b className="text-green-500">Random full name & address</b> – Ready for form filling, test databases, and mock data.</li>
                            <li>✅ <b className="text-green-500">Fake identity generator</b> – Generate random personas for security.</li>
                            <li>✅ <b className="text-green-500">Generate random names & addresses</b> – Instant unique results every time.</li>
                            <li>✅ <b className="text-green-500">Test data generator</b> – Ideal for developers and testers.</li>
                            <li>✅ <b className="text-green-500">Fastest name & address generator</b> – Instant results with a single click.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RandomNameAddressGenerator;
