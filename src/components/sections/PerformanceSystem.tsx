"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { Crosshair, Layers, BarChart3 } from "lucide-react";
import { SYSTEM_SECTION } from "@/lib/constants";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const iconMap = {
  Crosshair,
  Layers,
  BarChart3,
} as const;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

function AssemblyCard({
  card,
  index,
  progress,
  isMobile,
}: {
  card: typeof SYSTEM_SECTION.cards[0];
  index: number;
  progress: any; // scrollYProgress
  isMobile: boolean;
}) {
  const prefersReduced = useReducedMotion();

  // Animation mapping:
  // Card 0: starts moving at 0.0, locks at 0.3
  // Card 1: starts moving at 0.25, locks at 0.55
  // Card 2: starts moving at 0.5, locks at 0.8
  const pStart = index * 0.25;
  const pEnd = pStart + 0.3;

  // Desktop: Horizontal row Assembly
  const xOffsetDesktop = index === 0 ? "-105%" : index === 1 ? "0%" : "105%";
  const yOffsetDesktop = "0%";
  
  // Mobile: Vertical column Assembly
  const xOffsetMobile = "0%";
  const yOffsetMobile = index === 0 ? "-105%" : index === 1 ? "0%" : "105%";

  // Transform values based on scroll progress
  const x = useTransform(
    progress,
    [0, pStart, pEnd, 1],
    ["-200vw", "-200vw", isMobile ? xOffsetMobile : xOffsetDesktop, isMobile ? xOffsetMobile : xOffsetDesktop]
  );

  const y = useTransform(
    progress,
    [0, pStart, pEnd, 1],
    ["0%", "0%", isMobile ? yOffsetMobile : yOffsetDesktop, isMobile ? yOffsetMobile : yOffsetDesktop]
  );

  const scale = useTransform(
    progress,
    [0, pStart, pEnd, 1],
    [0.5, 0.5, 1, 1]
  );

  const opacity = useTransform(
    progress,
    [0, pStart, pStart + 0.1, pEnd, 1],
    [0, 0, 1, 1, 1]
  );

  // Intense lighting flare precisely when the part "locks" into the machine
  const glowOpacity = useTransform(
    progress,
    [pEnd - 0.1, pEnd, pEnd + 0.1],
    [0, 1, 0] 
  );

  // Subtle persistent glow after landing
  const persistentGlow = useTransform(
    progress,
    [pEnd - 0.05, pEnd],
    [0, 1]
  );

  const Icon = iconMap[card.icon];
  
  // Premium Neon Colors: Blue, Purple, Emerald
  const color = index === 0 ? "rgba(56,189,248" : index === 1 ? "rgba(217,70,239" : "rgba(45,212,191"; 

  const dynamicBg = useMotionTemplate`radial-gradient(circle at 50% 50%, ${color}, 0.25), transparent 70%)`;
  const persistentBg = useMotionTemplate`radial-gradient(circle at 50% 0%, ${color}, 0.10), transparent 50%)`;
  const iconBg = useMotionTemplate`linear-gradient(135deg, ${color}, 0.3), transparent)`;
  const lineBg = useMotionTemplate`linear-gradient(90deg, transparent, ${color}, 0.8), transparent)`;

  return (
    <motion.div
      className="absolute w-[90vw] md:w-full max-w-[380px] h-[220px] md:h-[480px] rounded-[32px] border border-white/10 bg-[#050505]/90 backdrop-blur-3xl flex flex-col justify-between overflow-hidden shadow-2xl"
      style={prefersReduced ? { x: isMobile ? xOffsetMobile : xOffsetDesktop, y: isMobile ? yOffsetMobile : yOffsetDesktop, scale: 1, opacity: 1 } : { x, y, scale, opacity }}
    >
      {/* 1. Impact Flare (Flashes when it lands) */}
      <motion.div
        className="absolute inset-0 pointer-events-none mix-blend-screen z-0"
        style={{ background: dynamicBg, opacity: glowOpacity }}
      />
      
      {/* 2. Persistent Ambient Glow */}
      <motion.div
        className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] pointer-events-none mix-blend-screen z-0"
        style={{ background: persistentBg, opacity: persistentGlow }}
      />

      <div className="relative z-20 p-6 md:p-8 pt-6 md:pt-10">
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center relative overflow-hidden">
            <Icon className="text-white relative z-10 w-6 h-6 md:w-7 md:h-7" strokeWidth={1.5} />
            <motion.div 
               className="absolute inset-0 z-0"
               style={{ background: iconBg, opacity: persistentGlow }}
            />
          </div>
          <span className="text-[10px] md:text-[11px] font-bold text-white/30 tracking-[0.3em] font-mono mt-2">
            {card.number}
          </span>
        </div>
      </div>

      <div className="relative z-20 p-6 md:p-8 pb-6 md:pb-10 mt-auto">
        <h3 className="text-xl md:text-3xl font-semibold text-white tracking-tight mb-2 md:mb-4 drop-shadow-md">
          {card.title}
        </h3>
        <p className="text-nova-gray text-sm md:text-lg leading-relaxed line-clamp-2 md:line-clamp-none">
          {card.description}
        </p>
      </div>

      {/* 3. Bottom Energy Line */}
      <motion.div 
         className="absolute bottom-0 left-0 right-0 h-[2px] z-30"
         style={{ background: lineBg, opacity: persistentGlow }}
      />
    </motion.div>
  );
}

export function PerformanceSystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Fade out the heading and move it up as the cards assemble to keep focus on the machine
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const headerScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  const headerY = useTransform(scrollYProgress, [0, 0.15], [0, -100]);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-black" id="system">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Background Grid to give a "blueprint / factory" feel */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10 pointer-events-none" />

        {/* Section Header */}
        <motion.div 
          className="absolute top-[10%] md:top-[15%] w-full text-center px-6 z-10"
          style={{ opacity: headerOpacity, scale: headerScale, y: headerY }}
        >
          <p className="text-xs md:text-sm text-nova-muted mb-4 md:mb-6 uppercase tracking-[0.2em]">
            {SYSTEM_SECTION.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-nova-white max-w-3xl mx-auto">
            {SYSTEM_SECTION.heading}
          </h2>
        </motion.div>

        {/* Machine Assembly Area */}
        <div className="relative w-full max-w-7xl mx-auto flex items-center justify-center h-full">
          {SYSTEM_SECTION.cards.map((card, i) => (
            <AssemblyCard 
              key={card.title} 
              card={card as any} 
              index={i} 
              progress={scrollYProgress} 
              isMobile={isMobile}
            />
          ))}
        </div>
        
      </div>
    </div>
  );
}
