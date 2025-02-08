"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import blogs from "../blogsData";
import Image from "next/image";
import Link from "next/link";
import { FaBookmark, FaListUl } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";

const BlogPage = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [activeSection, setActiveSection] = useState("");
    const [isTOCOpen, setIsTOCOpen] = useState(false);

    useEffect(() => {
        const foundBlog = blogs.find((b) => b.slug === slug);
        setBlog(foundBlog);
    }, [slug]);

    useEffect(() => {
        const handleScroll = () => {
            blog?.sections.forEach((section) => {
                const sectionElement = document.getElementById(section.id);
                if (sectionElement) {
                    const { top } = sectionElement.getBoundingClientRect();
                    if (top < 150 && top > -150) {
                        setActiveSection(section.id);
                    }
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [blog]);

    if (!blog) return <p className="text-center text-gray-500 mt-10">Blog not found.</p>;

    return (
        <section className="min-h-screen bg-white">
            {/* Blog Header with Image and Title */}
            <div className="header-container pt-32">
                <div className="px-6 sm:px-12 md:px-20 relative">
                    <div className="relative w-full h-[700px] rounded-lg overflow-hidden shadow-lg">
                        {/* Blog Image */}
                        <Image
                            src={blog.image}
                            alt={blog.title}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg brightness-[25%]"
                        />
                        {/* Title and Meta on Top of Image */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                            <h1 className="text-4xl md:text-5xl font-bold">{blog.title}</h1>
                            <p className="text-gray-300 mt-2 text-lg">{blog.date} <span className="text-accent">•</span> {blog.category}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-col lg:flex-row gap-8 py-16 px-6 sm:px-12 md:px-20">

                {/* Mobile TOC Toggle Button with Smooth Animation */}
                <div className="lg:hidden">
                    <button
                        className="w-full text-center bg-gray-100 text-gray-800 font-semibold py-3 rounded-lg shadow-md flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                        onClick={() => setIsTOCOpen((prev) => !prev)}
                    >
                        <FaListUl className="text-lg" />
                        {isTOCOpen ? "Hide Table of Contents" : "Show Table of Contents"}
                    </button>
                    <div className={`transition-all duration-500 ${isTOCOpen ? "opacity-100 max-h-screen mt-4" : "opacity-0 max-h-0"}`}>
                        <div className="bg-white p-6 rounded-lg shadow-lg border border-red-200">
                            <h3 className="font-bold text-lg mb-3 text-gray-700 flex items-center gap-2">
                                <FaBookmark className="text-accent" />
                                Table of Contents
                            </h3>
                            <ul className="space-y-2 border-l-4 border-red-200 pl-4">
                                {blog.sections.map((section) => (
                                    <li key={section.id}>
                                        <a
                                            href={`#${section.id}`}
                                            className={`block py-2 text-gray-600 hover:text-red-600 transition-all font-medium ${activeSection === section.id ? "text-red-700 font-bold bg-red-50 rounded-lg pl-2" : ""
                                                }`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                const targetElement = document.getElementById(section.id);
                                                if (targetElement) {
                                                    window.scrollTo({
                                                        top: targetElement.offsetTop - 100,
                                                        behavior: "smooth"
                                                    });
                                                }
                                                setIsTOCOpen(false);
                                            }}
                                        >
                                            {section.heading}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Table of Contents (Sticky for Desktop, 30% width) */}
                <div className="hidden lg:block w-[30%]">
                    {/* <div className="sticky top-28 bg-white p-6 rounded-lg shadow-lg border border-red-200 overflow-y-auto max-h-[80vh]"> */}
                    <div className="sticky top-28 bg-white p-6 rounded-lg shadow-lg border border-red-200">
                        <h3 className="font-bold text-lg mb-3 text-gray-700 flex items-center gap-2">
                            <FaBookmark className="text-accent" />
                            Table of Contents
                        </h3>
                        <ul className="space-y-2 border-l-4 border-accent pl-4">
                            {blog.sections.map((section) => (
                                <li key={section.id}>
                                    <a
                                        href={`#${section.id}`}
                                        className={`block py-2 text-gray-600 hover:text-red-600 transition-all font-medium ${activeSection === section.id ? "text-red-700 font-bold bg-red-50 rounded-lg pl-2" : ""
                                            }`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            const targetElement = document.getElementById(section.id);
                                            if (targetElement) {
                                                window.scrollTo({
                                                    top: targetElement.offsetTop - 100,
                                                    behavior: "smooth"
                                                });
                                            }
                                        }}
                                    >
                                        {section.heading}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Blog Content (70% Width on Large Screens) */}
                <article className="prose prose-lg text-gray-700 lg:w-[70%] leading-8 flex-grow">
                    {blog.sections.map((section, index) => (
                        <div key={section.id} id={section.id} className="mb-12">
                            {/* First Letter Styling for the First Section */}
                            {index === 0 ? (
                                <p className="text-5xl font-bold text-red-600 float-left mr-2">
                                    {section.content[0]}
                                </p>
                            ) : null}
                            <h2 className="text-2xl font-bold mt-1 text-gray-800">{section.heading}</h2>
                            <div dangerouslySetInnerHTML={{ __html: section.content.slice(1) }}></div>
                        </div>
                    ))}
                </article>
            </div>

            {/* Back to Blogs Button */}
            <div className="flex justify-center mt-10 pb-3">
                <Link href="/blog">
                    <button className="px-4 py-3 flex items-center justify-center gap-2 text-lg font-semibold text-white bg-red-600 rounded-lg shadow-md transition-all duration-300 hover:bg-red-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        <FaArrowLeft /> Back to Blogs
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default BlogPage;