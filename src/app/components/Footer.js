"use client"

// Icons
import { FaTelegram, FaEnvelope } from "react-icons/fa6"
import { FaTelegramPlane } from "react-icons/fa";

// Framer Motion
import { motion } from "framer-motion"

// Variants
import { fadeIn } from "../../../variants"

// Next Image
import Image from "next/image"

// Components
import Copyright from "./Copyright"

// Link / React Sroll
import { Link } from 'react-scroll'

const Footer = () => {
    return (
        <footer className="pt-20 bg-[#ebebeb] z-20" id="contact">
            <div className="container mx-auto mb-24">
                {/* Grid */}
                <motion.div
                    variants={fadeIn('up', 0.2)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.6 }}
                    className="flex flex-col lg:flex-row lg:justify-between gap-x-5 gap-y-14"
                >
                    <div className="flex flex-col flex-1 gap-y-8">
                        {/* Logo */}
                        <Link to="home" smooth={true} spy={true} className="cursor-pointer">
                            <Image src={'/icons/logo_175x83.png'} width={75} height={75} alt='' />
                        </Link>

                        {/* Text */}
                        <div className="text-secondary">Best site for marketing tool</div>

                        {/* Telegram & Email */}
                        <div className="flex flex-col gap-y-4 font-semibold">

                            {/* Telegram */}
                            <div className="flex items-center gap-x-[10px]">
                                <FaTelegramPlane className="w-5 h-5" />
                                <a
                                    href="https://t.me/ZplusMan"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-medium text-black hover:text-red-700 duration-300"
                                >
                                    Zplusman
                                </a>
                            </div>

                            {/* Email */}
                            <div className="flex items-center gap-x-[10px]">
                                <FaEnvelope className="w-5 h-5" />
                                <a
                                    href="mailto:jetstreammailer@gmail.com"
                                    className="font-medium text-black hover:text-red-700 duration-300"
                                >
                                    jetstreammailer@gmail.com
                                </a>
                            </div>

                        </div>
                    </div>

                    {/* Links */}
                    <div className="flex-1 flex flex-col xl:items-center">
                        <div>
                            <h3 className="h3 font-bold mb-8">Company</h3>
                            <ul className="flex flex-col gap-y-4 font-semibold">
                                <li><a href="">India</a></li>
                                <li><a href="">Careers</a></li>
                                <li><a href="">Mobile</a></li>
                                <li><a href="">Blog</a></li>
                                <li><a href="">How We Work</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Program */}
                    <div className="flex-1">
                        <h3 className="h3 font-bold mb-8">Working Hours</h3>
                        <div className="flex flex-col gap-y-4">
                            <div className="flex gap-x-2">
                                <div className="text-secondary">Mon-Fri:</div>
                                <div className="font-semibold">08:00AM - 11:00PM</div>
                            </div>
                            <div className="flex gap-x-2">
                                <div className="text-secondary">Sat:</div>
                                <div className="font-semibold">08:00AM - 12:00PM</div>
                            </div>
                            <div className="flex gap-x-2">
                                <div className="text-secondary">Sun:</div>
                                <div className="font-semibold">Closed</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
            <Copyright />
        </footer>
    )
}

export default Footer