"use client";

import { motion } from "framer-motion";

const fadeIn = (direction = "up", delay = 0) => ({
    hidden: { opacity: 0, y: direction === "up" ? 30 : direction === "down" ? -30 : 0 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            duration: 0.8,
            delay,
        },
    },
});

const HTMLEditor = () => {

    return (
        <section className="section h-[1300px] xsm:h-[1200px] sm:h-full xl:h-[1000px] bg-[#fff] flex items-center" id="htmleditor">
            <div className="container mx-auto">
                <motion.h2
                    variants={fadeIn("down", 0.2)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.6 }}
                    className="h2 text-center"
                >
                    HTML Editor - Free Web Component Composer
                </motion.h2>

                <motion.p
                    variants={fadeIn("down", 0.4)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.6 }}
                    className="max-w-[800px] text-center mx-auto mb-5"
                >
                    Welcome to our free web content composer...
                </motion.p>

                <motion.div
                    variants={fadeIn("right", 0.4)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.6 }}
                >
                    <div className="mt-12">
                       
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HTMLEditor;
