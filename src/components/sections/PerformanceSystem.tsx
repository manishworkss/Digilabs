"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from "framer-motion";
import { Crosshair, Layers, BarChart3 } from "lucide-react";
import { SYSTEM_SECTION } from "@/lib/constants";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Map icon names to components
const iconMap = {
  Crosshair,
  Layers,
  BarChart3,
} as const;

function SystemCard({
  card,
  index,
}: {
  card: typeof SYSTEM_SECTION.cards[0];
  index: number;
}) {
  const prefersReduced = useReducedMotion();

  // Colors for glowing orbs based on index
  const colors = [
    { from: "from-blue-600", to: "to-cyan-400", shadow: "group-hover:shadow-[0_0_80px_-20px_rgba(56,189,248,0.4)]" }, // Strategy
    { from: "from-purple-600", to: "to-pink-500", shadow: "group-hover:shadow-[0_0_80px_-20px_rgba(217,70,239,0.4)]" }, // Creative
    { from: "from-emerald-500", to: "to-teal-400", shadow: "group-hover:shadow-[0_0_80px_-20px_rgba(45,212,191,0.4)]" }, // Optimization
  ];

  const color = colors[index % colors.length];

  // Hover Glow Tracker
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const Icon = iconMap[card.icon];

  return (
    <ScrollReveal delay={0.15 + index * 0.1} className="h-full">
      <motion.div
        onMouseMove={handleMouseMove}
        className={`group relative rounded-[32px] border border-white/5 bg-[#050505] overflow-hidden h-full min-h-[460px] flex flex-col justify-between transition-all duration-700 ${color.shadow}`}
        whileHover={
          prefersReduced
            ? {}
            : {
                y: -8,
                transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
              }
        }
      >
        {/* Intense Mouse Tracking Glow Layer (Apple Style Spotlight) */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 transition duration-500 group-hover:opacity-100 z-30 mix-blend-screen"
          style={{
            background: useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.06), transparent 40%)`,
          }}
        />

        {/* Dynamic Glowing Orb (Apple 'Surprise and Shine' Style) */}
        <div className="absolute inset-0 z-0 overflow-hidden rounded-[32px] pointer-events-none">
          <motion.div
            className={`absolute w-[300px] h-[300px] rounded-full bg-gradient-to-br ${color.from} ${color.to} blur-[80px] opacity-20 mix-blend-screen`}
            animate={
              prefersReduced
                ? {}
                : {
                    x: ["-20%", "40%", "-10%", "-20%"],
                    y: ["-20%", "10%", "40%", "-20%"],
                    scale: [1, 1.3, 0.9, 1],
                  }
            }
            transition={{
              duration: 15 + index * 2,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              top: index === 1 ? "-10%" : "auto",
              bottom: index !== 1 ? "-10%" : "auto",
              left: index === 0 ? "-10%" : "auto",
              right: index !== 0 ? "-10%" : "auto",
            }}
          />
          {/* Intense center glow on hover */}
          <div className="absolute inset-0 bg-black/60 transition-opacity duration-700 group-hover:opacity-30 z-10" />
        </div>

        {/* 3D Floating Icon / Top Section */}
        <div className="relative z-20 p-8 pt-10">
          <div className="flex items-start justify-between">
            <motion.div 
              className="w-16 h-16 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-2xl relative overflow-hidden"
              whileHover={{ scale: 1.1, rotate: index % 2 === 0 ? 5 : -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${color.from} ${color.to} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
              <Icon
                size={28}
                className="text-white/80 transition-all duration-500 group-hover:text-white group-hover:scale-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                strokeWidth={1.5}
              />
            </motion.div>
            
            <span className="text-[11px] font-bold text-white/30 tracking-[0.3em] font-mono">
              {card.number}
            </span>
          </div>
        </div>

        {/* Bottom Content with Floating Text Effect */}
        <div className="relative z-20 p-8 pb-10 mt-auto">
          <motion.div
            initial={{ y: 0 }}
            whileHover={prefersReduced ? {} : { y: -5 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h3 className="text-3xl font-semibold text-white tracking-tight mb-4 drop-shadow-lg">
              {card.title}
            </h3>
            <p className="text-nova-gray text-lg leading-relaxed group-hover:text-white/90 transition-colors duration-500">
              {card.description}
            </p>
          </motion.div>
          
          {/* Neon animated bottom border line inside the card */}
          <div className="absolute bottom-0 left-8 right-8 h-[2px] bg-white/5 overflow-hidden rounded-t-full">
             <motion.div 
                className={`absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100`}
                animate={{ x: ["-100%", "300%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
             />
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

export function PerformanceSystem() {
  return (
    <SectionWrapper id="system">
      <ScrollReveal>
        <p className="text-sm text-nova-muted mb-6 uppercase tracking-[0.2em]">
          {SYSTEM_SECTION.eyebrow}
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-nova-white max-w-3xl mb-14 md:mb-20">
          {SYSTEM_SECTION.heading}
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        {SYSTEM_SECTION.cards.map((card, i) => (
          <SystemCard key={card.title} card={card as any} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
