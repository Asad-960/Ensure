"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fade in the navbar background and border after scrolling 50px
  const bgOpacity = useTransform(scrollY, [0, 50], [0, 0.75]);
  const backdropBlur = useTransform(scrollY, [0, 50], [0, 12]);
  const borderColor = useTransform(
    scrollY,
    [0, 50],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.05)"]
  );

  const backgroundColor = useTransform(bgOpacity, (val) => `rgba(5,5,5,${val})`);
  const backdropFilter = useTransform(backdropBlur, (val) => `blur(${val}px)`);

  if (!isMounted) return null;

  return (
    <motion.header
      style={{
        backgroundColor,
        backdropFilter,
        borderColor,
      }}
      className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center border-b px-6 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="text-white font-medium tracking-wide text-lg">
          Ensure & Construct
        </Link>

        {/* Center: Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-white/70">
          {["Overview", "Engineering", "Materials", "Process", "Consultation"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-white transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Right: CTA */}
        <button className="relative group px-4 py-1.5 rounded-full text-sm font-semibold text-white bg-transparent border border-white/20 hover:border-accent-secondary/50 overflow-hidden transition-all duration-300">
          <span className="relative z-10">Start Project</span>
          <div className="absolute inset-0 bg-gradient-to-r from-accent-primary to-accent-secondary opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300 -z-10" />
        </button>
      </div>
    </motion.header>
  );
}
