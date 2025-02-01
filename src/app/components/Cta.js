"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { fadeIn } from "../../../variants";

import BgImage from "../../../public/images/cta/bgImg2.jpeg";
import Image from "next/image";

// Animation
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const Cta = () => {
  return (
    <section className="relative bg-gradient-to-r from-gray-100 to-gray-300 py-16 lg:py-24" id="cta">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16 relative">

        {/* Background Accents */}
        <div className="absolute inset-0 -z-10 blur-[80px]">
          <div className="w-[300px] h-[300px] bg-accent/30 rounded-full absolute top-10 left-10 animate-pulse"></div>
          <div className="w-[200px] h-[200px] bg-accent/50 rounded-full absolute bottom-20 right-20 animate-pulse"></div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Section: Text and Button */}
          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            className="lg:max-w-[50%] text-center lg:text-left"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              JetStream Mailer | Best bulk mailing software with 90% inboxing
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              <b>JetStream Mailer</b> is the ultimate bulk mailing software, ensuring <b>90% inboxing</b> for your emails along with <i>Gmail API generator</i>, <i>app password and token generator</i>, and also <i>HTML AI generator</i>.
            </p>
            <div className="flex justify-center lg:justify-start">
              <a
                href="https://t.me/ZplusMan"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
              >
                Purchase Now
              </a>
            </div>
          </motion.div>

          {/* Right Section: Image with Animated Frame */}
          <motion.div
            variants={fadeIn("left", 0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            className="w-full lg:w-1/2 flex justify-center"
          >
            <div className="relative p-3 rounded-xl shadow-2xl bg-gradient-to-br from-gray-50 to-gray-200 border-4 border-gray-300">
              <div className="absolute inset-0 rounded-xl shadow-[0px_0px_20px_rgba(0,0,0,0.3)] bg-gradient-to-tr from-white/30 to-gray-300/40 backdrop-blur-xl animate-pulse"></div>
              <div className="relative rounded-xl overflow-hidden transform hover:scale-105 transition-all duration-300">
                <Image
                  src={BgImage}
                  alt="JetStream Mailer"
                  className="object-cover rounded-xl shadow-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
