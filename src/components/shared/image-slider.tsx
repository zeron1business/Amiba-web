"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Package } from "lucide-react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

interface ImageSliderProps {
  images: string[];
  alt: string;
  autoPlay?: boolean;
  interval?: number;
  className?: string;
  imageClassName?: string;
}

export function ImageSlider({
  images,
  alt,
  autoPlay = true,
  interval = 3500,
  className = "",
  imageClassName = "",
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      setDirection(1);
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    },
    [images.length]
  );

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      setDirection(-1);
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    },
    [images.length]
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  // Auto-play with smooth transitions
  useEffect(() => {
    if (!autoPlay || images.length <= 1 || isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoPlay, images.length, isHovered, interval]);

  if (!images || images.length === 0) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <Package size={48} className="text-slate/30" />
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div className={`relative ${className}`}>
        <Image src={images[0]} alt={alt} fill className={imageClassName} />
      </div>
    );
  }

  // Smooth sliding variants
  const slideVariants = prefersReducedMotion
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        enter: (dir: number) => ({
          x: dir > 0 ? "100%" : "-100%",
          opacity: 0,
          scale: 0.95,
        }),
        center: {
          x: 0,
          opacity: 1,
          scale: 1,
        },
        exit: (dir: number) => ({
          x: dir > 0 ? "-100%" : "100%",
          opacity: 0,
          scale: 0.95,
        }),
      };

  return (
    <div
      className={`relative overflow-hidden group/slider ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="popLayout" custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 35, mass: 0.8 },
            opacity: { duration: 0.35, ease: "easeInOut" },
            scale: { duration: 0.35, ease: "easeInOut" },
          }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex]}
            alt={`${alt} - View ${currentIndex + 1}`}
            fill
            className={imageClassName}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows — always visible on mobile, hover on desktop */}
      <div className="absolute inset-0 flex items-center justify-between p-2 sm:p-3 opacity-100 sm:opacity-0 sm:group-hover/slider:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
        <button
          type="button"
          onClick={handlePrev}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/90 text-ink shadow-md hover:bg-white hover:shadow-lg pointer-events-auto transition-all active:scale-90 backdrop-blur-sm border border-mist/80"
          aria-label="Previous image"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/90 text-ink shadow-md hover:bg-white hover:shadow-lg pointer-events-auto transition-all active:scale-90 backdrop-blur-sm border border-mist/80"
          aria-label="Next image"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Slide indicator dots */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDirection(i > currentIndex ? 1 : -1);
              setCurrentIndex(i);
            }}
            className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
              i === currentIndex
                ? "w-5 bg-signal-teal shadow-[0_0_8px_rgba(0,178,160,0.4)]"
                : "w-1.5 bg-slate/40 hover:bg-slate/60"
            }`}
            aria-label={`View image ${i + 1}`}
          />
        ))}
      </div>

      {/* Subtle progress bar for auto-play */}
      {autoPlay && !isHovered && (
        <div className="absolute top-0 left-0 right-0 h-0.5 z-10">
          <motion.div
            key={`progress-${currentIndex}`}
            className="h-full bg-signal-teal/50"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: interval / 1000, ease: "linear" }}
          />
        </div>
      )}
    </div>
  );
}
