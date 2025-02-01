"use client";

import { useState } from "react";
import blogs from "./blogsData";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaSearch, FaRegClock } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";

const BlogPage = () => {
    const [searchQuery, setSearchQuery] = useState("");

    // Filter blogs based on search
    const filteredBlogs = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <section className="min-h-screen bg-gradient-to-br from-[#f9fafb] to-[#e5e7eb] py-16 px-6 relative overflow-hidden">
            {/* Animated Background Elements */}
            <motion.div
                className="absolute -top-20 left-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl"
                animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>
            <motion.div
                className="absolute bottom-10 right-10 w-24 h-24 bg-red-400/20 rounded-full blur-3xl"
                animate={{ y: [0, -30, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>

            <div className="container mx-auto relative mt-24">
                {/* Title with Glowing Effect */}
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-10 tracking-wide"
                >
                    Explore <span className="text-red-600">Our Blogs</span>
                </motion.h1>

                {/* Search Bar */}
                <div className="flex justify-center mb-10 relative">
                    <div className="relative w-full max-w-lg">
                        <input
                            type="text"
                            placeholder="Search blogs..."
                            className="p-4 pl-12 bg-gradient-to-r from-gray-100 to-gray-50 border border-gray-300 rounded-full w-full text-lg shadow-md focus:ring-4 focus:ring-red-300 transition-all hover:shadow-xl"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500" />
                    </div>
                </div>

                {/* Blog Card Enhancements */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredBlogs.map((blog) => (
                        <Link key={blog.id} href={`/blog/${blog.slug}`} className="group">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full"
                            >
                                <div className="relative group-hover:scale-105 transition-transform duration-300">
                                    <Image
                                        src={blog.image}
                                        alt={blog.title}
                                        width={500}
                                        height={300}
                                        className="w-full h-56 object-cover"
                                    />
                                </div>

                                <div className="p-5 flex flex-col flex-grow">
                                    <h3 className="text-2xl font-semibold text-gradient from-red-600 to-red-500 group-hover:text-red-700 transition-colors duration-200 relative">
                                        {blog.title}
                                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                                    </h3>
                                    <p className="text-gray-600 text-sm mt-2 flex-grow">
                                        {blog.description}
                                    </p>
                                    <div className="mt-4 flex items-center justify-between text-gray-500 text-sm">
                                        <span className="flex items-center gap-1">
                                            <FaRegClock className="text-red-500" />
                                            {blog.date}
                                        </span>
                                        <span className="flex items-center text-red-500 group-hover:underline transition">
                                            Read More <BsArrowRight className="ml-1" />
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogPage;
