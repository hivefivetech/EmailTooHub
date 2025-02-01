"use client";

import { useState } from "react";
import { SiBoost, SiGmail } from "react-icons/si";
import { HiRocketLaunch } from "react-icons/hi2";
import { FaTools } from "react-icons/fa";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { fadeIn } from "../../../variants";
import dynamic from "next/dynamic";
import { TbMedicalCross } from "react-icons/tb";

// Lottie for animations
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const About = () => {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      heading: "Our Mission",
      text: "To simplify workflows and empower users with cutting-edge tools for enhanced productivity and innovation.",
      icon: <HiRocketLaunch className="text-5xl text-accent mb-4" />,
    },
    {
      heading: "Our Vision",
      text: "To be the global leader in providing intuitive and efficient solutions that redefine digital experiences.",
      icon: <SiBoost className="text-5xl text-accent mb-4" />,
    },
    {
      heading: "Our Values",
      text: "Innovation, user-centricity, and excellence drive every decision we make.",
      icon: <FaTools className="text-5xl text-accent mb-4" />,
    },
  ];

  return (
    <section
      className="section flex flex-wrap items-center justify-center bg-gradient-to-b from-[#f9fafb] to-[#e5e7eb] py-12 sm:py-16 md:py-20 min-h-screen h-auto relative"
      id="about"
      ref={ref}
    >
      {/* Floating Circle Icon */}
      <TbMedicalCross className="absolute top-5 left-32 text-accent opacity-20 w-6 h-6 animate-spin-circle" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <motion.h2
            className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4"
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            About Us
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto"
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            We are passionate about building tools that empower people to achieve
            more. With a focus on innovation and user experience, we aim to transform
            the way you work and create value in your projects.
          </motion.p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12 sm:mb-16">
          {[
            { label: "Years of Experience", value: 5, suffix: "+" },
            { label: "Happy Clients", value: 1000, suffix: "+" },
            { label: "Projects Completed", value: 500, suffix: "+" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="text-center bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105"
              variants={fadeIn("up", 0.6)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <div className="text-4xl font-extrabold text-accent mb-2">
                {inView ? (
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={3}
                    suffix={stat.suffix}
                  />
                ) : (
                  0
                )}
              </div>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs Section */}
        <motion.div
          className="tabs-container"
          variants={fadeIn("up", 0.8)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <div className="tab-buttons grid grid-cols-1 sm:grid-cols-3 gap-6">
            {tabs.map((tab, index) => (
              <motion.button
                key={index}
                className={`flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-6 transition-transform duration-300 ${activeTab === index
                    ? "border-2 border-accent scale-105"
                    : "hover:scale-105"
                  }`}
                onClick={() => setActiveTab(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.icon}
                <h3 className="text-xl font-semibold text-gray-900">
                  {tab.heading}
                </h3>
              </motion.button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="tab-content bg-white p-8 rounded-lg shadow-lg mt-8"
          >
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                {tabs[activeTab].heading}
              </h3>
              <p className="text-lg text-gray-600">{tabs[activeTab].text}</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
