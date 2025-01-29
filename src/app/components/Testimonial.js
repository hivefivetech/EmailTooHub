"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import required modules
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Icons
import { FaQuoteLeft } from "react-icons/fa";

// Next Image
import Image from "next/image";

// Testimonial Data
const testimonialData = [
  {
    message:
      "This tool made my email campaigns seamless and incredibly effective!",
    avatar: "/images/testimonial/avatar1.png",
    name: "Alice Nguyen",
    job: "Digital Marketing Specialist",
  },
  {
    message:
      "A fantastic tool that helped me scale my business outreach effortlessly.",
    avatar: "/images/testimonial/avatar3.png",
    name: "Liam Turner",
    job: "E-commerce Entrepreneur",
  },
  {
    message:
      "Simplified my workflow and improved my email engagement rates substantially.",
    avatar: "/images/testimonial/avatar2.png",
    name: "Sofia Patel",
    job: "Content Strategist",
  },
];

const Testimonial = () => {
  return (
    <section
      className="relative bg-gradient-to-b from-gray-50 to-gray-100 py-16 sm:py-20 lg:py-24 overflow-hidden"
      id="testimonial"
    >
      <div className="container mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
          Hear From Our Users
        </h2>

        {/* Testimonial Carousel */}
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{ delay: 5000 }}
          spaceBetween={30}
          slidesPerView={1}
          className="max-w-[1200px] mx-auto"
        >
          {testimonialData.map((testimonial, index) => {
            const { message, avatar, name, job } = testimonial;
            return (
              <SwiperSlide key={index}>
                <div className="bg-white shadow-lg rounded-lg p-8 text-center flex flex-col items-center">
                  <FaQuoteLeft className="text-4xl text-accent mb-6" />
                  <p className="text-gray-700 text-lg mb-6 italic">{message}</p>
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
                    <Image src={avatar} alt={name} width={64} height={64} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
                  <p className="text-sm text-gray-500">{job}</p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* Floating Accent Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-accent/20 rounded-full blur-2xl"></div>
    </section>
  );
};

export default Testimonial;
