"use client"

// Lottie
import dynamic from 'next/dynamic';
// import Lottie from 'lottie-react';

// Animation
import monitorBuildAnimationData from './../../../public/animated_videos/monitorBuild_animation.json'
import inboxRateAnimationData from './../../../public/animated_videos/inboxRate_animation.json'
import moreSalesAnimationData from './../../../public/animated_videos/moreSales_animation.json'

// Framer Motion
import { motion, easeInOut } from 'framer-motion'

// Variants
import { fadeIn } from "../../../variants";


const Cars = () => {
    const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
    return (
        <section className="flex items-center" id="services">
            <div className="container mx-auto">

                <motion.h1
                    variants={fadeIn('down', 0.2)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.6 }}
                    className="h1 text-[20px] xsm:text-[30px] sm:text-[40px] text-center mt-40"
                >
                    Features
                </motion.h1>

                <motion.p
                    variants={fadeIn('down', 0.4)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.6 }}
                    className="text-[14px] xsm:text-[16px] sm:text-[20px] text-center"
                >
                    Landing in spam means <span className="text-accent">missing customers!</span>
                </motion.p>

                <motion.p
                    variants={fadeIn('down', 0.4)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.6 }}
                    className="text-[14px] xsm:text-[16px] sm:text-[20px] text-center mb-8"
                >
                    JetStream Mailer helps you <span className="text-accent">reach the inbox</span> and <span className="text-accent">unlock growth!</span>
                </motion.p>

                {/* <Brands />
                <CarSlider /> */}

                <div className="my-8 mb-20">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">

                        <motion.div
                            variants={fadeIn('up', 0.4)}
                            initial="hidden"
                            whileInView={"show"}
                            viewport={{ once: true, amount: 0.6 }}
                            className="bg-white p-4 rounded-lg shadow-md hover:shadow-2xl hover:translate-y-[-8px] transition-all duration-300 flex flex-col justify-center items-center"
                        >
                            <Lottie
                                animationData={monitorBuildAnimationData}
                                loop={true}
                                autoplay={true}
                                className='w-[75px] mb-2 text-center'
                            />
                            <h2 className="text-xl font-bold mb-2 text-center">Custom SMTP Support</h2>
                            <p className="text-gray-600 text-center">You can seamlessly connect to various SMTP servers, including Gmail and iCloud, with the flexibility to use custom servers and ports.</p>
                        </motion.div>

                        <motion.div
                            variants={fadeIn('up', 0.4)}
                            initial="hidden"
                            whileInView={"show"}
                            viewport={{ once: true, amount: 0.6 }}
                            className="bg-white p-4 rounded-lg shadow-md hover:shadow-2xl hover:translate-y-[-8px] transition-all duration-300 flex flex-col justify-center items-center"
                        >
                            <Lottie
                                animationData={inboxRateAnimationData}
                                loop={true}
                                autoplay={true}
                                className='w-[75px] mb-2 text-center'
                            />
                            <h2 className="text-xl font-bold mb-2 text-center">Dynamic Tags in Emails</h2>
                            <p className="text-gray-600 text-center">Personalize your emails using custom tags within the email body and HTML files. These tags are automatically replaced with random values, enhancing engagement.</p>
                        </motion.div>

                        <motion.div
                            variants={fadeIn('up', 0.4)}
                            initial="hidden"
                            whileInView={"show"}
                            viewport={{ once: true, amount: 0.6 }}
                            className="bg-white p-4 rounded-lg shadow-md hover:shadow-2xl hover:translate-y-[-8px] transition-all duration-300 flex flex-col justify-center items-center"
                        >
                            <Lottie
                                animationData={moreSalesAnimationData}
                                loop={true}
                                autoplay={true}
                                className='w-[75px] mb-2 text-center'
                            />
                            <h2 className="text-xl font-bold mb-2 text-center">Randomized Attachment Names</h2>
                            <p className="text-gray-600 text-center">Add a layer of uniqueness by randomizing attachment names, enhancing recipient curiosity and interaction.</p>
                        </motion.div>

                        <motion.div
                            variants={fadeIn('up', 0.4)}
                            initial="hidden"
                            whileInView={"show"}
                            viewport={{ once: true, amount: 0.6 }}
                            className="bg-white p-4 rounded-lg shadow-md hover:shadow-2xl hover:translate-y-[-8px] transition-all duration-300 flex flex-col justify-center items-center"
                        >
                            <Lottie
                                animationData={moreSalesAnimationData}
                                loop={true}
                                autoplay={true}
                                className='w-[75px] mb-2 text-center'
                            />
                            <h2 className="text-xl font-bold mb-2 text-center">Gmail API Integration</h2>
                            <p className="text-gray-600 text-center">Leverage the power of Gmail API to streamline your email sending process, enhancing efficiency and reliability.</p>
                        </motion.div>

                        <motion.div
                            variants={fadeIn('up', 0.4)}
                            initial="hidden"
                            whileInView={"show"}
                            viewport={{ once: true, amount: 0.6 }}
                            className="bg-white p-4 rounded-lg shadow-md hover:shadow-2xl hover:translate-y-[-8px] transition-all duration-300 flex flex-col justify-center items-center"
                        >
                            <Lottie
                                animationData={moreSalesAnimationData}
                                loop={true}
                                autoplay={true}
                                className='w-[75px] mb-2 text-center'
                            />
                            <h2 className="text-xl font-bold mb-2 text-center">Proxy for IP Rotation</h2>
                            <p className="text-gray-600 text-center">Ensure anonymity and robustness by employing rotating proxies or static proxies to dynamically change your IP address while sending emails.</p>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Cars