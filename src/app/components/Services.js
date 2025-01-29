"use client";

// Import required libraries and icons
import { motion } from "framer-motion";
import { fadeIn } from "../../../variants";
import { FaServer, FaTags, FaRandom, FaEnvelope, FaShieldAlt } from "react-icons/fa";
import { TbMedicalCross } from "react-icons/tb";

const Features = () => {
  return (
    <section className="relative flex items-center" id="services">
      {/* Floating Circle Icon */}
      <TbMedicalCross className="absolute top-5 left-5 text-accent opacity-20 w-6 h-6 animate-spin-circle" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.h1
          variants={fadeIn("down", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mt-10 mb-4"
        >
          Features
        </motion.h1>

        <motion.p
          variants={fadeIn("down", 0.4)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.6 }}
          className="text-sm sm:text-base md:text-lg text-center text-gray-600 mb-8"
        >
          Enhance your email campaigns with powerful tools designed for efficiency and reliability.
        </motion.p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {/* Feature 1 */}
          <motion.div
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.6 }}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex flex-col items-center text-center border border-gray-200"
          >
            <FaServer className="text-5xl text-accent mb-4" />
            <h2 className="text-xl font-bold mb-2">Custom SMTP Support</h2>
            <p className="text-gray-600">
              Seamlessly connect to various SMTP servers, including Gmail and iCloud, with custom server and port options.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.6 }}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex flex-col items-center text-center border border-gray-200"
          >
            <FaTags className="text-5xl text-accent mb-4" />
            <h2 className="text-xl font-bold mb-2">Dynamic Tags in Emails</h2>
            <p className="text-gray-600">
              Personalize emails with custom tags that automatically replace placeholders with dynamic values.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.6 }}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex flex-col items-center text-center border border-gray-200"
          >
            <FaRandom className="text-5xl text-accent mb-4" />
            <h2 className="text-xl font-bold mb-2">Randomized Attachment Names</h2>
            <p className="text-gray-600">
              Increase engagement by automatically randomizing attachment names for uniqueness.
            </p>
          </motion.div>

          {/* Feature 4 */}
          <motion.div
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.6 }}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex flex-col items-center text-center border border-gray-200"
          >
            <FaEnvelope className="text-5xl text-accent mb-4" />
            <h2 className="text-xl font-bold mb-2">Gmail API Integration</h2>
            <p className="text-gray-600">
              Streamline email sending with Gmail API for enhanced efficiency and reliability.
            </p>
          </motion.div>

          {/* Feature 5 */}
          <motion.div
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.6 }}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex flex-col items-center text-center border border-gray-200"
          >
            <FaShieldAlt className="text-5xl text-accent mb-4" />
            <h2 className="text-xl font-bold mb-2">Proxy for IP Rotation</h2>
            <p className="text-gray-600">
              Enhance anonymity with rotating or static proxies for dynamic IP address changes during email campaigns.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Features;
