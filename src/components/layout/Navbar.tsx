"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";

// ============================================================
// Navbar — Premium Floating Glassmorphic Navigation
// ============================================================

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // ScrollSpy for Active Navigation Link
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let currentIntersecting = "";
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            currentIntersecting = entry.target.id;
          }
        });
        if (currentIntersecting) {
          setActiveSection(currentIntersecting);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    NAV_LINKS.forEach((link) => {
      const id = link.href.substring(1);
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center mt-4 px-4 pointer-events-none">
      <div 
        className={cn(
          "pointer-events-auto flex items-center justify-between px-6 h-14 rounded-full transition-all duration-500 w-full max-w-5xl",
          scrolled 
            ? "bg-[#050505]/80 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]" 
            : "bg-transparent border border-transparent"
        )}
      >
        {/* Logo */}
        <a
          href="#"
          className="text-lg font-bold tracking-tight text-white transition-opacity duration-200 hover:opacity-80 flex items-center gap-2"
          onClick={() => setActiveSection("")}
        >
          <Logo className="w-6 h-6 text-white" />
          {SITE.name}
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <li key={link.href} className="relative flex items-center h-full py-4">
                <a
                  href={link.href}
                  onClick={() => setActiveSection(link.href.substring(1))}
                  className={cn(
                    "text-sm font-medium transition-colors duration-300 relative z-10",
                    isActive ? "text-white" : "text-white/60 hover:text-white"
                  )}
                >
                  {link.label}
                </a>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        {/* CTA Button (Premium White) */}
        <div className="hidden md:block">
          <a 
            href="#contact" 
            className="px-5 py-2.5 text-sm font-medium text-black bg-white rounded-full hover:bg-white/90 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:scale-105"
          >
            Book a Call
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="absolute top-20 left-4 right-4 pointer-events-auto rounded-3xl border border-white/10 bg-[#050505]/95 backdrop-blur-3xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <ul className="flex flex-col p-6 gap-4">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <a
                    href={link.href}
                    className="block text-lg font-medium text-white/70 hover:text-white transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                className="pt-4 mt-2 border-t border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <a
                  href="#contact"
                  className="flex justify-center w-full py-3.5 text-base font-medium text-black bg-white rounded-full hover:bg-white/90 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Book a Call
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
