"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import CanvasSequence from "@/components/CanvasSequence";
import Navbar from "@/components/Navbar";

export default function Home() {
  const { scrollYProgress } = useScroll();

  // HERO (0-15%)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  // ENGINEERING REVEAL (15-40%) - Left Aligned
  const engOpacity = useTransform(scrollYProgress, [0.15, 0.2, 0.35, 0.4], [0, 1, 1, 0]);
  const engX = useTransform(scrollYProgress, [0.15, 0.2], [-50, 0]);

  // MATERIALS & INTELLIGENCE (40-65%) - Right Aligned
  const matOpacity = useTransform(scrollYProgress, [0.4, 0.45, 0.6, 0.65], [0, 1, 1, 0]);
  const matX = useTransform(scrollYProgress, [0.4, 0.45], [50, 0]);

  // DESIGN & UPSCALING (65-85%) - Left Aligned
  const designOpacity = useTransform(scrollYProgress, [0.65, 0.7, 0.8, 0.85], [0, 1, 1, 0]);
  const designY = useTransform(scrollYProgress, [0.65, 0.7], [50, 0]);

  // REASSEMBLY & CTA (85-100%) - Centered
  const ctaOpacity = useTransform(scrollYProgress, [0.85, 0.9, 1], [0, 1, 1]);
  const ctaY = useTransform(scrollYProgress, [0.85, 0.9], [50, 0]);

  return (
    <main className="relative bg-background min-h-[500vh]">
      <Navbar />

      {/* Sticky Canvas Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Subtle background gradient to match hero lighting */}
        <div className="absolute inset-0 bg-gradient-hero mix-blend-screen opacity-50 z-0 pointer-events-none" />
        
        {/* The Image Sequence */}
        <div className="absolute inset-0 z-0">
          <CanvasSequence frameCount={300} />
        </div>

        {/* Storytelling Text Layers - Positioned over canvas */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="relative w-full h-full max-w-7xl mx-auto px-6">
            
            {/* HERO */}
            <motion.div
              style={{ opacity: heroOpacity, y: heroY }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center mt-20"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white/90 mb-4 tracking-tighter drop-shadow-lg">
                Ensure & Construct
              </h1>
              <p className="text-2xl md:text-3xl text-white/80 font-light mb-6">
                Foundations, perfected.
              </p>
              <p className="text-body max-w-lg text-lg">
                Flagship residential and commercial builds, re-engineered for a world that never stops.
              </p>
            </motion.div>

            {/* ENGINEERING REVEAL */}
            <motion.div
              style={{ opacity: engOpacity, x: engX }}
              className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 max-w-md flex flex-col justify-center"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white/90 mb-6 tracking-tight text-gradient-cyan pb-1">
                Precision-engineered for longevity.
              </h2>
              <div className="space-y-4 text-body text-lg">
                <p>
                  Custom frameworks, reinforced structures, and optimized layouts deliver generational quality.
                </p>
                <p>
                  Every detail is tuned for balance, power, and comfort—year after year.
                </p>
              </div>
            </motion.div>

            {/* MATERIALS & INTELLIGENCE */}
            <motion.div
              style={{ opacity: matOpacity, x: matX }}
              className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 max-w-md flex flex-col justify-center text-right"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white/90 mb-6 tracking-tight text-gradient-cyan pb-1">
                Adaptive building, redefined.
              </h2>
              <div className="space-y-4 text-body text-lg">
                <p>Multi-layered insulation listens to the environment.</p>
                <p>Real-time climate analysis adjusts to your needs.</p>
                <p>Your space stays pure—heat, cold, and noise fade away.</p>
              </div>
            </motion.div>

            {/* DESIGN & UPSCALING */}
            <motion.div
              style={{ opacity: designOpacity, y: designY }}
              className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 max-w-md flex flex-col justify-center"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white/90 mb-6 tracking-tight text-gradient-cyan pb-1">
                Immersive, lifelike spaces.
              </h2>
              <div className="space-y-4 text-body text-lg">
                <p>
                  High-performance materials unlock detail, depth, and texture in every room.
                </p>
                <p>
                  AI-enhanced structural planning restores clarity to complex builds, so every corner feels alive.
                </p>
              </div>
            </motion.div>

            {/* REASSEMBLY & CTA */}
            <motion.div
              style={{ opacity: ctaOpacity, y: ctaY }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center mt-20 pointer-events-auto"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-white/90 mb-4 tracking-tighter drop-shadow-2xl">
                Live everything.<br />Feel nothing else.
              </h2>
              <p className="text-xl text-white/80 font-light mb-10">
                Ensure & Construct. Designed for focus, crafted for living.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <button className="relative group px-8 py-4 rounded-full text-lg font-semibold text-white bg-[#0A0A0C] border border-accent-secondary/30 hover:border-accent-secondary overflow-hidden transition-all duration-300">
                  <span className="relative z-10">Experience Ensure</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
                <button className="text-white/60 hover:text-white transition-colors text-lg underline underline-offset-4 decoration-white/20 hover:decoration-white">
                  See full capabilities
                </button>
              </div>
              <p className="mt-8 text-sm text-white/40">
                Engineered for families, businesses, and everything in between.
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </main>
  );
}
