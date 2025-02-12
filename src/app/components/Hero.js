"use client";

import { useContext } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../../variants";
import { SearchContext } from "../context/Search";
import Search from "./Search";
import { TbFileTypeHtml, TbMedicalCross } from "react-icons/tb";
import { MdOutlineEmail, MdDesignServices, MdMarkEmailRead } from "react-icons/md";
import { IoMdMailUnread, IoIosMailOpen } from "react-icons/io";
import { FaRandom } from "react-icons/fa";
import { FaRegImages, FaRegEnvelope, FaDatabase } from "react-icons/fa6";

export const metadata = {
  title: "EmailToolHub | Online Email Marketing Tool for Free! | Email Extractor, Free Email Validator, Free Email Deliverability Check, HTML Editor, Email Splitter",
  description:
    "EmailToolHub offers free and powerful tools for email marketing, including email extraction, validation, inbox delivery checks, HTML editing, and more to boost your campaigns effortlessly.",
};

// Services Data
const services = [
  {
    name: "Email Extractor",
    icon: <MdOutlineEmail className="text-5xl text-accent" />,
    link: "/email-extractor",
    description: "Extract email addresses from any .txt file quickly & efficiently.",
  },
  {
    name: "Email Validator",
    icon: <MdMarkEmailRead className="text-5xl text-accent" />,
    link: "/email-validator",
    description: "Verify email addresses to reduce bounce rates & ensure accuracy.",
  },
  {
    name: "Email Splitter",
    icon: <IoMdMailUnread className="text-5xl text-accent" />,
    link: "/email-splitter",
    description: "Split email lists into smaller batches for easy management & downloads.",
  },
  {
    name: "Inbox Checker",
    icon: <IoIosMailOpen className="text-5xl text-accent" />,
    link: "https://inbox-checker.emailtoolhub.com/",
    description: "Check if emails land in Inbox or Spam before sending campaigns.",
    external: true,
  },
  {
    name: "HTML Editor",
    icon: <MdDesignServices className="text-5xl text-accent" />,
    link: "https://html-editor.emailtoolhub.com/",
    description: "Create stunning email templates with a powerful HTML editor.",
    external: true,
  },
  {
    name: "Base64 Image Encoder",
    icon: <FaRegImages className="text-5xl text-accent" />,
    link: "/base64-image-encoder",
    description: "Easily convert images to Base64 and other formats.",
  },
  {
    name: "Email Domain Filter",
    icon: <FaRegEnvelope className="text-5xl text-accent" />,
    link: "/email-domain-filter",
    description: "Filter and remove unwanted email domains from your list with ease, and download the cleaned list.",
  },
  {
    name: "Email Extractor SQL",
    icon: <FaDatabase className="text-5xl text-accent" />,
    link: "/email-extract-sql",
    description: "Extract and manage email lists efficiently using SQL-based filtering and cleaning processes.",
  },
  {
    name: "HTML to Any Converter",
    icon: <TbFileTypeHtml className="text-5xl text-accent" />,
    link: "/html-to-any",
    description: "Convert HTML to JPG, PNG, PDF and more with one-click processing.",
  },
  {
    name: "Randome Name & Address Generator",
    icon: <FaRandom className="text-5xl text-accent" />,
    link: "/random-name-address-generator",
    description: "Generate realistic names and addresses instantly with EmailToolHub",
  },
];

const Hero = () => {
  const { searchActive } = useContext(SearchContext);

  return (
    <section
      className="relative min-h-screen h-auto bg-gradient-to-br from-[#f9fafb] to-[#e5e7eb] overflow-hidden py-16 xl:py-24 flex items-center justify-center"
      id="home"
    >
      {/* Background Accents */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#f9fafb]/50 to-[#e5e7eb]/50 z-0"></div>
      {/* <div className="absolute -top-24 left-1/3 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div> */}
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

      <div className="container mx-auto px-6 sm:px-10 lg:px-16 xl:pt-10 relative z-10 flex flex-col items-center text-center">
        {/* Text Section in a Centered Glassmorphism Card */}
        <motion.div
          variants={fadeIn("down", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.6 }}
          className="bg-white/30 backdrop-blur-xl rounded-2xl shadow-xl p-12 w-full max-w-4xl border border-white/10 mt-36 sm:mt-32 md:mt-20"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Every tool you need to work with <span className="text-accent">Email Marketing</span> in one place
          </h1>

          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed"> Every tool you need for email marketing, all in one place. Extract and validate emails, check inbox delivery, edit Html, and generate random names and addresses—all 100% FREE and easy to use! </p>

          {/* Mouse Scroll Animation */}
          <motion.div
            variants={fadeIn("up", 0.6)}
            initial="show"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.8 }}
            className="flex justify-center items-center mt-8"
          >
            <div className="w-7 h-11 border-2 border-gray-500 rounded-full flex justify-center items-start p-1 mt-2 relative">
              <motion.div
                className="w-2 h-2 bg-gray-500 rounded-full"
                animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Services Section */}
        <motion.div
          variants={fadeIn("up", 0.4)}
          initial="show"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 xl:mt-12"
        >
          {services.map((service, index) => (
            <motion.a
              key={index}
              href={service.link}
              target={service.external ? "_blank" : "_self"}
              rel={service.external ? "noopener noreferrer" : ""}
              className="group relative block bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent transition-all duration-300 rounded-xl"></div>

              <div className="mb-4 flex justify-center">{service.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {service.name}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.a>
          ))}
        </motion.div>
      </div>
      {/* Search Bar (Fixed `easeInOut` issue) */}
      {searchActive && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed top-[100px] z-10 w-full max-w-[1920px]"
        >
          <Search />
        </motion.div>
      )}
    </section>
  );
};

export default Hero;
