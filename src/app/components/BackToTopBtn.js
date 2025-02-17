"use client"

import React, { useState, useEffect } from "react"

// Icons
import { FaChevronUp } from "react-icons/fa"

// Link / React Sroll
import { Link } from 'react-scroll'

const BackToTopBtn = () => {

    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setIsActive(true)
            } else {
                setIsActive(false)
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    })

    return (
        <Link to="home" className={`${!isActive && 'hidden'} fixed bg-accent hover:bg-accent-hover w-12 h-12 right-16 bottom-11 z-10 cursor-pointer flex justify-center items-center text-white border-white hover:translate-y-[-8px] transition-all duration-300 rounded-md`}>
            <FaChevronUp className="text-xl" />
        </Link>
    )
}

export default BackToTopBtn