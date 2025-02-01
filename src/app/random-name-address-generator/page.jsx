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
                    <motion.div
                        variants={fadeIn("up", 0.3)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md"
                    >
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
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default RandomNameAddressGenerator;
