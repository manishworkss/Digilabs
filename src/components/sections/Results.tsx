"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { RESULTS_SECTION } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Sparkles } from "lucide-react";

// ============================================================
// RESULTS / PROOF — CINEMATIC PERFORMANCE SIGNAL EXPERIENCE
// ============================================================

export function Results() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-12%" });
  const prefersReduced = useReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Staggered reveal timing configuration
  const lineDuration = 1.4;
  const metricsDelay = [0.4, 0.8, 1.2];

  return (
    <section
      ref={sectionRef}
      id="results"
      className="relative w-full bg-[#01040a] py-24 sm:py-32 md:py-36 overflow-hidden border-t border-sky-400/10"
    >
      {/* ============================================================
          CINEMATIC ATMOSPHERE: LOCALIZED SKY-BLUE ISLANDS & FAINT GRID
          ============================================================ */}
      
      {/* Background radial ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-sky-500/[0.04] rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Ultra-subtle Technical Coordinate Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]">
        <svg className="w-full h-full" width="100%" height="100%">
          <defs>
            <pattern id="results-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(56,189,248,0.25)" strokeWidth="0.75" strokeDasharray="2 4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#results-grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        
        {/* ============================================================
            SECTION HEADER & MICRO-LABEL
            ============================================================ */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-6">
          <div className="max-w-2xl">
            <motion.p
              className="text-xs font-mono font-semibold tracking-[0.3em] text-sky-300 mb-3 uppercase flex items-center gap-2"
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.6, ease: "easeOut" as any }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sky-300 shadow-[0_0_8px_#38bdf8]" />
              {RESULTS_SECTION.eyebrow}
            </motion.p>
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" as any }}
            >
              {RESULTS_SECTION.heading}
            </motion.h2>
          </div>

          {/* Optional Micro-Label: Performance Signal */}
          <motion.div
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-950/40 border border-sky-400/20 backdrop-blur-md self-start md:self-end"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Sparkles className="w-3 h-3 text-sky-300" />
            <span className="text-[9px] font-mono tracking-[0.2em] text-sky-200/60 uppercase">
              PERFORMANCE SIGNAL — DEMO DATA
            </span>
          </motion.div>
        </div>

        {/* ============================================================
            DESKTOP VISUALIZATION: CURVED PERFORMANCE SIGNAL (>= 1024px)
            ============================================================ */}
        <div className="hidden lg:block relative w-full h-[460px] my-6">
          
          {/* Subtle horizontal reference baselines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-25">
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-sky-400/30 to-transparent" />
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-sky-400/20 to-transparent" />
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-sky-400/30 to-transparent" />
          </div>

          {/* SVG Performance Signal Spline */}
          <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 1100 460" fill="none">
            <defs>
              <linearGradient id="results-line-grad" x1="50" y1="280" x2="1050" y2="150" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                <stop offset="45%" stopColor="#7dd3fc" stopOpacity="1" />
                <stop offset="75%" stopColor="#38bdf8" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.6" />
              </linearGradient>

              {/* Node halo radial gradient */}
              <radialGradient id="node-aura" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Ambient wide glow along line */}
            <motion.path
              d="M 50 280 C 130 260, 180 230, 240 220 C 360 200, 460 100, 580 85 C 680 75, 780 280, 890 295 C 960 305, 1020 290, 1070 270"
              stroke="#38bdf8"
              strokeWidth="14"
              strokeLinecap="round"
              className="blur-xl opacity-35"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: lineDuration, ease: [0.22, 1, 0.36, 1] as any }}
            />

            {/* Core electric performance signal line */}
            <motion.path
              d="M 50 280 C 130 260, 180 230, 240 220 C 360 200, 460 100, 580 85 C 680 75, 780 280, 890 295 C 960 305, 1020 290, 1070 270"
              stroke="url(#results-line-grad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: lineDuration, ease: [0.22, 1, 0.36, 1] as any }}
            />

            {/* Inner crisp laser filament */}
            <motion.path
              d="M 50 280 C 130 260, 180 230, 240 220 C 360 200, 460 100, 580 85 C 680 75, 780 280, 890 295 C 960 305, 1020 290, 1070 270"
              stroke="#ffffff"
              strokeWidth="1.2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: lineDuration, ease: [0.22, 1, 0.36, 1] as any }}
            />

            {/* ==========================================
                NODE 1: At (240, 220) -> 4.2x ROAS
                ========================================== */}
            <g transform="translate(240, 220)">
              <circle cx="0" cy="0" r="20" fill="url(#node-aura)" className="blur-[2px]" />
              <circle cx="0" cy="0" r="7" stroke="#38bdf8" strokeWidth="1.5" fill="#041226" />
              <circle cx="0" cy="0" r="3" fill="#ffffff" />
              {/* Vertical connector tick to metric panel */}
              <line x1="0" y1="12" x2="0" y2="40" stroke="rgba(56,189,248,0.4)" strokeWidth="1" strokeDasharray="2 3" />
            </g>

            {/* ==========================================
                NODE 2: At (580, 85) -> +68% Leads
                ========================================== */}
            <g transform="translate(580, 85)">
              <circle cx="0" cy="0" r="24" fill="url(#node-aura)" className="blur-[3px]" />
              <circle cx="0" cy="0" r="8" stroke="#38bdf8" strokeWidth="2" fill="#041226" />
              <circle cx="0" cy="0" r="3.5" fill="#ffffff" />
              {/* Vertical connector tick to metric panel */}
              <line x1="0" y1="14" x2="0" y2="45" stroke="rgba(56,189,248,0.5)" strokeWidth="1" strokeDasharray="2 3" />
            </g>

            {/* ==========================================
                NODE 3: At (890, 295) -> -34% CPL
                ========================================== */}
            <g transform="translate(890, 295)">
              <circle cx="0" cy="0" r="20" fill="url(#node-aura)" className="blur-[2px]" />
              <circle cx="0" cy="0" r="7" stroke="#38bdf8" strokeWidth="1.5" fill="#041226" />
              <circle cx="0" cy="0" r="3" fill="#ffffff" />
              {/* Vertical connector tick to metric panel */}
              <line x1="0" y1="-12" x2="0" y2="-40" stroke="rgba(56,189,248,0.4)" strokeWidth="1" strokeDasharray="2 3" />
            </g>
          </svg>

          {/* ============================================================
              METRIC 1 PANEL: 4.2x (Placed below Node 1 at x: ~22%, y: ~58%)
              ============================================================ */}
          <motion.div
            className="absolute left-[14%] top-[56%] z-20 cursor-pointer group"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: metricsDelay[0], ease: "easeOut" as any }}
            onMouseEnter={() => setHoveredIndex(0)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Localized island glow */}
            <div className={`absolute -inset-6 rounded-3xl bg-sky-500/10 blur-2xl pointer-events-none transition-opacity duration-500 ${hoveredIndex === 0 ? "opacity-100 scale-110" : "opacity-40"}`} />
            
            <div className="relative px-6 py-5 rounded-2xl bg-[#06142a]/80 border border-sky-400/30 backdrop-blur-xl transition-all duration-300 group-hover:border-sky-300/60 group-hover:bg-[#081e3d]/90 shadow-[0_10px_35px_rgba(0,0,0,0.7)]">
              <p className="text-5xl xl:text-6xl font-bold tracking-tight text-white group-hover:text-sky-100 transition-colors drop-shadow-[0_0_20px_rgba(56,189,248,0.3)]">
                {RESULTS_SECTION.metrics[0].value}
              </p>
              <div className="w-8 h-[1.5px] bg-sky-400/50 my-2.5 transition-all duration-300 group-hover:w-16 group-hover:bg-sky-300" />
              <p className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">
                {RESULTS_SECTION.metrics[0].label}
              </p>
            </div>
          </motion.div>

          {/* ============================================================
              METRIC 2 PANEL: +68% (Placed below Node 2 at x: ~48%, y: ~30%)
              ============================================================ */}
          <motion.div
            className="absolute left-[45%] top-[28%] z-20 cursor-pointer group"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: metricsDelay[1], ease: "easeOut" as any }}
            onMouseEnter={() => setHoveredIndex(1)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Localized island glow */}
            <div className={`absolute -inset-8 rounded-3xl bg-sky-500/15 blur-2xl pointer-events-none transition-opacity duration-500 ${hoveredIndex === 1 ? "opacity-100 scale-110" : "opacity-50"}`} />
            
            <div className="relative px-7 py-6 rounded-2xl bg-[#071936]/90 border border-sky-300/60 backdrop-blur-xl transition-all duration-300 group-hover:border-sky-200 group-hover:bg-[#0b254d] shadow-[0_12px_45px_rgba(0,0,0,0.8),0_0_30px_rgba(56,189,248,0.25)]">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-300 shadow-[0_0_6px_#38bdf8]" />
                <span className="text-[9px] font-mono font-bold tracking-widest text-sky-200">MAX LIFT</span>
              </div>
              <p className="text-6xl xl:text-7xl font-bold tracking-tight text-white group-hover:text-sky-100 transition-colors drop-shadow-[0_0_25px_rgba(56,189,248,0.4)]">
                {RESULTS_SECTION.metrics[1].value}
              </p>
              <div className="w-10 h-[2px] bg-sky-400/60 my-2.5 transition-all duration-300 group-hover:w-20 group-hover:bg-sky-200" />
              <p className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">
                {RESULTS_SECTION.metrics[1].label}
              </p>
            </div>
          </motion.div>

          {/* ============================================================
              METRIC 3 PANEL: -34% (Placed above Node 3 at x: ~75%, y: ~15%)
              ============================================================ */}
          <motion.div
            className="absolute left-[73%] top-[12%] z-20 cursor-pointer group"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.8, delay: metricsDelay[2], ease: "easeOut" as any }}
            onMouseEnter={() => setHoveredIndex(2)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Localized island glow */}
            <div className={`absolute -inset-6 rounded-3xl bg-sky-500/10 blur-2xl pointer-events-none transition-opacity duration-500 ${hoveredIndex === 2 ? "opacity-100 scale-110" : "opacity-40"}`} />
            
            <div className="relative px-6 py-5 rounded-2xl bg-[#06142a]/80 border border-sky-400/30 backdrop-blur-xl transition-all duration-300 group-hover:border-sky-300/60 group-hover:bg-[#081e3d]/90 shadow-[0_10px_35px_rgba(0,0,0,0.7)]">
              <p className="text-5xl xl:text-6xl font-bold tracking-tight text-white group-hover:text-sky-100 transition-colors drop-shadow-[0_0_20px_rgba(56,189,248,0.3)]">
                {RESULTS_SECTION.metrics[2].value}
              </p>
              <div className="w-8 h-[1.5px] bg-sky-400/50 my-2.5 transition-all duration-300 group-hover:w-16 group-hover:bg-sky-300" />
              <p className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">
                {RESULTS_SECTION.metrics[2].label}
              </p>
            </div>
          </motion.div>

        </div>

        {/* ============================================================
            MOBILE & TABLET VIEWPORT (< 1024px): VERTICAL SIGNAL JOURNEY
            ============================================================ */}
        <div className="lg:hidden relative my-10 pl-8 sm:pl-10">
          
          {/* Vertical Connecting Line */}
          <div className="absolute left-3.5 sm:left-4 top-4 bottom-4 w-[2px] bg-gradient-to-b from-sky-400/20 via-sky-400 to-sky-400/20 pointer-events-none" />

          <div className="space-y-8 sm:space-y-10">
            {RESULTS_SECTION.metrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                className="relative flex items-start gap-4"
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.2, ease: "easeOut" as any }}
              >
                {/* Node beacon on vertical track */}
                <div className="absolute -left-[30px] sm:-left-[32px] top-4 w-5 h-5 rounded-full bg-[#041226] border-2 border-sky-400 flex items-center justify-center shadow-[0_0_12px_#38bdf8] z-10">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>

                {/* Floating Metric Card */}
                <div className="w-full p-6 sm:p-7 rounded-2xl bg-[#06142a]/85 border border-sky-400/30 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
                  <p className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-2">
                    {metric.value}
                  </p>
                  <div className="w-8 h-[1px] bg-sky-400/40 mb-2" />
                  <p className="text-xs sm:text-sm font-medium text-slate-300">
                    {metric.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* ============================================================
            DISCLAIMER: CLEAR, ACCESSIBLE, AND SUBTLE
            ============================================================ */}
        <motion.div
          className="mt-12 md:mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: prefersReduced ? 0 : 1.4 }}
        >
          <p className="text-xs sm:text-sm font-mono text-slate-400 tracking-wider">
            {RESULTS_SECTION.disclaimer}
          </p>
        </motion.div>

      </div>
    </section>
  );
}
