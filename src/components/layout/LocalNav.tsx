"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { motion } from "framer-motion";

export function LocalNav() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show local nav styling when we scroll a bit
      setIsScrolled(window.scrollY > 100);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        "sticky top-16 z-40 w-full transition-colors duration-500",
        isScrolled
          ? "bg-nova-black/80 backdrop-blur-xl border-b border-nova-border"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8">
        <div className="text-[1.0625rem] font-medium tracking-tight text-nova-white">
          {SITE.name} Pro
        </div>
        
        <ul className="hidden sm:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[0.875rem] text-nova-gray hover:text-nova-white transition-colors duration-300"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="rounded-full bg-nova-white/10 px-3 py-1 text-[0.875rem] text-nova-white transition-colors hover:bg-nova-white/20"
            >
              Get Started
            </a>
          </li>
        </ul>
      </div>
    </motion.div>
  );
}
