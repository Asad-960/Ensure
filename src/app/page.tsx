"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import CanvasSequence from "@/components/CanvasSequence";
import Navbar from "@/components/Navbar";

export default function Home() {
  const { scrollYProgress } = useScroll();

  // HERO (0-15%)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -80]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.9]);

  // ENGINEERING REVEAL (15-40%) - Left Aligned
  const engOpacity = useTransform(scrollYProgress, [0.15, 0.2, 0.35, 0.4], [0, 1, 1, 0]);
  const engX = useTransform(scrollYProgress, [0.15, 0.2], [-100, 0]);

  // MATERIALS & INTELLIGENCE (40-65%) - Right Aligned
  const matOpacity = useTransform(scrollYProgress, [0.4, 0.45, 0.6, 0.65], [0, 1, 1, 0]);
  const matX = useTransform(scrollYProgress, [0.4, 0.45], [100, 0]);

  // DESIGN & UPSCALING (65-85%) - Left Aligned
  const designOpacity = useTransform(scrollYProgress, [0.65, 0.7, 0.8, 0.85], [0, 1, 1, 0]);
  const designY = useTransform(scrollYProgress, [0.65, 0.7], [80, 0]);

  // REASSEMBLY & CTA (85-100%) - Centered
  const ctaOpacity = useTransform(scrollYProgress, [0.85, 0.9, 1], [0, 1, 1]);
  const ctaY = useTransform(scrollYProgress, [0.85, 0.9], [80, 0]);
  const ctaScale = useTransform(scrollYProgress, [0.85, 0.95], [0.95, 1]);

  return (
    <main className="relative bg-background min-h-[500vh] overflow-x-hidden">
      <Navbar />

      {/* Sticky Canvas Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Premium gradient overlay */}
        <div className="absolute inset-0 bg-gradient-dark mix-blend-screen opacity-60 z-0 pointer-events-none" />
        
        {/* The Image Sequence */}
        <div className="absolute inset-0 z-0">
          <CanvasSequence frameCount={300} />
        </div>

        {/* Storytelling Text Layers - Positioned over canvas */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="relative w-full h-full max-w-7xl mx-auto px-6 sm:px-8">
            
            {/* HERO */}
            <motion.div
              style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center pt-24"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="text-6xl sm:text-7xl md:text-8xl font-black text-white mb-6 tracking-tighter drop-shadow-2xl leading-tight">
                  <span className="text-gradient-cyan">Ensure</span>
                  <br />
                  &amp; Construct
                </h1>
              </motion.div>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-2xl sm:text-3xl md:text-4xl text-white/90 font-light mb-8 tracking-wide"
              >
                Foundations, perfected.
              </motion.p>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg sm:text-xl text-white/60 max-w-2xl font-light leading-relaxed"
              >
                Flagship residential and commercial builds, re-engineered for a world that never stops.
              </motion.p>
            </motion.div>

            {/* ENGINEERING REVEAL */}
            <motion.div
              style={{ opacity: engOpacity, x: engX }}
              className="absolute left-6 sm:left-12 top-1/2 -translate-y-1/2 max-w-md space-y-6"
            >
              <div className="space-y-4">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gradient-cyan leading-tight">
                  Precision
                </h2>
                <p className="text-white/90 text-lg sm:text-xl font-light leading-relaxed">
                  Custom frameworks, reinforced structures, and optimized layouts deliver generational quality.
                </p>
                <p className="text-white/70 text-base sm:text-lg leading-relaxed">
                  Every detail is tuned for balance, power, and comfort—year after year.
                </p>
              </div>
            </motion.div>

            {/* MATERIALS & INTELLIGENCE */}
            <motion.div
              style={{ opacity: matOpacity, x: matX }}
              className="absolute right-6 sm:right-12 top-1/2 -translate-y-1/2 max-w-md text-right space-y-6"
            >
              <div className="space-y-4">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gradient-primary leading-tight">
                  Adaptive
                </h2>
                <p className="text-white/90 text-lg sm:text-xl font-light leading-relaxed">
                  Multi-layered insulation listens to the environment. Real-time climate analysis adjusts to your needs.
                </p>
                <p className="text-white/70 text-base sm:text-lg leading-relaxed">
                  Your space stays pure—heat, cold, and noise fade away.
                </p>
              </div>
            </motion.div>

            {/* DESIGN & UPSCALING */}
            <motion.div
              style={{ opacity: designOpacity, y: designY }}
              className="absolute left-6 sm:left-12 top-1/2 -translate-y-1/2 max-w-md space-y-6"
            >
              <div className="space-y-4">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gradient-cyan leading-tight">
                  Immersive
                </h2>
                <p className="text-white/90 text-lg sm:text-xl font-light leading-relaxed">
                  High-performance materials unlock detail, depth, and texture in every room.
                </p>
                <p className="text-white/70 text-base sm:text-lg leading-relaxed">
                  AI-enhanced structural planning restores clarity to complex builds, so every corner feels alive.
                </p>
              </div>
            </motion.div>

            {/* REASSEMBLY & CTA */}
            <motion.div
              style={{ opacity: ctaOpacity, y: ctaY, scale: ctaScale }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center pt-24 pointer-events-auto"
            >
              <motion.h2 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight drop-shadow-2xl"
              >
                Live everything.
                <br />
                <span className="text-gradient-primary">Feel nothing else.</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl sm:text-2xl text-white/70 font-light mb-12 max-w-2xl leading-relaxed"
              >
                Designed for focus, crafted for living. Premium construction that transcends expectations.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-6"
              >
                <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(0, 82, 255, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-premium px-10 py-4 rounded-xl text-lg relative overflow-hidden group"
                >
                  <span className="relative z-10 font-semibold">Experience Ensure</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/40 to-accent-secondary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-white/60 hover:text-white transition-colors text-lg font-light underline underline-offset-4 decoration-white/20 hover:decoration-white duration-300"
                >
                  See full capabilities
                </motion.button>
              </motion.div>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-12 text-sm text-white/40 font-light tracking-wide"
              >
                Engineered for families, businesses, and everything in between.
              </motion.p>
            </motion.div>

          </div>
        </div>

        {/* Vignette overlay */}
        <div className="vignette-overlay z-5" />
      </div>
    </main>
  );
}
