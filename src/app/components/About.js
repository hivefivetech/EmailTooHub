"use client"

import { useState } from "react"

// Next Image 
import Image from "next/image"

// Icons
import { SiBoost } from "react-icons/si";
import { HiRocketLaunch } from "react-icons/hi2";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

// React Count up
import CountUp from "react-countup"

// React Intersection Observer
import { useInView } from 'react-intersection-observer'

// Framer Motion
import { motion, easeInOut } from 'framer-motion'

// Variants
import { fadeIn } from "../../../variants";

// Lottie
import dynamic from 'next/dynamic';
// import Lottie from 'lottie-react';

// Animation
import buttonAnimationData from './../../../public/animated_videos/button_animation.json'

const About = () => {

  const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

  const [ref, inView] = useInView({
    threshold: 0.5,
  })

  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { heading: "Multi Gmail Api Tabs", text: "Effortlessly manage email automation with our streamlined Gmail API creation form! Set up multiple Gmail API integrations across tabs to handle tasks in parallel, boosting productivity and flexibility. Perfect for power users and businesses—take control of your Gmail automation today!", image: "/images/about/9.jpeg" },
    { heading: "SMTP", text: "Enhance your email capabilities with our integrated SMTP services! Easily set up and manage multiple SMTP connections to streamline sending, improve delivery rates, and handle bulk emails efficiently. Ideal for businesses and high-volume users—experience powerful, reliable email delivery in one seamless tool!", image: "/images/about/1.jpeg" },
    { heading: "Auto Gmail API + App Password Creation", text: "Automate your email setup with our Auto Gmail API + App Password Creation feature! Effortlessly generate Gmail API credentials and secure app passwords in one click, simplifying integration and enhancing security. Perfect for users who need a quick, seamless setup—get started instantly with minimal steps!", image: "/images/about/7.jpeg" },
    { heading: "Auto HTML Generation", text: "Create stunning, ready-to-send emails effortlessly with our Automatic Email Template HTML Creation feature! Design professional, responsive email templates in seconds, no coding required—perfect for campaigns, promotions, and personalized outreach. Boost engagement with beautiful, custom HTML emails made easy!", image: "/images/about/10.jpeg" },
  ];

  const handleButtonClick = () => {
    setAnimationPlayed(true);
  };

  return (
    <section className="section flex items-center bg-[#b2b7c2]/10 h-full" id="about" ref={ref}>
    {/* <section className="section flex items-center bg-[#b2b7c2]/10 h-[1150px] xl:h-[100vh]" id="about" ref={ref}> */}
      <div className="flex flex-col mx-2 sm:mx-12 lg:mx-40 justify-center items-center w-full">

        <div className="flex flex-col lg:flex-row justify-center lg:justify-between gap-6 w-[90%]">
          {/* Image */}
          <motion.div
            variants={fadeIn('up', 0.2)}
            initial='hidden'
            whileInView={"show"}
            viewport={{ once: true, amount: 0.6 }}
            className="flex-1 mb-8 lg:mb-0"
          >
            <Image className="rounded-[12px]" src={'/images/about/2.jpeg'} width={600} height={448} alt='' />
          </motion.div>

          {/* Text & Stats */}
          <div className="flex-1 flex justify-center lg:justify-start items-center lg:items-start">
            <div className="">

              <motion.h2
                variants={fadeIn('up', 0.4)}
                initial='hidden'
                whileInView={"show"}
                viewport={{ once: true, amount: 0.6 }}
                className="h2 text-center lg:text-start"
              >
                About JetStream Mailer
              </motion.h2>

              <motion.p
                variants={fadeIn('up', 0.6)}
                initial='hidden'
                whileInView={"show"}
                viewport={{ once: true, amount: 0.6 }}
                className="mb-[42px] text-center lg:text-start"
              >
                Boost your outreach game with unparalleled confidence! Send over 10,000 emails seamlessly, reaching your audience with ease and precision. With an impressive 90% guaranteed inbox delivery, this powerful marketing tool ensures your message lands where it counts—right in your customers' inboxes. Elevate your campaigns, expand your reach, and make every email count!
              </motion.p>

              {/* Stats */}
              {/* <motion.div
                variants={fadeIn('up', 0.8)}
                initial='hidden'
                whileInView={"show"}
                viewport={{ once: true, amount: 0.2 }}
                className="flex flex-row flex-wrap items-center gap-8 mb-12"
              >
                
                <div className="flex flex-col w-[100px]">
                  <SiBoost className="text-5xl text-accent mb-2" />
                  <div className="text-3xl font-black mb-2">
                    {
                      inView ? <CountUp start={0} end={150} duration={3} delay={1} /> : null
                    } +
                  </div>
                  <div className="uppercase text-[13px] font-semibold text-secondary">
                    Boost <br />deliverability!
                  </div>
                </div>


                <div className="flex flex-col w-[100px]">
                  <HiRocketLaunch className="text-5xl text-accent mb-2" />
                  <div className="text-3xl font-black mb-2">
                    {
                      inView ? <CountUp start={0} end={200} duration={3} delay={1} /> : null
                    } +
                  </div>
                  <div className="uppercase text-[13px] font-semibold text-secondary">
                    Skyrocket <br />Rates
                  </div>
                </div>


                <div className="flex flex-col w-[100px]">
                  <FaMoneyBillTrendUp className="text-5xl text-accent mb-2" />
                  <div className="text-3xl font-black mb-2">
                    {
                      inView ? <CountUp start={0} end={200} duration={3} delay={1} /> : null
                    } +
                  </div>
                  <div className="uppercase text-[13px] font-semibold text-secondary">
                    Revenue <br /> Surge
                  </div>
                </div>
              </motion.div> */}
              {/* Button */}
              <motion.div
                variants={fadeIn('up', 1)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: true, amount: 0.6 }}
                className="hidden lg:flex gap-x-3 justify-center lg:justify-start"
              >

                <button onClick={handleButtonClick} className="flex flex-row items-center py-1 px-2 rounded-[10px] bg-black hover:bg-accent hover:scale-105 transition-all duration-300 text-white">
                  <p>Download Now</p>
                  <Lottie
                    key={animationPlayed}
                    animationData={buttonAnimationData}
                    loop={false}
                    autoplay={animationPlayed}
                    className="w-[50px]"
                    onComplete={() => setAnimationPlayed(false)}
                  />
                </button>
              </motion.div>
            </div>
          </div>

        </div>

        <motion.div
          variants={fadeIn('up', 0.2)}
          initial='hidden'
          whileInView={"show"}
          viewport={{ once: true, amount: 0.6 }}
          className="mt-20 mb-20 w-[90%]"
        >
          <div className="tabs-container">
          <div className="tab-buttons grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full">
              {tabs.map((tab, index) => (
                <motion.button
                  key={index}
                  className={`flex-1 py-2 text-base font-semibold rounded-t-md ${activeTab === index
                      ? 'bg-accent text-white border-b-4 border-accent'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-300'
                    }`}
                  onClick={() => setActiveTab(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {tab.heading}
                </motion.button>
              ))}
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="tab-content p-6 rounded-b-md shadow-lg mt-1"
            >
              <div className="flex flex-col md:flex-row items-center">
                <div className="text-content mb-4 md:mb-0 md:w-1/2">
                  <h3 className="text-2xl font-bold mb-2">{tabs[activeTab].heading}</h3>
                  <p className="text-md text-gray-600">{tabs[activeTab].text}</p>
                </div>
                <Image src={tabs[activeTab].image} alt="Tab Image" width={400} height={300} className="rounded-md md:w-1/2" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About