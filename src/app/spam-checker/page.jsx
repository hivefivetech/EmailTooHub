"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../../variants";

const SpamChecker = () => {
    const [inputText, setInputText] = useState("");
    const [spamCounts, setSpamCounts] = useState({
        urgency: 0,
        shady: 0,
        overpromise: 0,
        unnatural: 0,
        authority: 0,
    });
    const [wordCount, setWordCount] = useState(0);
    const [letterCount, setLetterCount] = useState(0);
    const [readTime, setReadTime] = useState("0 sec");
    const [highlightedText, setHighlightedText] = useState("");

    const spamIndicators = {
        urgency: {
            words: [
                "ASAP", "urgent", "act now", "immediate response", "limited time", "don't miss out", "expires soon", "last chance", "hurry", "final call", "time-sensitive", "rush", "today only", "now or never", "closing soon", "instant access", "final hours", "while supplies last", "only a few left", "offer expires"
            ],
            color: "text-red-500 bg-red-100 px-1 rounded"
        },
        shady: {
            words: [
                "privately owned funds", "financial consultant", "risk-free", "no catch", "no hidden costs", "no hidden fees", "no gimmick", "no obligation", "no credit check", "no fees", "no cost", "no credit card required", "eliminate debt", "credit card debt", "consolidate your debt", "pre-approved loan", "easy money", "get rich quick", "double your money", "unclaimed funds", "unclaimed prize", "claim your prize", "life-changing opportunity", "congratulations", "you've won", "winner", "prize", "prizes", "bonus", "exclusive deal", "exclusive offer", "limited offer", "special offer", "best price", "clearance", "discount", "sale", "mega sale", "all-new", "member", "unbelievable results", "fantastic deal", "drastically reduced", "outstanding values", "promise you", "real thing", "satisfaction guaranteed"
            ],
            color: "text-pink-500 bg-pink-100 px-1 rounded"
        },
        overpromise: {
            words: [
                "100% free", "guaranteed", "risk-free", "no catch", "no hidden cost", "promise you", "satisfaction guaranteed", "money-back guarantee", "get rich quick", "earn extra cash", "make money fast", "double your money", "unbelievable results", "fantastic deal", "drastically reduced", "outstanding values", "real thing", "winner", "prize", "prizes", "bonus", "exclusive deal", "exclusive offer", "limited offer", "special offer", "best price", "clearance", "discount", "sale", "mega sale", "all-new", "amazing", "certified", "congratulations", "it's effective", "risk-free trial", "free sample", "free gift", "free access", "free consultation", "free info", "free membership", "free preview", "free quote", "free trial", "free website", "no obligation", "no purchase necessary", "no questions asked", "no strings attached", "zero cost", "zero obligation", "zero risk"
            ],
            color: "text-yellow-500 bg-yellow-100 px-1 rounded"
        },
        unnatural: {
            words: [
                "Dear friend", "beloved", "lucky winner", "dear customer", "dear valued customer", "greetings", "greetings friend", "greetings from", "attention required",
                "important notice", "important information", "urgent request", "urgent action required",
                "notification regarding", "notice of", "alert regarding", "update on your account",
                "reminder for", "confirmation needed", "verification required", "validate your account",
                "authorize this transaction", "acknowledge receipt", "invoice for your order",
                "billing update", "payment overdue", "transaction alert", "shipment tracking",
                "delivery confirmation", "membership renewal", "account suspension", "service interruption",
                "support ticket update", "assistance required", "help request", "critical update",
                "unusual activity detected", "security warning", "final reminder", "last warning",
                "act fast", "your attention needed", "your response required", "reply immediately",
                "please confirm", "click to verify", "click to activate", "click to restore access",
                "failure to respond", "action needed now", "resolve this issue", "sensitive information update"
            ],
            color: "text-blue-500 bg-blue-100 px-1 rounded"
        },
        authority: {
            words: [
                "IRS", "Internal Revenue Service", "FBI", "Federal Bureau of Investigation", "Government agency",
                "Your account has been suspended", "your account will be closed", "legal action", "court order",
                "warrant for your arrest", "your social security number", "your credit card has been blocked",
                "your bank account has been compromised", "official notice", "subpoena", "jury duty",
                "federal investigation", "compliance notice", "homeland security", "court proceedings",
                "law enforcement request", "background check required", "mandatory compliance"
            ],
            color: "text-purple-500 bg-purple-100 px-1 rounded"
        },
    };

    useEffect(() => {
        let updatedCounts = { urgency: 0, shady: 0, overpromise: 0, unnatural: 0, authority: 0 };
        let modifiedText = inputText;

        Object.entries(spamIndicators).forEach(([category, { words, color }]) => {
            words.forEach((word) => {
                const regex = new RegExp(`\\b${word}\\b`, "gi");
                const matches = inputText.match(regex);
                if (matches) {
                    updatedCounts[category] += matches.length;
                    modifiedText = modifiedText.replace(regex, `<span class="${color}">${word}</span>`);
                }
            });
        });

        setSpamCounts(updatedCounts);
        setHighlightedText(modifiedText);

        // Update word and letter count
        const words = inputText.trim().split(/\s+/).filter(word => word !== "");
        setWordCount(words.length);
        setLetterCount(inputText.replace(/\s+/g, "").length);
        setReadTime(words.length > 0 ? `${Math.ceil(words.length / 200)} min` : "0 sec");

    }, [inputText]);

    return (
        <section className="flex items-center bg-gradient-to-br from-[#f9fafb] to-[#e5e7eb] py-16 min-h-screen relative">
            {/* Background Accents */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#f9fafb]/50 to-[#e5e7eb]/50 z-0"></div>
            <div className="absolute -bottom-16 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>

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
                    Spam Checker – Analyze Your Email Content Instantly
                </motion.h2>

                <p className="text-gray-700 leading-relaxed text-lg mb-6">
                    Ensure your email content is <b>spam-free</b> before sending. Our tool <b>detects spam triggers</b>,
                    <b> overpromises</b>, and <b>shady words</b> that might <b>land your emails in spam folders</b>.
                </p>

                <div className="bg-white shadow-md p-6 rounded-lg">
                    <textarea
                        className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                        placeholder="Paste your email content here..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                    ></textarea>
                </div>

                {/* Live Updating Paragraph with Highlighted Spam Words */}
                <div className="mt-6 bg-white p-6 rounded-lg shadow-lg text-left">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">📜 Preview with Spam Highlights</h3>
                    <p
                        className="text-gray-700 leading-relaxed text-lg"
                        dangerouslySetInnerHTML={{ __html: highlightedText }}
                    ></p>
                </div>

                {/* Spam Word Counts */}
                <div className="mt-6 bg-white p-6 rounded-lg shadow-lg text-left">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">📊 Spam Word Count</h3>
                    <ul className="text-lg text-gray-700 space-y-2">
                        <li className="text-red-500">🚨 Urgency Words: <b>{spamCounts.urgency}</b></li>
                        <li className="text-pink-500">🔍 Shady Words: <b>{spamCounts.shady}</b></li>
                        <li className="text-yellow-500">💡 Overpromise Words: <b>{spamCounts.overpromise}</b></li>
                        <li className="text-blue-500">🤖 Unnatural Words: <b>{spamCounts.unnatural}</b></li>
                        <li className="text-purple-500">⚖️ Authority Words: <b>{spamCounts.authority}</b></li>
                    </ul>
                </div>

                {/* Word Stats */}
                <div className="mt-6 bg-white p-6 rounded-lg shadow-lg text-left">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">📊 Text Stats</h3>
                    <ul className="text-lg text-gray-700 space-y-2">
                        <li>📝 <b>Words:</b> {wordCount}</li>
                        <li>🔡 <b>Letters:</b> {letterCount}</li>
                        <li>⏳ <b>Estimated Read Time:</b> {readTime}</li>
                    </ul>
                </div>

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
