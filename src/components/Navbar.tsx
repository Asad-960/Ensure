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

  // Enhanced scroll-based animations
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.9]);
  const backdropBlur = useTransform(scrollY, [0, 80], [0, 14]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.1]);

  const backgroundColor = useTransform(bgOpacity, (val) => `rgba(10, 10, 10, ${val})`);
  const backdropFilter = useTransform(backdropBlur, (val) => `blur(${val}px)`);
  const borderColor = useTransform(borderOpacity, (val) => `rgba(255, 255, 255, ${val})`);

  if (!isMounted) return null;

  return (
    <motion.header
      style={{
        backgroundColor,
        backdropFilter,
        borderColor,
      }}
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center border-b px-6 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        {/* Left: Logo with gradient */}
        <Link 
          href="/" 
          className="text-white font-bold tracking-wider text-lg bg-gradient-to-r from-white via-[#00D9FF] to-[#0052FF] bg-clip-text text-transparent hover:from-[#00D9FF] hover:to-[#0052FF] transition-all duration-300"
        >
          Ensure &amp; Construct
        </Link>

        {/* Center: Links */}
        <nav className="hidden md:flex items-center space-x-10 text-sm font-medium">
          {["Overview", "Engineering", "Materials", "Process", "Consultation"].map((item, idx) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link
                href={`#${item.toLowerCase()}`}
                className="text-white/60 hover:text-white transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent-primary to-accent-secondary group-hover:w-full transition-all duration-300" />
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Right: CTA */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-premium px-6 py-2 text-sm rounded-lg"
        >
          <span className="relative z-10">Start Project</span>
          <div className="absolute inset-0 bg-gradient-to-r from-accent-primary to-accent-secondary opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg" />
        </motion.button>
      </div>
    </motion.header>
  );
}
