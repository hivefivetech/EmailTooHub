"use client"

// Swiper React Components
import { Swiper, SwiperSlide } from "swiper/react"

// Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

// Required Modules
import { Pagination } from 'swiper/modules'

// Icons
import { FaQuoteLeft } from "react-icons/fa"

// Framer Motion
import { motion } from "framer-motion"

// Variants
import { fadeIn } from "../../../variants"

// Next Image
import Image from "next/image"

// Data
const testimonialData = [
    {
        message: 'This tool made my email campaigns seamless and incredibly effective!',
        avatar: '/images/testimonial/avatar1.png',
        name: 'Alice Nguyen',
        job: 'Digital Marketing Specialist',
    },
    {
        message: 'A fantastic tool that helped me scale my business outreach effortlessly.',
        avatar: '/images/testimonial/avatar3.png',
        name: 'Liam Turner',
        job: 'E-commerce Entrepreneur',
    },
    {
        message: 'Simplified my workflow and improved my email engagement rates substantially.',
        avatar: '/images/testimonial/avatar2.png',
        name: 'Sofia Patel',
        job: 'Content Strategist',
    },
]

const TestimonialSlider = () => {
    return (
        <motion.div
            variants={fadeIn('up', 0.4)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.6 }}
            className="container mx-auto"
        >
            <Swiper
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                modules={[Pagination]}
                className='h-[450px] xl:h-[400px]'
            >
                {testimonialData.map((person, index) => {
                    const { message, avatar, name, job } = person
                    return (
                        <SwiperSlide key={index}>
                            <div className="flex flex-col justify-center items-center text-center">
                                <FaQuoteLeft className="text-7xl text-accent mb-6" />
                                <div className="text-2xl xl:text-4xl max-w-[874px] mb-12 font-medium">
                                    {message}
                                </div>
                                <div className="mb-4 w-16 h-16 rounded-full bg-red-500 overflow-hidden">
                                    <Image src={avatar} alt='' width={64} height={64} />
                                </div>
                                <div className="text-lg font-medium">
                                    {name}
                                </div>
                                <div className="text-secondary">
                                    {job}
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </motion.div>
    )
}

export default TestimonialSlider