"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { AnnouncementBar } from "@/components/shared/announcement-bar";
import { Menu, X, ChevronDown } from "lucide-react";
import { mainNav } from "@/data/navigation";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Passive scroll listener with hysteresis to eliminate glitching/jittering
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const top = window.scrollY;
          // Hysteresis: activate at 30px, deactivate only below 10px
          setIsScrolled((prev) => {
            if (top > 30 && !prev) return true;
            if (top < 10 && prev) return false;
            return prev;
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check initial state
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll cleanly when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  // On non-home pages, always have a solid/blurred background for consistency
  const showBackground = !isHome || isScrolled || isMobileOpen;

  return (
    <>
      <AnnouncementBar />
      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-colors duration-200 flex flex-col ${
          showBackground
            ? "bg-paper/90 backdrop-blur-md border-b border-mist/80 shadow-xs"
            : "bg-transparent"
        }`}
      >
        <nav className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative w-48 sm:w-64 h-12 sm:h-14 flex items-center">
              {/* Image logo for dark hero */}
              <Image
                src="/images/logo_light.png"
                alt="AMIBA"
                fill
                className={`object-contain object-left transition-opacity duration-300 ${showBackground ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                priority
                loading="eager"
              />
              {/* Image logo for light scrolled navbar */}
              <Image
                src="/images/logo_light.png"
                alt="AMIBA Pharmaceuticals"
                fill
                className={`object-contain object-left transition-opacity duration-300 ${showBackground ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {mainNav.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              
              if (link.subItems) {
                return (
                  <div key={link.href} className="relative group">
                    <button
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
                        isActive
                          ? "text-signal-teal bg-signal-teal/10"
                          : isHome && !isScrolled
                          ? "text-white/80 hover:text-white hover:bg-white/10"
                          : "text-slate hover:text-ink hover:bg-mist/50"
                      }`}
                    >
                      {link.label}
                      <ChevronDown size={14} className="opacity-70 group-hover:rotate-180 transition-transform duration-200" />
                    </button>
                    <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[200px]">
                      <div className="bg-white rounded-xl shadow-lg border border-slate/10 p-2 flex flex-col gap-1">
                        {link.subItems.map((subItem) => {
                          const isSubActive = pathname === subItem.href;
                          return (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                isSubActive
                                  ? "text-signal-teal bg-signal-teal/5"
                                  : "text-slate hover:text-ink hover:bg-mist/50"
                              }`}
                            >
                              {subItem.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? "text-signal-teal bg-signal-teal/10"
                      : isHome && !isScrolled
                      ? "text-white/80 hover:text-white hover:bg-white/10"
                      : "text-slate hover:text-ink hover:bg-mist/50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/faq"
              className={`text-sm transition-colors ${
                isHome && !isScrolled
                  ? "text-white/80 hover:text-white"
                  : "text-slate hover:text-ink"
              }`}
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className="btn-capsule btn-teal !py-2.5 !px-6 !text-sm"
            >
              Request a Quote
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className={`lg:hidden p-2.5 -mr-2 rounded-lg transition-colors ${
              isHome && !showBackground
                ? "text-white hover:bg-white/10"
                : "text-ink hover:bg-mist/50"
            }`}
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-paper/98 backdrop-blur-xl lg:hidden flex flex-col pt-20 pb-8 px-6 overflow-y-auto"
            style={{ height: "100dvh" }}
          >
            <div className="flex flex-col items-center justify-center flex-1 gap-6 my-auto">
              {mainNav.map((link, i) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                if (link.subItems) {
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="flex flex-col items-center gap-4 w-full"
                    >
                      <span className={`text-2xl font-semibold font-[var(--font-display)] ${isActive ? "text-signal-teal" : "text-ink"}`}>
                        {link.label}
                      </span>
                      <div className="flex flex-col items-center gap-3 w-full bg-mist/30 py-4 rounded-2xl">
                        {link.subItems.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setIsMobileOpen(false)}
                            className={`text-lg font-medium ${
                              pathname === sub.href ? "text-signal-teal" : "text-slate hover:text-ink"
                            }`}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={`text-2xl font-semibold font-[var(--font-display)] ${
                        isActive ? "text-signal-teal" : "text-ink"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: mainNav.length * 0.04 }}
              >
                <Link
                  href="/faq"
                  onClick={() => setIsMobileOpen(false)}
                  className="text-2xl font-semibold font-[var(--font-display)] text-ink"
                >
                  FAQ
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (mainNav.length + 1) * 0.04 }}
                className="mt-4 w-full max-w-xs flex justify-center"
              >
                <Link
                  href="/contact"
                  onClick={() => setIsMobileOpen(false)}
                  className="btn-capsule btn-teal w-full text-center"
                >
                  Request a Quote
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
