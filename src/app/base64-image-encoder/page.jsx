"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../../variants";
import { BiCopy } from "react-icons/bi";
import { TbMedicalCross } from "react-icons/tb";

const Base64Encode = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [base64, setBase64] = useState("");
    const [mimeType, setMimeType] = useState("");
    const [copiedField, setCopiedField] = useState(null);
    const fileInputRef = useRef(null);

    // Convert Image to Base64 and Detect MIME Type
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setSelectedImage(reader.result);
            setBase64(reader.result.split(",")[1]); // Extracting base64 part
            setMimeType(file.type); // Dynamically detect MIME type
        };
    };

    // Copy to Clipboard
    const copyToClipboard = (text, field) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedField(field);
            setTimeout(() => setCopiedField(null), 2000);
        });
    };

    // Clear everything
    const clearAll = () => {
        setSelectedImage(null);
        setBase64("");
        setMimeType("");
        setCopiedField(null);
    };

    return (
        <section className="flex items-center bg-gradient-to-br from-[#f9fafb] to-[#e5e7eb] py-16 min-h-screen relative">
            {/* Background Effects */}
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

            {/* Main Container */}
            <div className="container mx-auto max-w-3xl p-6 bg-white shadow-lg rounded-xl mt-24 z-10">
                <motion.h2
                    variants={fadeIn("down", 0.2)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="text-3xl font-bold text-center text-gray-800 mb-6"
                >
                    Base64 Image Encoder
                </motion.h2>

                {/* Upload Box */}
                <div
                    className="border-2 border-dashed border-gray-400 p-6 rounded-lg text-center cursor-pointer bg-gray-100 hover:bg-gray-200 transition"
                    onClick={() => fileInputRef.current.click()}
                >
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                    />
                    <p className="text-gray-700">Click or drag an image here to upload</p>
                </div>

                {/* Clear Button */}
                {selectedImage && (
                    <button
                        onClick={clearAll}
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
                    >
                        Clear
                    </button>
                )}

                {/* Preview & Base64 Output */}
                {selectedImage && (
                    <motion.div
                        variants={fadeIn("up", 0.3)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md"
                    >
                        {/* Image Preview */}
                        <div className="mb-4 text-center flex justify-center flex-col items-center">
                            <p className="text-lg font-semibold text-gray-700">Image Preview:</p>
                            <div className="w-48 h-48 overflow-hidden">
                                <img
                                    src={selectedImage}
                                    alt="Uploaded"
                                    className="mx-auto mt-3 w-full h-full object-contain rounded-md shadow-md"
                                />
                            </div>
                        </div>

                        {/* Base64 Output */}
                        <div className="mb-4">
                            <div className="flex flex-row justify-between items-center relative">
                                <p className="text-lg font-semibold text-gray-700">Base64 String:</p>
                                <button
                                    onClick={() => copyToClipboard(base64, "base64")}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    <BiCopy className="w-5 h-5" />
                                </button>
                                {copiedField === "base64" && (
                                    <span className="absolute bottom-2 right-2 bg-black text-white px-2 py-1 rounded-md text-xs">
                                        Copied!
                                    </span>
                                )}
                            </div>
                            <div className="relative p-3 bg-gray-100 rounded-md text-sm text-gray-800 h-32 overflow-x-auto whitespace-nowrap">
                                {base64}
                            </div>
                        </div>

                        {/* Other Usages */}
                        {[
                            { label: "HTML Usage", value: `<img src="data:${mimeType};base64,${base64}" />`, id: "html" },
                            { label: "CSS Usage", value: `background-image: url("data:${mimeType};base64,${base64}");`, id: "css" },
                            { label: "JSON Usage", value: `{ "image": { "mime": "${mimeType}", "data": "${base64}" } }`, id: "json" },
                            { label: "XML Usage", value: `<?xml version="1.0" encoding="UTF-8"?>\n<root>\n  <image mime="${mimeType}">${base64}</image>\n</root>`, id: "xml" }
                        ].map(({ label, value, id }) => (
                            <div key={id} className="mb-4 mt-4">
                                <div className="flex flex-row justify-between items-center relative">
                                    <p className="text-lg font-semibold text-gray-700">{label}:</p>
                                    <button
                                        onClick={() => copyToClipboard(value, id)}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        <BiCopy className="w-5 h-5" />
                                    </button>
                                    {copiedField === id && (
                                        <span className="absolute bottom-2 right-2 bg-black text-white px-2 py-1 rounded-md text-xs">
                                            Copied!
                                        </span>
                                    )}
                                </div>
                                <div className="p-3 bg-gray-100 rounded-md text-sm text-gray-800 h-32 overflow-x-auto whitespace-nowrap">
                                    <pre>{value}</pre>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                )}

                <div className="relative mt-16 mb-10">
                    <div className="w-full h-1 bg-gradient-to-r from-gray-300 via-blue-500 to-gray-300 rounded-full"></div>
                </div>

                <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-200 rounded-xl shadow-xl text-center transition-all duration-300 hover:shadow-2xl mt-5">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-5">
                        Base64 Image Encoder – Convert Images to Base64 Instantly
                    </h2>

                    <p className="text-gray-700 leading-relaxed text-lg">
                        Need to <b className="text-accent">convert images to Base64 format</b>? Our <b className="text-accent">Base64 Image Encoder </b>
                        allows you to encode images into <b>Base64 strings</b> for use in <b>HTML, CSS, JSON, XML, JavaScript</b>, and more.
                        Simply upload an image, and within seconds, get the <b>Base64-encoded output</b> ready for embedding.
                    </p>

                    <br />

                    <p className="text-gray-700 leading-relaxed text-lg">
                        Base64 encoding is essential for <b>embedding images in web development, data URIs, inline HTML, and API responses</b>.
                        Whether you need a <b>Base64 string for a website, an email template, a JSON object</b>, or <b>inline CSS styles</b>, this tool generates it
                        <b> instantly with high accuracy</b>.
                    </p>

                    <br />

                    <div className="bg-white shadow-md p-6 rounded-lg mt-6 text-left">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">✨ Key Features & Benefits</h3>
                        <ul className="space-y-3 text-gray-700 text-lg">
                            <li>✅ <b className="text-green-500">Base64 Image Converter</b> – Instantly convert images to Base64.</li>
                            <li>✅ <b className="text-green-500">Base64 Encoder for HTML & CSS</b> – Embed images directly into code.</li>
                            <li>✅ <b className="text-green-500">Convert PNG to Base64</b> – Encode PNG images for easy web usage.</li>
                            <li>✅ <b className="text-green-500">Convert JPG to Base64</b> – Convert JPG/JPEG images into Base64 encoding.</li>
                            <li>✅ <b className="text-green-500">Base64 for JSON & XML</b> – Embed images inside JSON or XML APIs.</li>
                            <li>✅ <b className="text-green-500">Inline Image Encoding</b> – No need to host images externally.</li>
                            <li>✅ <b className="text-green-500">Base64 for Email Embedding</b> – Use images in email templates.</li>
                            <li>✅ <b className="text-green-500">Convert GIF to Base64</b> – Encode animated GIFs into Base64.</li>
                            <li>✅ <b className="text-green-500">Base64 for JavaScript</b> – Store images as Base64 for quick rendering.</li>
                            <li>✅ <b className="text-green-500">Fastest Base64 Encoder Online</b> – Process images instantly.</li>
                            <li>✅ <b className="text-green-500">Copy Base64 Code</b> – One-click copying for easy integration.</li>
                            <li>✅ <b className="text-green-500">Supports PNG, JPG, GIF, SVG & WebP</b> – Compatible with all major image formats.</li>
                            <li>✅ <b className="text-green-500">Base64 Data URI Generator</b> – Create data URIs for web applications.</li>
                            <li>✅ <b className="text-green-500">Base64 Decoder</b> – Convert Base64 back to an image.</li>
                            <li>✅ <b className="text-green-500">Base64 Image Preview</b> – Instantly preview the encoded image.</li>
                            <li>✅ <b className="text-green-500">Free Base64 Image Encoder</b> – 100% online, no software needed.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Base64Encode;
