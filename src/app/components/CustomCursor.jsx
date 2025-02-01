"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const updateCursorPosition = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleHover = () => setHovered(true);
    const handleLeave = () => setHovered(false);

    window.addEventListener("mousemove", updateCursorPosition);
    
    document.querySelectorAll("a, button, .hover-target").forEach((el) => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
      document.querySelectorAll("a, button, .hover-target").forEach((el) => {
        el.removeEventListener("mouseenter", handleHover);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Outer Red Ring */}
      <motion.div
        className="fixed w-12 h-12 border-[2px] border-red-500 rounded-full pointer-events-none z-[100] backdrop-blur-md"
        animate={{
          x: cursorPosition.x - 24,
          y: cursorPosition.y - 24,
          scale: hovered ? 1.6 : 1,
          opacity: hovered ? 0.7 : 0.4,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Subtle Glow Effect */}
      <motion.div
        className="fixed w-10 h-10 bg-red-500/20 rounded-full pointer-events-none z-[101] blur-md opacity-50"
        animate={{
          x: cursorPosition.x - 20,
          y: cursorPosition.y - 20,
          scale: hovered ? 1.4 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Inner Dot Cursor */}
      <motion.div
        className="fixed w-2.5 h-2.5 bg-red-500 rounded-full pointer-events-none z-[102] shadow-md"
        animate={{
          x: cursorPosition.x - 5,
          y: cursorPosition.y - 5,
          scale: hovered ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 20 }}
      />
    </>
  );
};

export default CustomCursor;
