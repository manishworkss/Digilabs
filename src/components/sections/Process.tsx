"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { PROCESS_SECTION } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// ============================================================
// SYSTEM MACHINE VISUALS
// ============================================================

const MachineVisual = ({ progress }: { progress: MotionValue<number> }) => {
  const prefersReducedMotion = useReducedMotion();

  // Mappings for progress to opacity and transforms
  // Phase 1 (0 -> 0.25): Discover activates
  // Phase 2 (0.25 -> 0.5): Build assembles
  // Phase 3 (0.5 -> 0.75): Launch activates
  // Phase 4 (0.75 -> 1.0): Scale completes

  const smoothProgress = useSpring(progress, { stiffness: 100, damping: 20 });

  // Node 1: Discover
  const node1Opacity = useTransform(smoothProgress, [0, 0.1, 1], [0, 1, 1]);
  const node1Y = useTransform(smoothProgress, [0.2, 0.4], [0, -60]);

  // Node 2: Build
  const node2Opacity = useTransform(smoothProgress, [0.2, 0.4, 1], [0, 1, 1]);
  const node2Y = useTransform(smoothProgress, [0.2, 0.4], [40, 0]);
  const buildBlock1X = useTransform(smoothProgress, [0.3, 0.4], [-20, 0]);
  const buildBlock2X = useTransform(smoothProgress, [0.3, 0.4], [20, 0]);

  // Connection 1 -> 2
  const conn12PathLength = useTransform(smoothProgress, [0.3, 0.45], [0, 1]);

  // Node 3: Launch
  const node3Opacity = useTransform(smoothProgress, [0.45, 0.65, 1], [0, 1, 1]);
  const node3Y = useTransform(smoothProgress, [0.45, 0.65], [40, 0]);
  
  // Connection 2 -> 3
  const conn23PathLength = useTransform(smoothProgress, [0.55, 0.7], [0, 1]);

  // Node 4: Scale
  const node4Opacity = useTransform(smoothProgress, [0.7, 0.9, 1], [0, 1, 1]);
  const node4ScaleY = useTransform(smoothProgress, [0.75, 0.9], [0, 1]);

  // Connection 3 -> 4
  const conn34PathLength = useTransform(smoothProgress, [0.8, 0.95], [0, 1]);

  // Final System Glow
  const systemGlowOpacity = useTransform(smoothProgress, [0.9, 1], [0, 0.4]);

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center max-w-lg mx-auto">
      {/* Background ambient glow when complete */}
      <motion.div
        style={{ opacity: systemGlowOpacity }}
        className="absolute inset-0 bg-sky-900/20 rounded-full blur-[100px] pointer-events-none"
      />

      {/* Connection Paths SVG Layer */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 500">
        <defs>
          <linearGradient id="connGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Path 1 -> 2 */}
        <motion.path
          d="M 200 140 C 200 180, 200 200, 200 230"
          fill="none"
          stroke="url(#connGrad)"
          strokeWidth="1.5"
          style={{ pathLength: prefersReducedMotion ? 1 : conn12PathLength }}
        />

        {/* Path 2 -> 3 */}
        <motion.path
          d="M 200 270 C 200 300, 200 320, 200 350"
          fill="none"
          stroke="url(#connGrad)"
          strokeWidth="1.5"
          style={{ pathLength: prefersReducedMotion ? 1 : conn23PathLength }}
        />

        {/* Path 3 -> 4 */}
        <motion.path
          d="M 200 390 C 200 410, 200 420, 200 440"
          fill="none"
          stroke="url(#connGrad)"
          strokeWidth="1.5"
          style={{ pathLength: prefersReducedMotion ? 1 : conn34PathLength }}
        />
      </svg>

      {/* Node 1: Discover */}
      <motion.div
        className="absolute top-[160px] flex flex-col items-center justify-center"
        style={{ opacity: node1Opacity, y: prefersReducedMotion ? -60 : node1Y }}
      >
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 border border-sky-400/30 rounded-full animate-[spin_10s_linear_infinite]" />
          <div className="absolute inset-2 border border-sky-300/20 rounded-full animate-[spin_6s_linear_infinite_reverse]" />
          <div className="w-4 h-4 bg-[#081e3d] border border-sky-400 rounded-full z-10 shadow-[0_0_12px_rgba(56,189,248,0.5)] flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </div>
          {/* Signal dots */}
          <div className="absolute -top-2 -right-2 w-1.5 h-1.5 bg-sky-300 rounded-full opacity-60" />
          <div className="absolute -bottom-1 -left-3 w-1 h-1 bg-sky-200 rounded-full opacity-40" />
        </div>
        <span className="text-[10px] text-sky-400/60 uppercase tracking-widest mt-2 font-mono">Signal</span>
      </motion.div>

      {/* Node 2: Build */}
      <motion.div
        className="absolute top-[250px] flex flex-col items-center justify-center"
        style={{ opacity: node2Opacity, y: prefersReducedMotion ? 0 : node2Y }}
      >
        <div className="relative w-20 h-12 flex items-center justify-center gap-1.5">
          <motion.div
            className="w-5 h-5 border border-sky-400/50 bg-[#040f1f] rounded-sm"
            style={{ x: prefersReducedMotion ? 0 : buildBlock1X }}
          />
          <div className="w-6 h-6 border border-sky-300 bg-[#081e3d] rounded-sm shadow-[0_0_15px_rgba(56,189,248,0.4)] flex items-center justify-center">
            <div className="w-2 h-2 bg-sky-200 rounded-sm" />
          </div>
          <motion.div
            className="w-5 h-5 border border-sky-400/50 bg-[#040f1f] rounded-sm"
            style={{ x: prefersReducedMotion ? 0 : buildBlock2X }}
          />
        </div>
        <span className="text-[10px] text-sky-400/60 uppercase tracking-widest mt-2 font-mono">System</span>
      </motion.div>

      {/* Node 3: Launch */}
      <motion.div
        className="absolute top-[370px] flex flex-col items-center justify-center"
        style={{ opacity: node3Opacity, y: prefersReducedMotion ? 0 : node3Y }}
      >
        <div className="relative w-16 h-10 flex items-end justify-center gap-1.5 border-b border-sky-400/30 pb-1">
          <div className="w-2 h-3 bg-sky-400/40 rounded-t-sm" />
          <div className="w-2 h-6 bg-sky-400/60 rounded-t-sm shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
          <div className="w-2 h-4 bg-sky-400/40 rounded-t-sm" />
          <div className="absolute -top-3 w-3 h-3 border border-sky-300 rounded bg-[#081e3d] flex items-center justify-center rotate-45">
            <div className="w-1 h-1 bg-white rounded-full" />
          </div>
        </div>
        <span className="text-[10px] text-sky-400/60 uppercase tracking-widest mt-3 font-mono">Execute</span>
      </motion.div>

      {/* Node 4: Scale */}
      <motion.div
        className="absolute top-[460px] flex flex-col items-center justify-center"
        style={{ opacity: node4Opacity }}
      >
        <div className="relative w-24 h-16">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 60">
            <motion.path
              d="M 10 50 Q 30 50, 50 30 T 90 10"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2"
              className="drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]"
              style={{ pathLength: prefersReducedMotion ? 1 : node4ScaleY }}
            />
            <circle cx="90" cy="10" r="3" fill="#ffffff" filter="drop-shadow(0 0 4px #ffffff)" />
          </svg>
        </div>
        <span className="text-[10px] text-sky-400/80 uppercase tracking-widest font-mono">Scale</span>
      </motion.div>
    </div>
  );
};

