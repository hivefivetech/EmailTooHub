"use client"

import { useContext, useEffect, useState, useRef } from "react";

// Next Image
import Image from "next/image";
import Link from "next/link";

// React Scroll
// import { Link as ScrollLink } from 'react-scroll';

// Components
import SearchMobile from "./SearchMobile";

// Media Query Hook
import { useMediaQuery } from "react-responsive";

// Icons
import { BiLogOut, BiMenuAltRight, BiUser, BiX } from 'react-icons/bi';

// Search Context
import { SearchContext } from "../context/Search";
import { useRouter } from "next/navigation";
import { MdDashboard } from "react-icons/md";

const Header = () => {
    const { setSearchActive } = useContext(SearchContext)
    const [header, setHeader] = useState(false);
    const [nav, setNav] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const user = localStorage.getItem("userToken");
        setIsLoggedIn(!!user);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("userToken");
        setIsLoggedIn(false);
        router.replace("/");
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        if (typeof window !== "undefined" && document) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            if (typeof window !== "undefined" && document) {
                document.removeEventListener('mousedown', handleClickOutside);
            }
        };
    }, []);

    const desktopMode = useMediaQuery({
        query: '(min-width: 1300px)',
    });

    useEffect(() => {
        const handleScroll = () => {
            // Header
            if (window.scrollY > 40) {
                setHeader(true);
            } else {
                setHeader(false);
            }

            // Search
            if (window.scrollY > 800) {
                setSearchActive(true)
            } else {
                setSearchActive(false)
            }
        };

        // Adding Event Listener
        window.addEventListener('scroll', handleScroll);

        // Remove Event Listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });

    useEffect(() => {
        const handleNavigation = () => {
            setNav(false);
            setDropdownOpen(false);
        };

        document.querySelectorAll("a, button").forEach((element) => {
            element.addEventListener("click", handleNavigation);
        });

        return () => {
            document.querySelectorAll("a, button").forEach((element) => {
                element.removeEventListener("click", handleNavigation);
            });
        };
    }, []);

    return (
        <header className={`${header ? 'bg-white shadow-md py-2' : 'bg-transparent shadow-none py-4'} fixed w-full max-w-[1920px] z-20 transition-all duration-300`}>
            <div className="xl:container mx-auto flex flex-col xl:flex-row xl:items-center xl:justify-between">
                <div className="flex justify-between items-center px-4">
                    {/* Logo */}
                    <Link href="/" className="cursor-pointer">
                        <Image src={'/icons/mainLogo.png'} width={90} height={65} alt='Icon' />
                    </Link>

                    {/* Nav Open Menu */}
                    <div onClick={() => setNav(!nav)} className="cursor-pointer xl:hidden">
                        {nav ? <BiX className="text-4xl" /> : <BiMenuAltRight className="text-4xl" />}
                    </div>
                </div>

                {/* Nav */}
                <nav className={`${nav ? 'max-h-max py-8 px-4 xl:py-0 xl:px-0' : 'max-h-0 xl:max-h-max'} flex flex-col w-full bg-white gap-y-6 overflow-hidden font-bold xl:font-medium xl:flex-row xl:w-max xl:gap-x-8 xl:h-max xl:bg-transparent xl:pb-0 transition-all duration-300 text-center xl:text-left uppercase text-sm xl:text-[15px] xl:normal-case`}>
                    <Link
                        className="cursor-pointer text-gray-700 hover:text-red-600 transition duration-300 hover:translate-y-[-2px]"
                        href="/"
                        activeclass="active"
                    >
                        Home
                    </Link>

                    <a
                        className="cursor-pointer text-gray-700 hover:text-red-600 transition duration-300 hover:translate-y-[-2px]"
                        href="https://inbox-checker.emailtoolhub.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        activeclass="active"
                    >
                        Inbox Checker
                    </a>

                    <Link
                        className="cursor-pointer text-gray-700 hover:text-red-600 transition duration-300 hover:translate-y-[-2px]"
                        href="/email-validator"
                        activeclass="active"
                    >
                        Email Validator
                    </Link>

                    <Link
                        className="cursor-pointer text-gray-700 hover:text-red-600 transition duration-300 hover:translate-y-[-2px]"
                        href="/base64-image-encoder"
                        activeclass="active"
                    >
                        Base64 Image Encoder
                    </Link>

                    <Link
                        className="cursor-pointer text-gray-700 hover:text-red-600 transition duration-300 hover:translate-y-[-2px]"
                        href="/blog"
                        activeclass="active"
                    >
                        Blog
                    </Link>

                    {!isLoggedIn ? (
                        <Link href="/login" className="flex gap-1 items-center justify-center cursor-pointer text-gray-700 hover:text-red-600 transition duration-300 hover:translate-y-[-2px]">
                            {/* <BiUser size={24} /> */}
                            <p>Login</p>
                        </Link>
                    ) : (
                        <>
                            {/* Dashboard Icon */}
                            <Link href="/dashboard" className="flex gap-1 items-center justify-center cursor-pointer text-gray-700 hover:text-red-600 transition duration-300 hover:translate-y-[-2px]">
                                {/* <MdDashboard size={24} /> */}
                                <p>Dashboard</p>
                            </Link>

                            {/* Logout Icon */}
                            <button onClick={handleLogout} className="flex gap-1 items-center justify-center cursor-pointer text-gray-700 hover:text-red-600 transition duration-300 hover:translate-y-[-2px]">
                                {/* <BiLogOut size={24} /> */}
                                <p>Logout</p>
                            </button>
                        </>
                    )}

                    {/* Dropdown */}
                    {/* <div ref={dropdownRef}>
                        <div
                            className="cursor-pointer hover:font-bold duration-300"
                            onClick={toggleDropdown}
                        >
                            Services
                        </div>
                        <div className={`absolute left-1/2 xl:left-[70%] flex flex-col w-44 bg-white border border-gray-300 rounded shadow-lg ${dropdownOpen ? '' : 'hidden'}`}>
                            <Link href="email-extractor" className="block cursor-pointer hover:font-bold duration-300 px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={() => setDropdownOpen(false)}>Email Extractor</Link>
                            <a href="https://html-editor.emailtoolhub.com/" target="_blank" rel="noopener noreferrer" className="block cursor-pointer hover:font-bold duration-300 px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={() => setDropdownOpen(false)}>Html Editor</a>
                            <a href="https://inbox-checker.emailtoolhub.com/" target="_blank" rel="noopener noreferrer" className="block cursor-pointer hover:font-bold duration-300 px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={() => setDropdownOpen(false)}>Inbox Checker</a>
                            <Link href="base64-image-encoder" className="block cursor-pointer hover:font-bold duration-300 px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={() => setDropdownOpen(false)}>Base64</Link>
                            <Link href="email-validator" className="block cursor-pointer hover:font-bold duration-300 px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={() => setDropdownOpen(false)}>Email Validator</Link>
                            <Link href="email-splitter" className="block cursor-pointer hover:font-bold duration-300 px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={() => setDropdownOpen(false)}>Email Splitter</Link>
                            <Link href="random-name-address-generator" className="block cursor-pointer hover:font-bold duration-300 px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={() => setDropdownOpen(false)}>Random Name & Address Generator</Link>
                        </div>
                    </div> */}

                    {/* <ScrollLink
                        className="cursor-pointer hover:font-bold duration-300"
                        to="services"
                        activeclass="active"

                    >
                        Features
                    </ScrollLink> */}

                    {/* <ScrollLink
                        className="cursor-pointer hover:font-bold duration-300"
                        to="about"
                        activeclass="active"

                    >
                        About
                    </ScrollLink>

                    <ScrollLink
                        className="cursor-pointer hover:font-bold duration-300"
                        to="why"
                        activeclass="active"

                    >
                        Why Us
                    </ScrollLink> */}

                    {/* <ScrollLink
                        className="cursor-pointer hover:font-bold duration-300"
                        to="testimonial"
                        activeclass="active"

                    >
                        Testimonials
                    </ScrollLink> */}

                    {/* <ScrollLink
                        className="cursor-pointer hover:font-bold duration-300"
                        to="contact"
                        activeclass="active"

                    >
                        Contact
                    </ScrollLink> */}

                    {/* <Link
                        className="hidden btn btn-primary btn-sm max-w-[164px] mx-auto"
                        href="/"
                        activeclass="active"

                    >
                        See All Cars
                    </Link> */}

                    <SearchMobile />
                </nav>
            </div>
        </header>
    )
}

export default Header