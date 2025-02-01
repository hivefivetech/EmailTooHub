"use client";

// Icons
import { FaTelegramPlane, FaEnvelope, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeIn } from "../../../variants";
import Image from "next/image";
import Copyright from "./Copyright";
import { TbMedicalCross } from "react-icons/tb";

// Services Data
const services = [
    {
        name: "Email Extractor",
        link: "/email-extractor",
    },
    {
        name: "Email Validator",
        link: "/email-validator",
    },
    {
        name: "Email Splitter",
        link: "/email-splitter",
    },
    {
        name: "Inbox Checker",
        link: "https://inbox-checker.emailtoolhub.com/",
        external: true,
    },
    {
        name: "HTML Editor",
        link: "https://html-editor.emailtoolhub.com/",
        external: true,
    },
    {
        name: "Base64 Image Encoder",
        link: "/base64-image-encoder",
    },
    {
        name: "Email Domain Filter",
        link: "/email-domain-filter",
    },
    {
        name: "Random Name & Address Generator",
        link: "/random-name-address-generator",
    },
];

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-16 relative" id="contact">

            {/* Rotating Icon on Top Right */}
            <motion.div
                className="absolute top-24 right-20 text-accent opacity-30 w-6 h-6"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
                <TbMedicalCross className="w-full h-full" />
            </motion.div>

            {/* Rotating Icon on Bottom Left */}
            <motion.div
                className="absolute bottom-36 left-16 text-accent opacity-30 w-6 h-6"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
                <TbMedicalCross className="w-full h-full" />
            </motion.div>

            <div className="container mx-auto px-6 z-10">
                {/* Grid Layout */}
                <motion.div
                    variants={fadeIn("up", 0.2)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                >
                    {/* Logo & Description */}
                    <div className="flex flex-col items-start gap-y-6">
                        {/* <a href="/" className="cursor-pointer">
                            <Image src={"/icons/mainLogo.png"} width={100} height={90} alt="Logo" />
                        </a> */}
                        <h2 className="text-gray-300 font-bold text-2xl">EmailToolHub</h2>
                        <p className="text-lg text-gray-400 mb-8">
                            <b>Transform</b> your email workflow with <b>powerful tools</b> for <i>Email Validator | Email Extractor | Inbox Checker | Email Splitter | HTML Editor | Base64 Image Encoder | Email Domain Filter | Random Name & Address Generator</i>
                        </p>
                        {/* Contact Info */}
                        <div className="flex flex-col gap-y-3">
                            <a
                                href="https://t.me/ZplusMan"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-gray-400 hover:text-accent transition-all duration-300"
                            >
                                <FaTelegramPlane className="w-5 h-5" /> Telegram: @ZplusMan
                            </a>
                            {/* <a
                                href="mailto:jetstreammailer@gmail.com"
                                className="flex items-center gap-3 text-gray-400 hover:text-accent transition-all duration-300"
                            >
                                <FaEnvelope className="w-5 h-5" /> jetstreammailer@gmail.com
                            </a> */}
                        </div>
                    </div>

                    {/* Services List */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-6">Our Services</h3>
                        <ul className="flex flex-col gap-y-4">
                            {services.map((service, index) => (
                                <li key={index}>
                                    <a
                                        href={service.link}
                                        target={service.external ? "_blank" : "_self"}
                                        rel={service.external ? "noopener noreferrer" : ""}
                                        className="text-gray-400 hover:text-accent transition-colors duration-300"
                                    >
                                        {service.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Working Hours */}
                    {/* <div>
                        <h3 className="text-lg font-bold text-white mb-6">Working Hours</h3>
                        <div className="flex flex-col gap-y-3 text-gray-400">
                            <div className="flex items-center gap-3">
                                <FaClock className="w-5 h-5 text-accent" />
                                <span>Mon-Fri: <b>08:00AM - 11:00PM</b></span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaClock className="w-5 h-5 text-accent" />
                                <span>Sat: <b>08:00AM - 12:00PM</b></span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaClock className="w-5 h-5 text-accent" />
                                <span>Sun: <b>Closed</b></span>
                            </div>
                        </div>
                    </div> */}
                    {/* Blog, Terms and Conditions, Privacy Policy, FAQ */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-6">More Information</h3>
                        <ul className="flex flex-col gap-y-4">
                            <li>
                                <a
                                    href="/blog"
                                    className="text-gray-400 hover:text-accent transition-colors duration-300"
                                >
                                    Blog
                                </a>
                            </li>
                            {/* <li>
                                <a
                                    href="/terms-and-conditions"
                                    className="text-gray-400 hover:text-accent transition-colors duration-300"
                                >
                                    Terms and Conditions
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/privacy-policy"
                                    className="text-gray-400 hover:text-accent transition-colors duration-300"
                                >
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/faq"
                                    className="text-gray-400 hover:text-accent transition-colors duration-300"
                                >
                                    FAQ
                                </a>
                            </li> */}
                        </ul>
                    </div>
                </motion.div>
            </div>

            {/* Copyright Section */}
            <div className="border-t border-gray-700 mt-12 pt-6">
                <Copyright />
            </div>
        </footer>
    );
};

export default Footer;
