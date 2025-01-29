"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { fadeIn } from "../../../variants";

// Animation
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import ctaAnimationData from "./../../../public/animated_videos/cta_animation.json";

const Cta = () => {
  return (
    <section
      className="relative bg-gradient-to-r bg-white py-16 lg:py-24"
      id="cta"
    >
      <div className="container mx-auto px-6 sm:px-10 lg:px-16 relative">
        {/* Background Animation */}
        <div className="absolute inset-0 -z-10 blur-[80px]">
          <div className="w-[300px] h-[300px] bg-accent/30 rounded-full absolute top-10 left-10 animate-pulse"></div>
          <div className="w-[200px] h-[200px] bg-accent/50 rounded-full absolute bottom-20 right-20"></div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Section: Text and Button */}
          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            className="lg:max-w-[50%] text-center lg:text-left"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Ready to Take Your Campaigns to the Next Level?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of users transforming their email marketing with
              our intuitive, feature-packed solution. Start achieving your
              goals today!
            </p>
            <div className="flex justify-center lg:justify-start">
              <button className="bg-accent text-white px-6 py-3 rounded-lg text-lg font-medium shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
                Get Started Now
              </button>
            </div>
          </motion.div>

          {/* Right Section: Lottie Animation */}
          <motion.div
            variants={fadeIn("left", 0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            className="w-full lg:w-1/2 flex justify-center"
          >
            <Lottie animationData={ctaAnimationData} loop autoplay />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
