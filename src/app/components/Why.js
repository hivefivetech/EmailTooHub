"use client";

// Framer Motion
import { motion } from "framer-motion";

// Variants
import { fadeIn } from "../../../variants";

// Icons
import { MdEmail, MdOutlineSecurity, MdTrendingUp } from "react-icons/md";

const Why = () => {
    return (
        <section
            className="relative flex items-center justify-center bg-gradient-to-b from-[#f9fafb] to-[#e5e7eb] py-12 sm:py-16 md:py-20 min-h-screen overflow-hidden"
            id="why"
        >
            <div className="container mx-auto px-6 sm:px-10 lg:px-16">
                {/* Header */}
                <motion.h2
                    variants={fadeIn("up", 0.2)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.6 }}
                    className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-6"
                >
                    Why Choose Email Tool Hub?
                </motion.h2>

                <motion.p
                    variants={fadeIn("up", 0.4)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.6 }}
                    className="max-w-[700px] mx-auto text-center text-gray-600 mb-10"
                >
                    Discover innovative features and unmatched reliability that make us
                    the preferred choice for email marketers worldwide.
                </motion.p>

                {/* Unique Features Section */}
                <div className="relative flex flex-col-reverse xl:flex-row items-center justify-between gap-8">
                    {/* Left Animated Section */}
                    <motion.div
                        variants={fadeIn("up", 0.6)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: true, amount: 0.6 }}
                        className="flex-1 flex flex-col items-center xl:items-start gap-y-6"
                    >
                        {/* Feature 1 */}
                        <div className="flex items-center gap-4">
                            <MdEmail className="text-5xl text-accent" />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Advanced Email Management
                                </h3>
                                <p className="text-gray-600">
                                    Streamline your email campaigns with precision and ease.
                                </p>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="flex items-center gap-4">
                            <MdOutlineSecurity className="text-5xl text-accent" />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Robust Security
                                </h3>
                                <p className="text-gray-600">
                                    Enjoy secure email operations with industry-standard protocols.
                                </p>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="flex items-center gap-4">
                            <MdTrendingUp className="text-5xl text-accent" />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Data-Driven Insights
                                </h3>
                                <p className="text-gray-600">
                                    Optimize your performance with detailed analytics.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Visual Section */}
                    <motion.div
                        variants={fadeIn("up", 0.8)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: true, amount: 0.6 }}
                        className="flex-1 flex justify-center"
                    >
                        <div className="relative w-[400px] h-[300px] sm:w-[500px] sm:h-[400px] lg:w-[600px] lg:h-[400px] rounded-lg overflow-hidden">
                            <div className="absolute inset-0 rounded-full"></div>
                            <img
                                src="/images/why/img.gif"
                                alt="Abstract Design"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Floating Accent Elements */}
            <div className="absolute top-10 left-10 w-16 h-16 bg-accent/20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-20 right-20 w-20 h-20 bg-accent/10 rounded-full blur-3xl"></div>
        </section>
    );
};

export default Why;
