"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-clinical-navy -mt-16 sm:-mt-20 pt-16 sm:pt-20">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/hero/poster.jpg"
          className="w-full h-full object-cover"
        >
          <source src="/hero/A_seamless_slow_motion_abstr (online-video-cutter.com).mp4" type="video/mp4" />
        </video>
        {/* Dark overlay specifically to guarantee text readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Subtle gradient overlay to blend with the bottom of the section */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-clinical-navy/90" />

      {/* Floating capsule shapes */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute top-1/4 right-[15%] w-32 h-16 rounded-full bg-signal-teal/10 border border-signal-teal/20 blur-sm hidden md:block"
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/3 left-[10%] w-24 h-12 rounded-full bg-pulse-coral/10 border border-pulse-coral/15 blur-sm hidden md:block"
            animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <motion.div
            className="absolute top-[60%] right-[30%] w-20 h-10 rounded-full bg-white/5 border border-white/10 blur-[1px] hidden md:block"
            animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          {/* Floating molecule nodes */}
          <motion.div
            className="absolute top-[20%] left-[20%] w-3 h-3 rounded-full bg-signal-teal/40"
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-[40%] right-[25%] w-2 h-2 rounded-full bg-pulse-coral/40"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
          />
        </>
      )}

      {/* Grain overlay */}
      <div className="grain-overlay absolute inset-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 sm:pt-24">
        <motion.p
          className="text-editorial text-signal-teal text-lg md:text-xl mb-6"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Your health, Our priority
        </motion.p>

        <motion.h1
          className="text-display-xl text-white mb-6"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          Pharmaceutical supply
          <br className="hidden sm:inline" />
          {" "}
          <span className="text-signal-teal">you can trust</span>
        </motion.h1>

        <motion.p
          className="text-body-lg text-white/60 max-w-2xl mx-auto mb-10"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          AMIBA partners with hospitals, pharmacies, and healthcare institutions
          across India — delivering GMP-certified medicines and medical supplies
          with complete supply chain transparency.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link
            href="/products"
            className="btn-capsule btn-teal inline-flex items-center gap-2"
          >
            Explore Products
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/contact"
            className="btn-capsule btn-secondary !border-white/20 !text-white hover:!border-signal-teal hover:!text-signal-teal"
          >
            Request a Quote
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={24} className="text-white/30" />
        </motion.div>
      )}
    </section>
  );
}
