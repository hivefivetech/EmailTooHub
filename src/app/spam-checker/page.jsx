"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../../variants";
import { useSpamChecker } from "../hooks/useSpamChecker";

const SpamChecker = () => {
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const { checkSpam, result, loading, error } = useSpamChecker();
    const [highlightedText, setHighlightedText] = useState("");
    const [spamScore, setSpamScore] = useState(0);
    const [suggestions, setSuggestions] = useState([]);
    const [wordCount, setWordCount] = useState(0);
    const [letterCount, setLetterCount] = useState(0);
    const [readTime, setReadTime] = useState("0 sec");

    const categoryColors = {
        urgency: "text-red-600 bg-red-100",
        shady: "text-pink-600 bg-pink-100",
        overpromise: "text-yellow-600 bg-yellow-100",
        unnatural: "text-blue-600 bg-blue-100",
        authority: "text-purple-600 bg-purple-100",
    };

    const handleCheckSpam = async () => {
        if (!subject || !body) return;
        checkSpam(subject, body);
    };

    useEffect(() => {
        if (result) {
            const { highlighted, score, suggestionsList } = processSpamResult(result);
            setHighlightedText(highlighted);
            setSpamScore(score);
            setSuggestions(suggestionsList);
        }
    }, [result]);

    useEffect(() => {
        const words = body.trim().split(/\s+/).filter(word => word !== "");
        setWordCount(words.length);
        setLetterCount(body.replace(/\s+/g, "").length);
        setReadTime(words.length > 0 ? `${Math.ceil(words.length / 200)} min` : "0 sec");
    }, [body]);

    const processSpamResult = (data) => {
        try {
            const jsonString = data.replace(/```json|```/g, "").trim();
            const parsedData = JSON.parse(jsonString);
            let highlighted = body;
            let suggestionsList = [];

            Object.entries(parsedData.categories).forEach(([category, words]) => {
                words.forEach(({ word, suggestion }) => {
                    highlighted = highlighted.replace(
                        new RegExp(`\\b${word}\\b`, "gi"),
                        `<span class="px-1 ${categoryColors[category]} font-semibold rounded">${word}</span>`
                    );
                    suggestionsList.push({ word, suggestion, category });
                });
            });

            return {
                highlighted,
                score: parsedData.spam_score || 0,
                suggestionsList
            };
        } catch (error) {
            console.error("Error processing spam result:", error);
            return { highlighted: body, score: 0, suggestionsList: [] };
        }
    };

    return (
        <section className="flex items-center bg-gradient-to-br from-[#f9fafb] to-[#e5e7eb] py-16 min-h-screen relative">
            <div className="container mx-auto px-6 lg:px-12 text-center max-w-5xl mt-24">
                <motion.h2
                    variants={fadeIn("down", 0.2)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.6 }}
                    className="text-4xl font-bold text-gray-800 mb-6"
                >
                    📩 Spam Checker – AI-Powered Analysis
                </motion.h2>

                <p className="text-gray-700 leading-relaxed text-lg mb-6">
                    Ensure your email content is <b>spam-free</b> before sending. Our AI tool <b>analyzes spam words, urgency, overpromises</b> and helps you <b>improve email deliverability</b>.
                </p>

                <input
                    type="text"
                    placeholder="Enter Email Subject..."
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-sm"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />

                <textarea
                    placeholder="Paste email content here..."
                    className="w-full h-40 p-4 border border-gray-300 rounded-lg shadow-sm"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                ></textarea>

                <button
                    onClick={handleCheckSpam}
                    className="w-full bg-blue-500 text-white py-3 mt-4 rounded-lg hover:bg-blue-600 transition shadow-lg flex justify-center items-center"
                    disabled={loading}
                >
                    {loading ? (
                        <div className="h-5 w-5 border-t-2 border-white border-solid rounded-full animate-spin"></div>
                    ) : (
                        "Check Spam"
                    )}
                </button>

                {error && <p className="text-red-500 mt-4">{error}</p>}

                {result && (
                    <>
                        <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">📊 Spam Score</h3>
                            <div className="w-full bg-gray-300 rounded-full h-4">
                                <div
                                    className={`h-4 rounded-full ${spamScore < 50 ? "bg-green-500" : spamScore < 80 ? "bg-yellow-500" : "bg-red-500"}`}
                                    style={{ width: `${spamScore}%` }}
                                ></div>
                            </div>
                            <p className="text-lg text-gray-700 mt-2">
                                <b>{spamScore}/100</b> - {spamScore < 50 ? "Good" : spamScore < 80 ? "Needs Improvement" : "High Spam Risk"}
                            </p>
                        </div>

                        <div className="mt-6 bg-white p-6 rounded-lg shadow-lg text-left">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">📜 Email Preview</h3>
                            <div className="border-b pb-2 text-xl font-bold">{subject}</div>
                            <p
                                className="text-gray-700 leading-relaxed text-lg whitespace-pre-line mt-2"
                                dangerouslySetInnerHTML={{ __html: highlightedText }}
                            ></p>
                        </div>

                        <div className="mt-6 bg-white p-6 rounded-lg shadow-lg text-left">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">💡 Suggested Improvements</h3>
                            <ul className="text-lg text-gray-700 space-y-2">
                                {suggestions.map((s, index) => (
                                    <li key={index} className={`p-3 rounded-lg shadow-md ${categoryColors[s.category]}`}>
                                        <b className="text-gray-900">{s.word}</b> → <span className="text-gray-800 italic">{s.suggestion}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-6 bg-white p-6 rounded-lg shadow-lg text-left">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">📝 Text Stats</h3>
                            <ul className="text-lg text-gray-700 space-y-2">
                                <li>📝 <b>Words:</b> {wordCount}</li>
                                <li>🔡 <b>Letters:</b> {letterCount}</li>
                                <li>⏳ <b>Estimated Read Time:</b> {readTime}</li>
                            </ul>
                        </div>
                    </>
                )}

                <div className="relative mt-16 mb-10">
                    <div className="w-full h-1 bg-gradient-to-r from-gray-300 via-green-500 to-gray-300 rounded-full"></div>
                </div>

                <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-200 rounded-xl shadow-xl text-center transition-all duration-300 hover:shadow-2xl mt-5">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-5">
                        Spam Checker – Analyze Email Content Instantly
                    </h2>

                    <p className="text-gray-700 leading-relaxed text-lg">
                        Concerned about your emails landing in the <b className="text-accent">spam folder</b>? Our tool scans your email content for <b>spam triggers, urgency words, overpromises, and shady phrases</b>,
                        helping you improve <b>deliverability and inbox placement</b>.
                    </p>

                    <br />

                    <p className="text-gray-700 leading-relaxed text-lg">
                        Ensure your emails reach the <b className="text-accent">primary inbox</b> by eliminating spammy language. Our tool provides a detailed <b>spam score analysis</b>,
                        so you can refine your content and avoid common mistakes that <b>trigger spam filters</b>.
                    </p>

                    <br />

                    <div className="bg-white shadow-md p-6 rounded-lg mt-6 text-left">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">🚀 Key Features & Benefits</h3>
                        <ul className="space-y-3 text-gray-700 text-lg">
                            <li>✅ <b className="text-green-500">Free spam checker</b> - Instantly analyze your email content.</li>
                            <li>✅ <b className="text-green-500">Detect spam trigger words</b> - Identify words that flag spam filters.</li>
                            <li>✅ <b className="text-green-500">Check urgency words</b> - Find excessive urgency in your content.</li>
                            <li>✅ <b className="text-green-500">Overpromise detection</b> - Avoid misleading phrases that reduce trust.</li>
                            <li>✅ <b className="text-green-500">Shady language alerts</b> - Eliminate questionable words from your emails.</li>
                            <li>✅ <b className="text-green-500">Authority words filter</b> - Identify words that mimic government warnings.</li>
                            <li>✅ <b className="text-green-500">Spam score analysis</b> - Get an instant spam rating for your email.</li>
                            <li>✅ <b className="text-green-500">Improve email deliverability</b> - Optimize emails for better inbox placement.</li>
                            <li>✅ <b className="text-green-500">Prevent emails from going to spam</b> - Adjust content before sending.</li>
                            <li>✅ <b className="text-green-500">Works for cold emails & marketing</b> - Optimize outreach for better engagement.</li>
                            <li>✅ <b className="text-green-500">No software needed</b> - 100% free and browser-based.</li>
                            <li>✅ <b className="text-green-500">Perfect for email marketers</b> - Enhance campaign effectiveness.</li>
                            <li>✅ <b className="text-green-500">SEO-friendly content check</b> - Ensure your emails remain professional.</li>
                            <li>✅ <b className="text-green-500">Easy-to-use interface</b> - Simply paste your content and get results.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SpamChecker;
