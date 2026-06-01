"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

interface CanvasSequenceProps {
  frameCount: number;
}

export default function CanvasSequence({ frameCount }: CanvasSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Map scroll progress to frame index
  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, frameCount]);

  useEffect(() => {
    // Preload all images
    const preloadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      let loadedCount = 0;

      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        // The images are named ezgif-frame-001.jpg to ezgif-frame-300.jpg
        const paddedIndex = i.toString().padStart(3, "0");
        img.src = `/images/ezgif-frame-${paddedIndex}.jpg`;

        await new Promise<void>((resolve) => {
          img.onload = () => {
            loadedImages[i - 1] = img;
            loadedCount++;
            if (loadedCount === frameCount) {
              setImages(loadedImages);
              setLoaded(true);
            }
            resolve();
          };
          img.onerror = () => {
            console.error(`Failed to load frame ${paddedIndex}`);
            loadedImages[i - 1] = img;
            loadedCount++;
            if (loadedCount === frameCount) {
              setImages(loadedImages);
              setLoaded(true);
            }
            resolve();
          };
        });
      }
    };

    preloadImages();
  }, [frameCount]);

  // Initial draw
  useEffect(() => {
    if (loaded && images.length > 0 && canvasRef.current) {
      drawFrame(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, images]);

  const drawFrame = (index: number) => {
    if (!canvasRef.current || !images[index]) return;
    const ctx = canvasRef.current.getContext("2d", { alpha: true });
    if (!ctx) return;

    const img = images[index];
    const canvas = canvasRef.current;

    // Enable high-quality rendering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Maintain aspect ratio while covering the canvas
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio); // Use max for 'cover'
    
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Enhanced background with subtle gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#0A0A0A");
    gradient.addColorStop(0.5, "#0F0F12");
    gradient.addColorStop(1, "#0A0A0A");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Crop the bottom 40 pixels to remove the ezgif watermark
    const cropBottom = 40;

    // Draw with high quality
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height - cropBottom,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      (img.height - cropBottom) * ratio
    );

    // Add subtle vignette effect for premium feel
    const vignetteGradient = ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      0,
      canvas.width / 2,
      canvas.height / 2,
      Math.max(canvas.width, canvas.height)
    );
    vignetteGradient.addColorStop(0, "rgba(0, 0, 0, 0)");
    vignetteGradient.addColorStop(0.7, "rgba(0, 0, 0, 0.1)");
    vignetteGradient.addColorStop(1, "rgba(0, 0, 0, 0.4)");
    ctx.fillStyle = vignetteGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (!loaded) return;
    const index = Math.min(frameCount - 1, Math.max(0, Math.floor(latest) - 1));
    // requestAnimationFrame to decouple rendering from scroll events
    requestAnimationFrame(() => drawFrame(index));
  });

  // Handle window resize with debouncing
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;
    
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (canvasRef.current) {
          canvasRef.current.width = window.innerWidth;
          canvasRef.current.height = window.innerHeight;
          if (loaded) {
            drawFrame(Math.min(frameCount - 1, Math.max(0, Math.floor(frameIndex.get()) - 1)));
          }
        }
      }, 150);
    };

    handleResize(); // Initial setup
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, frameIndex]);

  return (
    <div className="sticky top-0 left-0 w-full h-screen overflow-hidden -z-10 bg-gradient-to-br from-[#0A0A0A] via-[#0F0F12] to-[#0A0A0A]">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full" 
        style={{
          filter: "contrast(1.05) brightness(0.95)",
        }}
      />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-accent-secondary/30 border-t-accent-secondary animate-spin" />
            <p className="text-white/40 text-sm font-light tracking-wide">
              Loading Cinematic Experience
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
