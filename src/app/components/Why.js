"use client";

// Framer Motion
import { motion } from "framer-motion";

// Variants
import { fadeIn } from "../../../variants";

// Icons
import { MdAttachMoney, MdCheckCircle, MdEmail, MdOutlineSecurity, MdSecurity, MdTimer, MdTrendingUp, MdUpdate } from "react-icons/md";

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

                {/* <motion.p
                    variants={fadeIn("up", 0.4)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.6 }}
                    className="max-w-[700px] mx-auto text-center text-gray-600 mb-10"
                >
                    <b>Discover innovative features</b> and <i>unmatched reliability</i> that make us the preferred choice for email marketers worldwide.
                    <b> Access all email marketing tools for free,</b> <i>save time and money,</i> and rest assured knowing your data is <b>fully protected.</b>
                </motion.p> */}

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
                            <MdAttachMoney className="text-5xl text-accent" />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Paid Tools for Free
                                </h3>
                                <p className="text-gray-600">
                                    Access premium email marketing tools at no cost to streamline your campaigns.
                                </p>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="flex items-center gap-4">
                            <MdTimer className="text-5xl text-accent" />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Save Time and Effort
                                </h3>
                                <p className="text-gray-600">
                                    Automate and simplify your email tasks, freeing up time for other important activities.
                                </p>
                            </div>
                        </div>

                        {/* Feature 4 */}
                        <div className="flex items-center gap-4">
                            <MdEmail className="text-5xl text-accent" />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Free Email Deliverability Checker
                                </h3>
                                <p className="text-gray-600">
                                    Test your email deliverability for free to ensure your emails land in inboxes, not spam.
                                </p>
                            </div>
                        </div>

                        {/* Feature 6 */}
                        <div className="flex items-center gap-4">
                            <MdTrendingUp className="text-5xl text-accent" />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Most Advanced Online Email Marketing Tools
                                </h3>
                                <p className="text-gray-600">
                                    Leverage cutting-edge tools to optimize every aspect of your email marketing campaigns.
                                </p>
                            </div>
                        </div>

                        {/* Feature 7 */}
                        <div className="flex items-center gap-4">
                            <MdUpdate className="text-5xl text-accent" />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Daily Updated Email Marketing Tools
                                </h3>
                                <p className="text-gray-600">
                                    Stay ahead with the latest tools and features, updated daily to meet your email marketing needs.
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
