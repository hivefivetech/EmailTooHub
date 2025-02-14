"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useConversion } from "../hooks/useConversion";
import { FiUploadCloud } from "react-icons/fi";
import { fadeIn } from "../../../variants";
import { TbMedicalCross, TbFileTypeJpg, TbFileTypePng, TbFileTypePdf, TbFileTypeTxt, TbFileTypeDoc } from "react-icons/tb";
import { GrDocumentImage } from "react-icons/gr";

const HtmlToAny = () => {
    const [fileName, setFileName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFormat, setSelectedFormat] = useState("");
    const fileInputRef = useRef(null);
    const [previewImage, setPreviewImage] = useState("");
    const [error, setError] = useState("");

    const { handleConversion, loading } = useConversion();

    // Handle File Upload
    const handleFileUpload = (event) => {
        const file = event.target.files[0];

        if (!file) {
            setError("No file selected.");
            return;
        }

        if (file.type !== "text/html") {
            setError("Please upload a valid HTML file.");
            return;
        }

        setFileName(file.name);
        setSelectedFile(file);
        setError("");
    };

    // Handle API Call for Conversion
    const handleConvert = async () => {
        if (!selectedFile || !selectedFormat) {
            setError("Please select a format and upload a file.");
            return;
        }

        const convertedUrl = await handleConversion(selectedFile, selectedFormat);
        if (convertedUrl) {
            setPreviewImage(convertedUrl);
        }
    };

    // Handle Download
    const handleDownload = () => {
        if (previewImage) {
            const link = document.createElement("a");
            link.href = previewImage;
            link.download = `converted.${selectedFormat.toLowerCase()}`;

            if (selectedFormat === "PDF" || selectedFormat === "TXT") {
                link.target = "_blank";
            }

            if (selectedFormat === "DOCX") {
                link.download = "converted.docx";
            }

            if (selectedFormat === "WEBP") {
                link.download = "converted.webp";
            }

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    // Clear All
    const handleClear = () => {
        setFileName("");
        setSelectedFile(null);
        setPreviewImage("");
        setError("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <section className="flex items-center bg-gradient-to-br from-[#f9fafb] to-[#e5e7eb] py-16 min-h-screen relative">
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
                <motion.h2
                    variants={fadeIn("down", 0.2)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.6 }}
                    className="text-3xl font-bold text-gray-800 mb-6"
                >
                    HTML to Any Converter
                </motion.h2>

                {/* Under Construction Notice */}
                <motion.div
                    variants={fadeIn("down", 0.3)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.6 }}
                    className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 mb-6 rounded-lg text-lg"
                >
                    🚧 This feature is currently under construction. Some conversions may not work as expected. Stay tuned for updates!
                </motion.div>

                <motion.p
                    variants={fadeIn("down", 0.4)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.6 }}
                    className="text-lg text-gray-600 mb-8"
                >
                    Convert <b className="text-accent">HTML files</b> into multiple formats, including <b>JPG, PNG, PDF, TXT, DOCX and WebP.</b>
                    Select the format you need, upload your HTML file, and get your converted file <b>instantly</b>.
                </motion.p>

                {/* Format Selection */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                    {[
                        { format: "JPG", icon: <TbFileTypeJpg className="text-4xl text-blue-600" /> },
                        { format: "PNG", icon: <TbFileTypePng className="text-4xl text-green-600" /> },
                        { format: "PDF", icon: <TbFileTypePdf className="text-4xl text-red-600" /> },
                        { format: "TXT", icon: <TbFileTypeTxt className="text-4xl text-teal-600" /> },
                        { format: "DOCX", icon: <TbFileTypeDoc className="text-4xl text-purple-600" /> },
                        { format: "WEBP", icon: <GrDocumentImage className="text-4xl text-yellow-600" /> },
                    ].map(({ format, icon }) => (
                        <motion.div
                            key={format}
                            whileHover={{ scale: 1.1 }}
                            className={`p-4 border-2 rounded-lg shadow-md bg-white text-center cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-blue-500
                                ${selectedFormat === format ? "border-blue-500 shadow-lg bg-blue-50" : "border-gray-200"}`}
                            onClick={() => setSelectedFormat(format)}
                        >
                            {icon}
                            <p className="text-lg font-semibold text-gray-700 mt-2">HTML to {format}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Upload Section */}
                {selectedFormat && (
                    <div>
                        <p className="text-lg font-semibold text-gray-700 mt-6">
                            Selected Format: <b className="text-blue-600">HTML to {selectedFormat}</b>
                        </p>

                        <div
                            className="border-2 border-dashed border-gray-400 p-6 rounded-lg text-center cursor-pointer bg-gray-100 hover:bg-gray-200 transition mb-4 flex flex-col items-center mt-4"
                            onClick={() => fileInputRef.current.click()}
                        >
                            <input type="file" accept=".html" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
                            <FiUploadCloud className="text-gray-700 text-4xl mb-2" />
                            <p className="text-gray-700">Click or drag an HTML file here to upload</p>
                        </div>

                        {fileName && <p className="text-gray-700 mt-2"><b>{fileName}</b></p>}
                        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

                        {/* Convert & Clear Buttons */}
                        <div className="flex flex-row justify-center items-center gap-3 mt-4">
                            <button onClick={handleConvert} disabled={loading || !fileName}
                                className={`px-6 py-3 font-semibold text-lg rounded-lg shadow-md transition-all duration-300 
                                ${fileName ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}>
                                {loading ? "Converting..." : `🚀 Convert to ${selectedFormat}`}
                            </button>

                            {fileName && (
                                <button onClick={handleClear} className="px-6 py-3 font-semibold text-lg rounded-lg shadow-md bg-red-600 text-white hover:bg-red-700">
                                    Clear
                                </button>
                            )}
                        </div>

                        {/* {previewImage && selectedFormat !== "PDF" && selectedFormat !== "TXT" && selectedFormat !== "DOCX" && selectedFormat !== "WEBP" && ( */}
                        {previewImage && selectedFormat !== "PDF" && selectedFormat !== "TXT" && selectedFormat !== "DOCX" && (
                            <div className="mt-4 w-full flex justify-center">
                                <img src={previewImage} alt="Converted Preview" className="w-[300px] h-[300px] border rounded-lg shadow-md" />
                            </div>
                        )}

                        {previewImage && selectedFormat === "PDF" && (
                            <div className="mt-4 text-center">
                                <p className="text-lg font-semibold text-gray-700">Your PDF file is ready to download.</p>
                            </div>
                        )}

                        {previewImage && selectedFormat === "TXT" && (
                            <div className="mt-4 text-center">
                                <p className="text-lg font-semibold text-gray-700">Your TXT file is ready to download.</p>
                            </div>
                        )}

                        {previewImage && selectedFormat === "DOCX" && (
                            <div className="mt-4 text-center">
                                <p className="text-lg font-semibold text-gray-700">Your DOCX file is ready to download.</p>
                            </div>
                        )}

                        {/* {previewImage && selectedFormat === "WEBP" && (
                            <div className="mt-4 w-full flex justify-center">
                                <img src={previewImage} alt="Converted WebP" className="w-[300px] h-[300px] border rounded-lg shadow-md" />
                            </div>
                        )} */}

                        {previewImage && (
                            <button onClick={handleDownload} className="mt-4 px-4 py-2 border rounded bg-green-600 text-white">
                                Download {selectedFormat}
                            </button>
                        )}
                    </div>
                )}

                <div className="relative mt-16 mb-10">
                    <div className="w-full h-1 bg-gradient-to-r from-gray-300 via-blue-500 to-gray-300 rounded-full"></div>
                </div>

                <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-200 rounded-xl shadow-xl text-center transition-all duration-300 hover:shadow-2xl mt-5">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-5">
                        HTML Converter – Convert HTML to JPG, PNG, PDF, TXT, DOCX & WebP
                    </h2>

                    <p className="text-gray-700 leading-relaxed text-lg">
                        Need to <b className="text-accent">convert HTML files</b> into various formats?
                        Our <b className="text-accent">HTML Converter</b> allows you to transform HTML into <b>JPG, PNG, PDF, TXT, DOCX, and WebP</b>.
                        Simply <b>upload your HTML file</b>, select your <b>desired format</b>, and download the converted file <b>instantly</b>.
                    </p>

                    <br />

                    <div className="bg-white shadow-md p-6 rounded-lg mt-6 text-left">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">✨ Key Features & Benefits</h3>
                        <ul className="space-y-3 text-gray-700 text-lg">
                            <li>✅ <b className="text-green-500">Convert HTML to JPG</b> - Capture full-page screenshots as JPG.</li>
                            <li>✅ <b className="text-green-500">Convert HTML to PNG</b> - High-quality PNG conversion.</li>
                            <li>✅ <b className="text-green-500">Convert HTML to PDF</b> - Save web pages as printable PDFs.</li>
                            <li>✅ <b className="text-green-500">Convert HTML to TXT</b> - Extract plain text from HTML content.</li>
                            <li>✅ <b className="text-green-500">Convert HTML to DOCX</b> - Preserve text formatting in Word files.</li>
                            <li>✅ <b className="text-green-500">Convert HTML to WebP</b> - Modern, optimized image format.</li>
                            <li>✅ <b className="text-green-500">Free Online HTML Converter</b> - No software installation required.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HtmlToAny;
