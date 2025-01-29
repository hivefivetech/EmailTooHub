"use client";

import { useContext } from "react";

// Components
import Search from "./Search";

// Search Context
import { SearchContext } from "../context/Search";

// Lottie
import dynamic from "next/dynamic";

// Animation
import heroAnimationData from "./../../../public/animated_videos/hero_animation.json";

// Framer Motion
import { motion, easeInOut } from "framer-motion";

// Variants
import { fadeIn } from "../../../variants";

// Icons
import { GrServices } from "react-icons/gr";
import { TbMedicalCross } from "react-icons/tb";

const Hero = () => {
  const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
  const { searchActive } = useContext(SearchContext);

  return (
    <section
      className="relative h-screen xl:h-[100vh] bg-gradient-to-b from-[#f9fafb] to-[#e5e7eb] overflow-hidden"
      id="home"
    >
      {/* Circular Rotating Icons */}
      <GrServices className="absolute bottom-10 left-10 text-accent opacity-20 w-10 h-10 animate-spin-slow" />
      <GrServices className="absolute bottom-10 right-10 text-accent opacity-20 w-10 h-10 animate-spin-slow-reverse" />
      <TbMedicalCross className="absolute top-10 right-10 text-accent opacity-20 w-6 h-6 animate-spin-circle" />

      <div className="container mx-auto h-full xl:pt-10 relative z-10">
        {/* Text & Image Wrapper */}
        <div className="flex flex-col xl:flex-row justify-center xl:justify-between items-center h-full">
          {/* Text */}
          <div className="text-center xl:max-w-xl xl:text-left mt-16 xl:mt-0">
            <motion.h1
              variants={fadeIn("down", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true, amount: 0.6 }}
              className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6"
            >
              Welcome to <span className="text-accent">Email Tool Hub</span>
            </motion.h1>

            <motion.p
              variants={fadeIn("down", 0.4)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true, amount: 0.6 }}
              className="text-lg sm:text-xl text-gray-600 max-w-[550px] mx-auto xl:mx-0 mb-8"
            >
              Simplify your email marketing with tools designed for precision,
              reliability, and ease of use. Perfect for creating professional
              campaigns that deliver results.
            </motion.p>

            <motion.div
              variants={fadeIn("down", 0.6)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true, amount: 0.8 }}
              className="flex gap-x-4 justify-center xl:justify-start"
            >
              <button className="bg-accent hover:bg-accent-dark text-white py-3 px-6 rounded-lg text-lg font-medium shadow-md transition-all duration-300">
                Learn More
              </button>
              <button className="border border-accent text-accent hover:bg-accent hover:text-white py-3 px-6 rounded-lg text-lg font-medium shadow-md transition-all duration-300">
                Get Started
              </button>
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            variants={fadeIn("up", 0.6)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.6 }}
            className="w-full xl:w-1/2"
          >
            <Lottie
              animationData={heroAnimationData}
              loop={true}
              autoplay={true}
              className="w-full max-w-md xl:max-w-lg mx-auto"
            />
          </motion.div>
        </div>
      </div>

      {/* Search Bar */}
      {searchActive && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          transition={{ ease: easeInOut }}
          className="fixed top-[65px] z-10 w-full max-w-[1920px]"
        >
          <Search />
        </motion.div>
      )}
    </section>
  );
};

export default Hero;