// ============================================================
// INDIVIDUAL TEXT STEP
// ============================================================

const ProcessStep = ({ step, index }: { step: any; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Track this specific element's progress through the viewport
  // Center of viewport activates it
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 60%", "end 40%"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  const titleColor = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], ["#94a3b8", "#ffffff", "#ffffff", "#94a3b8"]);
  const numberColor = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], ["#334155", "#38bdf8", "#38bdf8", "#334155"]);

  return (
    <motion.div 
      ref={ref}
      className="flex flex-col gap-4 min-h-[50vh] sm:min-h-[70vh] justify-center"
      style={{ opacity }}
    >
      <motion.div 
        className="text-sm sm:text-base font-mono tracking-widest"
        style={{ color: numberColor }}
      >
        {step.number}
      </motion.div>
      <motion.h3 
        className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight"
        style={{ color: titleColor }}
      >
        {step.title}
      </motion.h3>
      <p className="text-base sm:text-lg text-slate-400 max-w-md leading-relaxed font-light">
        {step.description}
      </p>
    </motion.div>
  );
};

// ============================================================
// MAIN SECTION
// ============================================================

export function Process() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section 
      id="system" 
      ref={containerRef} 
      className="relative bg-[#01040a] text-white"
    >
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* DESKTOP SPLIT LAYOUT */}
        <div className="hidden lg:grid grid-cols-2 gap-12 xl:gap-24">
          
          {/* Left Column: Scrollable Content */}
          <div className="pt-32 pb-64 pr-8">
            {/* Header */}
            <div className="mb-32">
              <span className="text-sky-400/80 uppercase tracking-widest text-xs font-mono mb-4 block">
                {PROCESS_SECTION.eyebrow}
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight mb-6">
                Four steps to <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-sky-200">compound growth</span>
              </h2>
              <p className="text-slate-400 text-lg max-w-sm font-light">
                A clear, repeatable process designed to turn attention into long-term performance.
              </p>
            </div>

            {/* Steps */}
            <div className="flex flex-col">
              {PROCESS_SECTION.steps.map((step, index) => (
                <ProcessStep key={step.number} step={step} index={index} />
              ))}
            </div>
          </div>

          {/* Right Column: Sticky Visualization */}
          <div className="relative">
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center border-l border-white/[0.03]">
              
              {/* Optional: Tiny Metadata on the right edge */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-12 items-end pr-4 text-[9px] font-mono tracking-[0.2em] text-slate-600 hidden xl:flex">
                <span>STRATEGY</span>
                <span>CREATIVE</span>
                <span>EXECUTION</span>
                <span className="text-sky-500/50">COMPOUND GROWTH</span>
              </div>

              <MachineVisual progress={scrollYProgress} />
              
            </div>
          </div>
        </div>

        {/* MOBILE / TABLET LAYOUT (<1024px) */}
        {/* We stack text and simplified visual components naturally so nothing overlaps */}
        <div className="lg:hidden py-24 flex flex-col gap-24">
          {/* Mobile Header */}
          <div>
            <span className="text-sky-400/80 uppercase tracking-widest text-xs font-mono mb-4 block">
              {PROCESS_SECTION.eyebrow}
            </span>
            <h2 className="text-4xl sm:text-5xl font-light tracking-tight mb-6">
              Four steps to <span className="text-sky-200">compound growth</span>
            </h2>
            <p className="text-slate-400 text-base max-w-sm font-light">
              A clear, repeatable process designed to turn attention into long-term performance.
            </p>
          </div>

          {/* Mobile Steps */}
          <div className="flex flex-col gap-32 relative">
            {/* Faint connecting line behind mobile steps */}
            <div className="absolute left-6 top-10 bottom-10 w-[1px] bg-sky-900/30 z-0" />
            
            {PROCESS_SECTION.steps.map((step, index) => (
              <div key={step.number} className="relative z-10 flex flex-col gap-8">
                {/* Text Block */}
                <div className="flex flex-col gap-3 bg-[#01040a]/80 backdrop-blur-sm pr-4">
                  <div className="text-sky-400 font-mono tracking-widest text-sm">{step.number}</div>
                  <h3 className="text-3xl font-light text-white">{step.title}</h3>
                  <p className="text-slate-400 text-base font-light">{step.description}</p>
                </div>
                
                {/* Simplified Visual for Mobile (static or very subtle pulse) */}
                <div className="ml-4 pl-8 border-l border-sky-500/20 py-4">
                  {index === 0 && (
                    <div className="w-12 h-12 border border-sky-400/40 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-sky-300 rounded-full shadow-[0_0_8px_#38bdf8]" />
                    </div>
                  )}
                  {index === 1 && (
                    <div className="flex gap-2">
                      <div className="w-6 h-6 border border-sky-400/50 bg-[#081e3d] rounded-sm" />
                      <div className="w-8 h-6 border border-sky-300 bg-[#0a254d] rounded-sm shadow-[0_0_8px_#38bdf8]" />
                    </div>
                  )}
                  {index === 2 && (
                    <div className="flex items-end gap-1 h-8">
                      <div className="w-2 h-4 bg-sky-400/50" />
                      <div className="w-2 h-8 bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
                      <div className="w-2 h-6 bg-sky-400/50" />
                    </div>
                  )}
                  {index === 3 && (
                    <svg className="w-20 h-10" viewBox="0 0 100 50">
                      <path d="M 0 40 Q 40 40, 60 20 T 100 0" fill="none" stroke="#38bdf8" strokeWidth="2" className="drop-shadow-[0_0_6px_#38bdf8]" />
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}
