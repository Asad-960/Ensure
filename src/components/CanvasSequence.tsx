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
            loadedImages[i - 1] = img; // Fallback or handle error appropriately
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
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const img = images[index];
    const canvas = canvasRef.current;

    // Maintain aspect ratio while covering the canvas like object-fit: contain/cover
    // The prompt requested: "centered and scaled to fit while preserving aspect ratio"
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.min(hRatio, vRatio); // Use min for 'contain', max for 'cover'
    
    // Using min makes sure the whole building is visible without cropping
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Fill background with exact image dark color to blend edges seamlessly
    ctx.fillStyle = "#101010";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Crop the bottom 40 pixels to remove the ezgif watermark
    const cropBottom = 40;

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
  };

  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (!loaded) return;
    const index = Math.min(frameCount - 1, Math.max(0, Math.floor(latest) - 1));
    // requestAnimationFrame to decouple rendering from scroll events
    requestAnimationFrame(() => drawFrame(index));
  });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        if (loaded) {
          drawFrame(Math.min(frameCount - 1, Math.max(0, Math.floor(frameIndex.get()) - 1)));
        }
      }
    };

    handleResize(); // Initial setup
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, frameIndex]);

  return (
    <div className="sticky top-0 left-0 w-full h-screen overflow-hidden -z-10 bg-[#101010]">
      <canvas ref={canvasRef} className="w-full h-full" />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center text-white/50 text-sm">
          Loading Cinematic Experience...
        </div>
      )}
    </div>
  );
}
