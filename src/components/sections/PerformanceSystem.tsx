"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SYSTEM_SECTION } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

// ============================================================
// MODULE 01: STRATEGY VISUAL — HIGH CONTRAST ICE-BLUE ORB & ORBITS
// Concept: DATA → FOCUS → OPPORTUNITY
// Micro-motion: Orbiting elements dynamically driven by scroll progress
// ============================================================
function StrategyVisual({
  isActive,
  isHovered,
  scrollProgress,
}: {
  isActive: boolean;
  isHovered: boolean;
  scrollProgress?: MotionValue<number>;
}) {
  const prefersReduced = useReducedMotion();

  // Scroll-linked rotation for orbital system
  const orbitRotation = useTransform(
    scrollProgress || new MotionValue(0),
    [0, 1],
    [0, 180]
  );

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden">
      {/* Localized illumination around orb */}
      <div 
        className={`absolute w-48 h-48 rounded-full bg-sky-500/25 blur-3xl transition-all duration-700 pointer-events-none ${
          isActive || isHovered ? "scale-125 opacity-100" : "scale-100 opacity-70"
        }`} 
      />

      {/* Floating Pill: Audience (Top Left) */}
      <motion.div 
        className="absolute top-2 left-2 z-20 px-3 py-1 rounded-full bg-[#081e3d]/95 border border-sky-400/60 backdrop-blur-md shadow-[0_0_16px_rgba(56,189,248,0.35)] flex items-center gap-1.5"
        animate={!prefersReduced ? { y: [0, -3, 0] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-sky-300 shadow-[0_0_8px_#38bdf8]" />
        <span className="text-[11px] font-semibold text-sky-100 tracking-wide">Audience</span>
      </motion.div>

      {/* Floating Pill: Channels (Middle Right) */}
      <motion.div 
        className="absolute top-10 right-1 z-20 px-3 py-1 rounded-full bg-[#081e3d]/95 border border-sky-400/60 backdrop-blur-md shadow-[0_0_16px_rgba(56,189,248,0.35)] flex items-center gap-1.5"
        animate={!prefersReduced ? { y: [0, 4, 0] } : {}}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-sky-300 shadow-[0_0_8px_#38bdf8]" />
        <span className="text-[11px] font-semibold text-sky-100 tracking-wide">Channels</span>
      </motion.div>

      {/* Floating Pill: Data (Bottom Left) */}
      <motion.div 
        className="absolute bottom-6 left-3 z-20 px-3 py-1 rounded-full bg-[#081e3d]/95 border border-sky-400/60 backdrop-blur-md shadow-[0_0_16px_rgba(56,189,248,0.35)] flex items-center gap-1.5"
        animate={!prefersReduced ? { y: [0, -3, 0] } : {}}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-sky-300 shadow-[0_0_8px_#38bdf8]" />
        <span className="text-[11px] font-semibold text-sky-100 tracking-wide">Data</span>
      </motion.div>

      {/* Floating Pill: Opportunity (Bottom Right) */}
      <motion.div 
        className="absolute bottom-2 right-4 z-20 px-3 py-1 rounded-full bg-[#081e3d]/95 border border-sky-400/60 backdrop-blur-md shadow-[0_0_16px_rgba(56,189,248,0.35)] flex items-center gap-1.5"
        animate={!prefersReduced ? { y: [0, 3, 0] } : {}}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-sky-300 shadow-[0_0_8px_#38bdf8]" />
        <span className="text-[11px] font-semibold text-sky-100 tracking-wide">Opportunity</span>
      </motion.div>

      {/* SVG Canvas for High-Contrast Sphere and Orbits */}
      <svg
        className="w-full h-full max-h-[230px] max-w-[290px]"
        viewBox="0 0 280 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Luminous 3D Sphere Lighting with crisp specular highlight */}
          <radialGradient id="sphere-lighting" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="22%" stopColor="#bae6fd" />
            <stop offset="50%" stopColor="#0284c7" />
            <stop offset="80%" stopColor="#032b56" />
            <stop offset="100%" stopColor="#010e1f" />
          </radialGradient>

          {/* Luminous Atmosphere Glow */}
          <radialGradient id="sphere-halo" cx="50%" cy="50%" r="50%">
            <stop offset="55%" stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="85%" stopColor="#0284c7" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer Orbit 1: Higher contrast */}
        <ellipse
          cx="140"
          cy="110"
          rx="108"
          ry="46"
          stroke="rgba(56,189,248,0.45)"
          strokeWidth="1.2"
          strokeDasharray="4 6"
          transform="rotate(-18 140 110)"
        />

        {/* Outer Orbit 2: Clean ice-white/blue contrast */}
        <ellipse
          cx="140"
          cy="110"
          rx="84"
          ry="34"
          stroke="rgba(186,230,253,0.4)"
          strokeWidth="1.2"
          transform="rotate(24 140 110)"
        />

        {/* Orbit Signal Nodes (Scroll-linked + Idle Rotation) */}
        <motion.g
          style={prefersReduced ? { transformOrigin: "140px 110px" } : { transformOrigin: "140px 110px", rotate: orbitRotation }}
        >
          {/* Node 1 */}
          <circle cx="230" cy="100" r="4" fill="#ffffff" filter="drop-shadow(0 0 8px #38bdf8)" />
          <circle cx="230" cy="100" r="1.5" fill="#38bdf8" />
          {/* Node 2 */}
          <circle cx="50" cy="120" r="3.5" fill="#bae6fd" filter="drop-shadow(0 0 6px #38bdf8)" />
          {/* Node 3 */}
          <circle cx="140" cy="65" r="2.5" fill="#7dd3fc" filter="drop-shadow(0 0 6px #38bdf8)" />
        </motion.g>

        {/* Central Luminous Sphere Halo */}
        <circle cx="140" cy="110" r="46" fill="url(#sphere-halo)" className="blur-[3px]" />

        {/* 3D Glass Sphere with crisp rim stroke */}
        <circle
          cx="140"
          cy="110"
          r="30"
          fill="url(#sphere-lighting)"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="1"
          className="shadow-[0_0_35px_rgba(56,189,248,0.9)]"
        />

        {/* Specular White Highlight Crescent on Sphere */}
        <path
          d="M 122 93 Q 134 88 148 93 Q 138 97 122 93 Z"
          fill="#ffffff"
          opacity="0.9"
          className="blur-[0.5px]"
        />
        <circle cx="132" cy="100" r="3" fill="#ffffff" opacity="0.8" className="blur-[1px]" />
      </svg>
    </div>
  );
}

// ============================================================
// MODULE 02: CREATIVE VISUAL — HIGH-CONTRAST 3D GLASS PANELS
// Micro-motion: Layers shift in depth with scroll progress
// ============================================================
function CreativeVisual({
  isActive,
  isHovered,
  scrollProgress,
}: {
  isActive: boolean;
  isHovered: boolean;
  scrollProgress?: MotionValue<number>;
}) {
  const prefersReduced = useReducedMotion();

  // Scroll-linked depth expansion
  const layer0Offset = useTransform(
    scrollProgress || new MotionValue(0),
    [0, 1],
    [-45, -60]
  );
  const layer2Z = useTransform(
    scrollProgress || new MotionValue(0),
    [0, 0.5, 1],
    [10, 30, 20]
  );

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden">
      {/* Localized background illumination */}
      <div 
        className={`absolute w-48 h-48 rounded-full bg-sky-500/25 blur-3xl transition-all duration-700 pointer-events-none ${
          isActive || isHovered ? "scale-125 opacity-100" : "scale-100 opacity-70"
        }`} 
      />

      <div 
        className="relative w-[265px] h-[185px] flex items-center justify-center"
        style={{ perspective: "850px" }}
      >
        {/* Layer 0: Deep background wireframe card */}
        <motion.div
          className="absolute w-[125px] h-[142px] rounded-2xl border border-sky-400/35 bg-[#06142a]/70 backdrop-blur-md p-2.5 shadow-2xl pointer-events-none opacity-60"
          style={prefersReduced ? {
            transform: "rotateY(-24deg) rotateX(8deg) translateZ(-40px) translateX(-55px)",
          } : {
            transform: "rotateY(-24deg) rotateX(8deg) translateZ(-40px)",
            translateX: layer0Offset,
          }}
        >
          <div className="w-8 h-1 rounded bg-sky-400/40 mb-2" />
          <div className="w-full h-16 rounded-lg bg-sky-400/10 border border-sky-400/20 mb-2" />
          <div className="space-y-1">
            <div className="w-full h-1 bg-white/20 rounded" />
            <div className="w-3/4 h-1 bg-white/15 rounded" />
          </div>
        </motion.div>

        {/* Layer 1: Middle Card */}
        <motion.div
          className="absolute w-[135px] h-[152px] rounded-2xl border border-sky-400/50 bg-[#081e3d]/80 backdrop-blur-lg p-2.5 shadow-2xl pointer-events-none opacity-80"
          style={{
            transform: "rotateY(-24deg) rotateX(8deg) translateZ(-15px) translateX(-30px)",
          }}
          animate={!prefersReduced && isHovered ? { translateX: -35 } : { translateX: -30 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-1.5 rounded-full bg-sky-300/60" />
            <div className="w-2 h-2 rounded-full bg-sky-300 shadow-[0_0_6px_#38bdf8]" />
          </div>
          <div className="w-full h-20 rounded-xl bg-sky-950/60 border border-sky-400/30 mb-2 flex items-center justify-center">
            <div className="w-7 h-7 rounded-full border border-sky-400/40 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-sky-300/70" />
            </div>
          </div>
          <div className="w-1/2 h-1.5 bg-white/30 rounded" />
        </motion.div>

        {/* Layer 2: Main Featured Card (HOOK - Brightest, Core Focus) */}
        <motion.div
          className="absolute w-[145px] h-[168px] rounded-2xl border-2 border-sky-300/90 bg-[#0d284f]/95 backdrop-blur-2xl p-3 shadow-[0_16px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(56,189,248,0.4)] z-20"
          style={prefersReduced ? {
            transform: "rotateY(-20deg) rotateX(6deg) translateZ(20px) translateX(0px)",
          } : {
            transform: "rotateY(-20deg) rotateX(6deg) translateX(0px)",
            translateZ: layer2Z,
          }}
        >
          {/* Specular bright top sheen */}
          <div className="absolute top-0 left-2 right-2 h-[1.5px] bg-gradient-to-r from-transparent via-sky-100 to-transparent" />

          {/* Header pill inside card: HOOK */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] font-bold tracking-widest text-sky-100 font-mono drop-shadow-[0_0_6px_rgba(56,189,248,0.6)]">HOOK</span>
            <div className="w-2 h-2 rounded-full bg-sky-200 shadow-[0_0_8px_#ffffff]" />
          </div>

          {/* Media composition graphic: Mountain/Artwork wireframe */}
          <div className="w-full h-[78px] rounded-xl bg-gradient-to-b from-sky-900/60 to-sky-950/90 border border-sky-400/40 p-2 flex flex-col justify-between overflow-hidden relative mb-2 shadow-inner">
            <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_10px_#ffffff] self-end mr-1" />
            <svg className="w-full h-9 absolute bottom-0 left-0 right-0" viewBox="0 0 120 30" fill="none">
              <polygon points="0,30 25,10 50,30" fill="rgba(56,189,248,0.5)" />
              <polygon points="35,30 65,4 95,30" fill="rgba(186,230,253,0.8)" />
              <polygon points="80,30 105,14 120,30" fill="rgba(56,189,248,0.4)" />
            </svg>
          </div>

          <div className="space-y-1.5">
            <div className="w-full h-1.5 rounded bg-sky-100/70" />
            <div className="w-2/3 h-1.5 rounded bg-sky-200/50" />
          </div>
        </motion.div>

        {/* Layer 3: Convert Front Card */}
        <motion.div
          className="absolute w-[128px] h-[148px] rounded-2xl border border-sky-300/70 bg-[#092244]/90 backdrop-blur-xl p-2.5 shadow-[0_10px_35px_rgba(0,0,0,0.75),0_0_25px_rgba(56,189,248,0.25)] z-30"
          style={{
            transform: "rotateY(-18deg) rotateX(6deg) translateZ(45px) translateX(46px)",
          }}
          animate={!prefersReduced && isHovered ? { translateX: 56, y: 3 } : { translateX: 46, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[8px] font-bold tracking-widest text-sky-100 font-mono">CONVERT</span>
            <div className="w-1.5 h-1.5 rounded-full bg-sky-200 shadow-[0_0_6px_#38bdf8]" />
          </div>

          <div className="w-full h-16 rounded-xl bg-sky-950/70 border border-sky-400/30 p-2 flex items-end justify-between gap-1.5 mb-2">
            <div className="w-3.5 h-5 rounded-sm bg-sky-500/60" />
            <div className="w-3.5 h-8 rounded-sm bg-sky-400/80" />
            <div className="w-3.5 h-12 rounded-sm bg-sky-200 shadow-[0_0_10px_#38bdf8]" />
          </div>

          <div className="w-3/4 h-1.5 rounded bg-sky-100/60" />
        </motion.div>
      </div>
    </div>
  );
}

// ============================================================
// MODULE 03: OPTIMIZATION VISUAL — HIGH-VISIBILITY PERFORMANCE GRAPH
// Micro-motion: Compounding curve draw linked to scroll progress
// ============================================================
function OptimizationVisual({
  isActive,
  isHovered,
  scrollProgress,
}: {
  isActive: boolean;
  isHovered: boolean;
  scrollProgress?: MotionValue<number>;
}) {
  const prefersReduced = useReducedMotion();

  // Scroll-linked line draw progress
  const graphDraw = useTransform(
    scrollProgress || new MotionValue(1),
    [0.3, 0.85],
    [0.15, 1]
  );

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden">
      {/* Localized background illumination */}
      <div 
        className={`absolute w-48 h-48 rounded-full bg-sky-500/25 blur-3xl transition-all duration-700 pointer-events-none ${
          isActive || isHovered ? "scale-125 opacity-100" : "scale-100 opacity-70"
        }`} 
      />

      {/* Milestone Pill: Test */}
      <div className="absolute bottom-6 left-5 z-20 px-2.5 py-0.5 rounded-full bg-[#081e3d]/95 border border-sky-400/60 backdrop-blur-md shadow-[0_0_12px_rgba(56,189,248,0.3)]">
        <span className="text-[10px] font-semibold text-sky-100 tracking-wide">Test</span>
      </div>

      {/* Milestone Pill: Iterate */}
      <div className="absolute bottom-12 left-[43%] z-20 px-2.5 py-0.5 rounded-full bg-[#081e3d]/95 border border-sky-400/60 backdrop-blur-md shadow-[0_0_12px_rgba(56,189,248,0.3)]">
        <span className="text-[10px] font-semibold text-sky-100 tracking-wide">Iterate</span>
      </div>

      {/* Milestone Pill: Scale */}
      <div className="absolute top-14 right-[28%] z-20 px-2.5 py-0.5 rounded-full bg-[#081e3d]/95 border border-sky-400/60 backdrop-blur-md shadow-[0_0_12px_rgba(56,189,248,0.3)]">
        <span className="text-[10px] font-semibold text-sky-100 tracking-wide">Scale</span>
      </div>

      {/* Peak Highlight Pill: Higher ROI */}
      <motion.div 
        className="absolute top-3 right-3 z-20 px-3.5 py-1 rounded-full bg-sky-950/95 border-2 border-sky-300 shadow-[0_0_25px_rgba(56,189,248,0.65)] flex items-center gap-1.5"
        animate={!prefersReduced ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#ffffff]" />
        <span className="text-[11px] font-bold text-white tracking-wide">Higher ROI</span>
      </motion.div>

      {/* Performance Graph Canvas */}
      <svg
        className="w-full h-full max-h-[230px] max-w-[290px]"
        viewBox="0 0 280 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="opt-curve" x1="20" y1="180" x2="250" y2="45" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="60%" stopColor="#7dd3fc" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>

          <linearGradient id="opt-fill" x1="140" y1="40" x2="140" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.32" />
            <stop offset="60%" stopColor="#0284c7" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Visible Grid Coordinates */}
        <g stroke="rgba(56,189,248,0.2)" strokeWidth="1">
          <line x1="25" y1="60" x2="255" y2="60" strokeDasharray="4 4" />
          <line x1="25" y1="105" x2="255" y2="105" strokeDasharray="4 4" />
          <line x1="25" y1="150" x2="255" y2="150" strokeDasharray="4 4" />
          <line x1="25" y1="185" x2="255" y2="185" strokeWidth="1.5" stroke="rgba(56,189,248,0.4)" />
        </g>

        {/* Translucent vertical bars */}
        <rect x="50" y="160" width="9" height="25" rx="2" fill="rgba(56,189,248,0.25)" />
        <rect x="95" y="140" width="9" height="45" rx="2" fill="rgba(56,189,248,0.3)" />
        <rect x="145" y="110" width="9" height="75" rx="2" fill="rgba(56,189,248,0.35)" />
        <rect x="195" y="75" width="9" height="110" rx="2" fill="rgba(56,189,248,0.4)" />
        <rect x="235" y="45" width="9" height="140" rx="2" fill="rgba(56,189,248,0.45)" />

        {/* Area under curve */}
        <path
          d="M 25 185 L 25 178 Q 70 172, 110 152 T 180 102 T 240 50 L 240 185 Z"
          fill="url(#opt-fill)"
        />

        {/* Compounding Performance Curve with outer luminous blur */}
        <motion.path
          d="M 25 178 Q 70 172, 110 152 T 180 102 T 240 50"
          stroke="#0284c7"
          strokeWidth="7"
          strokeLinecap="round"
          className="blur-[5px] opacity-80"
          style={prefersReduced ? {} : { pathLength: graphDraw }}
        />
        <motion.path
          d="M 25 178 Q 70 172, 110 152 T 180 102 T 240 50"
          stroke="url(#opt-curve)"
          strokeWidth="3.5"
          strokeLinecap="round"
          style={prefersReduced ? {} : { pathLength: graphDraw }}
        />

        {/* Milestone Node 1 */}
        <circle cx="50" cy="175" r="4" fill="#ffffff" filter="drop-shadow(0 0 8px #38bdf8)" />
        <circle cx="50" cy="175" r="2" fill="#38bdf8" />

        {/* Milestone Node 2 */}
        <circle cx="130" cy="138" r="4.5" fill="#ffffff" filter="drop-shadow(0 0 8px #38bdf8)" />
        <circle cx="130" cy="138" r="2" fill="#38bdf8" />

        {/* Milestone Node 3 */}
        <circle cx="185" cy="98" r="5" fill="#ffffff" filter="drop-shadow(0 0 10px #38bdf8)" />
        <circle cx="185" cy="98" r="2.5" fill="#38bdf8" />

        {/* Terminal Peak Star Flare at (240, 50) */}
        <g transform="translate(240, 50)">
          <circle cx="0" cy="0" r="16" fill="#38bdf8" opacity="0.4" className="blur-[4px]" />
          <circle cx="0" cy="0" r="6" fill="#ffffff" filter="drop-shadow(0 0 10px #ffffff)" />
          <path
            d="M 0 -14 L 2.5 -2.5 L 14 0 L 2.5 2.5 L 0 14 L -2.5 2.5 L -14 0 L -2.5 -2.5 Z"
            fill="#ffffff"
            filter="drop-shadow(0 0 10px #7dd3fc)"
          />
        </g>
      </svg>
    </div>
  );
}

// ============================================================
// UNIFIED PERFORMANCE MODULE CARD — HIGH CONTRAST DARK GLASS
// ============================================================
function ModuleCard({
  card,
  index,
  isActive,
  scrollProgress,
}: {
  card: (typeof SYSTEM_SECTION.cards)[0];
  index: number;
  isActive: boolean;
  scrollProgress?: MotionValue<number>;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const labels = ["INSIGHT", "CREATE", "IMPROVE"];

  return (
    <div
      className={`group relative flex flex-col justify-between w-full h-[520px] sm:h-[540px] md:h-[560px] rounded-[32px] border transition-all duration-700 overflow-hidden ${
        isActive
          ? "border-sky-300/80 bg-[#071936]/95 shadow-[0_0_55px_rgba(56,189,248,0.3),inset_0_1px_1px_rgba(255,255,255,0.45),0_20px_50px_rgba(0,0,0,0.85)]"
          : "border-sky-400/25 bg-[#051124]/75 hover:border-sky-400/45 hover:bg-[#071936]/85 opacity-85 hover:opacity-100 shadow-[0_12px_40px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.2)]"
      } backdrop-blur-2xl`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Edge Specular Lighting */}
      <div className={`absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-sky-200/60 to-transparent transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-40"}`} />

      {/* Internal ambient corner glow */}
      <div 
        className={`absolute -top-16 -right-16 w-48 h-48 rounded-full bg-sky-500/20 blur-3xl pointer-events-none transition-opacity duration-700 ${
          isActive || isHovered ? "opacity-100" : "opacity-40"
        }`} 
      />

      {/* 1. Header: 01 —— INSIGHT */}
      <div className="relative z-10 flex items-center justify-between p-7 pb-2">
        <div className="flex items-center gap-2.5">
          <span className={`font-mono text-sm font-bold tracking-widest transition-colors duration-300 ${isActive ? "text-sky-300 drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]" : "text-white/60"}`}>
            {card.number}
          </span>
          <div className={`w-7 h-[1px] transition-colors duration-300 ${isActive ? "bg-sky-400/60" : "bg-sky-400/30"}`} />
        </div>
        <span className={`font-mono text-[10px] font-bold tracking-[0.25em] transition-colors duration-300 ${isActive ? "text-sky-200 drop-shadow-[0_0_6px_rgba(56,189,248,0.5)]" : "text-sky-200/50"}`}>
          {labels[index]}
        </span>
      </div>

      {/* 2. Visual Instrument Area */}
      <div className="relative z-10 w-full h-[220px] sm:h-[240px] px-4 flex items-center justify-center my-auto">
        {index === 0 && <StrategyVisual isActive={isActive} isHovered={isHovered} scrollProgress={scrollProgress} />}
        {index === 1 && <CreativeVisual isActive={isActive} isHovered={isHovered} scrollProgress={scrollProgress} />}
        {index === 2 && <OptimizationVisual isActive={isActive} isHovered={isHovered} scrollProgress={scrollProgress} />}
      </div>

      {/* 3. Text & Explore Action */}
      <div className="relative z-10 p-7 pt-2 flex flex-col justify-between">
        <div className="mb-6">
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {card.title}
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed font-normal">
            {card.description}
          </p>
        </div>

        {/* Explore Button with arrow and connecting line */}
        <div className="flex items-center justify-between pt-4 border-t border-sky-400/20">
          <span className="text-xs font-semibold text-sky-200 group-hover:text-white transition-colors">
            Explore
          </span>
          <div className="flex-1 mx-4 h-[1px] bg-gradient-to-r from-sky-400/40 to-sky-400/10" />
          <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
            isActive 
              ? "border-sky-300/60 bg-sky-900/60 text-white shadow-[0_0_15px_rgba(56,189,248,0.4)]" 
              : "border-sky-400/30 bg-sky-950/40 text-sky-300 group-hover:bg-sky-400 group-hover:text-black group-hover:shadow-[0_0_15px_#38bdf8]"
          }`}>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT: SCROLL-LINKED MACHINE ASSEMBLY SYSTEM
// ============================================================
export function PerformanceSystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const prefersReduced = useReducedMotion();

  // Track raw scroll through pinned container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring physics interpolation for organic machine assembly motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.0005,
  });

  // Active module focus state based on smooth scroll
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useEffect(() => {
    return smoothProgress.on("change", (latest) => {
      if (latest < 0.35) {
        setActiveCardIndex(0);
      } else if (latest < 0.70) {
        setActiveCardIndex(1);
      } else {
        setActiveCardIndex(2);
      }
    });
  }, [smoothProgress]);

  // ============================================================
  // DESKTOP TRANSFORMS: STAGES 1 TO 5 (ENTER → ALIGN → SCALE → CONNECT → ASSEMBLED)
  // ============================================================

  // Card 1 (Strategy): Dispersed to the left & rotated slightly inward, glides smoothly to center alignment
  const card1X = useTransform(smoothProgress, [0, 0.45, 0.85], ["-80px", "-25px", "0px"]);
  const card1Y = useTransform(smoothProgress, [0, 0.45, 0.85], ["30px", "10px", "0px"]);
  const card1Scale = useTransform(smoothProgress, [0, 0.35, 0.75, 1], [0.88, 1.05, 0.98, 1.0]);
  const card1RotateY = useTransform(smoothProgress, [0, 0.5, 0.85], [3.5, 1.5, 0]);
  const card1Opacity = useTransform(smoothProgress, [0, 0.25], [0.65, 1]);

  // Card 2 (Creative): Central anchor, starts slightly back/lower, locks into elevation and scales up
  const card2Y = useTransform(smoothProgress, [0, 0.5, 0.85], ["50px", "15px", "0px"]);
  const card2Scale = useTransform(smoothProgress, [0, 0.45, 0.75, 1], [0.90, 1.02, 1.06, 1.02]);
  const card2RotateX = useTransform(smoothProgress, [0, 0.5, 0.85], [3, 1, 0]);
  const card2Opacity = useTransform(smoothProgress, [0, 0.25], [0.7, 1]);

  // Card 3 (Optimization): Dispersed to the right & rotated inward, glides smoothly to center alignment
  const card3X = useTransform(smoothProgress, [0, 0.45, 0.85], ["80px", "25px", "0px"]);
  const card3Y = useTransform(smoothProgress, [0, 0.45, 0.85], ["30px", "10px", "0px"]);
  const card3Scale = useTransform(smoothProgress, [0, 0.5, 0.85, 1], [0.88, 0.98, 1.05, 1.0]);
  const card3RotateY = useTransform(smoothProgress, [0, 0.5, 0.85], [-3.5, -1.5, 0]);
  const card3Opacity = useTransform(smoothProgress, [0, 0.25], [0.65, 1]);

  // Stage 4 & 5: Connecting Energy Stream draws continuously as systems align
  const beamLength = useTransform(smoothProgress, [0.25, 0.85], [0.05, 1]);
  const beamGlowOpacity = useTransform(smoothProgress, [0.25, 0.5, 0.85], [0.2, 0.6, 0.9]);

  // Downward energy stream transition toward Results section at end (progress > 0.85)
  const transitionLightOpacity = useTransform(smoothProgress, [0.85, 1], [0, 0.7]);
  const transitionLightY = useTransform(smoothProgress, [0.85, 1], [-20, 15]);

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-[#01040a]" id="system">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between items-center overflow-hidden py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
        
        {/* ============================================================
            CINEMATIC ENVIRONMENT: EARTH HORIZON + LIGHT RAYS + STARS
            ============================================================ */}
        
        {/* Deep cosmic sky lighting */}
        <div className="absolute inset-0 bg-radial-at-t from-[#091a38] via-[#020713] to-[#010307] pointer-events-none z-0" />

        {/* Diagonal cinematic sky-blue light streaks */}
        <div className="absolute inset-0 pointer-events-none opacity-45 mix-blend-screen z-0 overflow-hidden">
          <div className="absolute top-[20%] -left-20 w-[900px] h-[2px] bg-gradient-to-r from-transparent via-sky-300 to-transparent rotate-[28deg] blur-[1px]" />
          <div className="absolute top-[22%] -left-10 w-[1100px] h-[40px] bg-gradient-to-r from-transparent via-sky-500/20 to-transparent rotate-[28deg] blur-3xl" />
          <div className="absolute top-[60%] -right-20 w-[800px] h-[2px] bg-gradient-to-r from-transparent via-sky-300/50 to-transparent -rotate-[22deg] blur-[1px]" />
        </div>

        {/* Luminous Earth Horizon Curved Atmosphere along the bottom */}
        <div className="absolute -bottom-[32vw] left-1/2 -translate-x-1/2 w-[160vw] h-[55vw] rounded-[100%] pointer-events-none overflow-hidden z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-sky-950/70 via-sky-700/30 to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-sky-300 to-transparent shadow-[0_0_80px_rgba(56,189,248,1),0_0_140px_rgba(56,189,248,0.7)]" />
          <div className="absolute top-0 left-1/4 right-1/4 h-[90px] bg-sky-400/35 blur-3xl" />
        </div>

        {/* Downward transition energy stream leading into Results section */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-gradient-to-t from-sky-400/40 via-sky-500/10 to-transparent blur-2xl pointer-events-none z-0"
          style={prefersReduced ? { opacity: 0 } : { opacity: transitionLightOpacity, y: transitionLightY }}
        />

        {/* ============================================================
            TOP ROW: HEADER & EDITORIAL ACCENTS
            ============================================================ */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex items-start justify-between pt-2 sm:pt-4">
          
          {/* Left Corner Accent: STRATEGY / CREATIVE / OPTIMIZATION */}
          <div className="hidden lg:block w-40">
            <p className="text-[9px] font-mono tracking-[0.25em] text-sky-200/50 leading-relaxed uppercase">
              STRATEGY<br />
              CREATIVE<br />
              OPTIMIZATION
            </p>
          </div>

          {/* Centered Main Section Heading */}
          <div className="text-center flex-1 max-w-2xl mx-auto">
            <p className="text-xs font-mono font-semibold tracking-[0.3em] text-sky-300 mb-2 uppercase drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]">
              {SYSTEM_SECTION.eyebrow}
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-tight">
              A unified approach to{" "}
              <span className="bg-gradient-to-r from-sky-300 via-sky-100 to-sky-300 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(56,189,248,0.8)]">
                paid media
              </span>
            </h2>
          </div>

          {/* Right Corner Accent: From Clicks to Compounding */}
          <div className="hidden lg:block w-40 text-right">
            <p className="font-serif italic text-sky-200 text-sm md:text-base leading-tight drop-shadow-[0_0_8px_rgba(56,189,248,0.4)]">
              From<br />
              Clicks to<br />
              Compounding
            </p>
          </div>
        </div>

        {/* ============================================================
            CENTER STAGE: 3-MODULE MACHINE ASSEMBLY IN PERSPECTIVE
            ============================================================ */}
        <div 
          className="relative z-10 w-full max-w-7xl mx-auto my-auto flex items-center justify-center"
          style={{ perspective: "1200px" }}
        >
          
          {/* Connecting Wavy Electric Light Stream (Draws and pulses with machine assembly) */}
          <div className="hidden lg:block absolute top-[48%] left-[6%] right-[6%] h-[90px] -translate-y-1/2 pointer-events-none z-20 overflow-visible">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 90" fill="none">
              {/* Wide ambient glow blur */}
              <motion.path
                d="M 50 45 Q 220 20, 380 50 T 700 40 T 950 45"
                stroke="#38bdf8"
                strokeWidth="24"
                strokeLinecap="round"
                className="blur-xl"
                style={prefersReduced ? { opacity: 0.6 } : { pathLength: beamLength, opacity: beamGlowOpacity }}
              />
              {/* Core electric laser stream */}
              <motion.path
                d="M 50 45 Q 220 20, 380 50 T 700 40 T 950 45"
                stroke="url(#connecting-beam)"
                strokeWidth="4.5"
                strokeLinecap="round"
                style={prefersReduced ? {} : { pathLength: beamLength }}
              />
              {/* Inner white laser filament */}
              <motion.path
                d="M 50 45 Q 220 20, 380 50 T 700 40 T 950 45"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
                style={prefersReduced ? {} : { pathLength: beamLength }}
              />
              <defs>
                <linearGradient id="connecting-beam" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="50%" stopColor="#bae6fd" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* DESKTOP VIEWPORT (>= 1024px): Scroll-driven Physical Machine Assembly */}
          <div className="hidden lg:grid grid-cols-3 gap-6 lg:gap-8 w-full items-center">
            {/* Module 01: Strategy (Inward convergence + scale + tilt) */}
            <motion.div
              style={prefersReduced ? {} : {
                x: card1X,
                y: card1Y,
                scale: card1Scale,
                rotateY: card1RotateY,
                opacity: card1Opacity,
              }}
              className="w-full"
            >
              <ModuleCard 
                card={SYSTEM_SECTION.cards[0] as any} 
                index={0} 
                isActive={activeCardIndex === 0} 
                scrollProgress={smoothProgress}
              />
            </motion.div>

            {/* Module 02: Creative (Central Anchor, lifts & elevates in depth) */}
            <motion.div
              style={prefersReduced ? {} : {
                y: card2Y,
                scale: card2Scale,
                rotateX: card2RotateX,
                opacity: card2Opacity,
              }}
              className="w-full z-10"
            >
              <ModuleCard 
                card={SYSTEM_SECTION.cards[1] as any} 
                index={1} 
                isActive={activeCardIndex === 1} 
                scrollProgress={smoothProgress}
              />
            </motion.div>

            {/* Module 03: Optimization (Inward convergence + scale + tilt) */}
            <motion.div
              style={prefersReduced ? {} : {
                x: card3X,
                y: card3Y,
                scale: card3Scale,
                rotateY: card3RotateY,
                opacity: card3Opacity,
              }}
              className="w-full"
            >
              <ModuleCard 
                card={SYSTEM_SECTION.cards[2] as any} 
                index={2} 
                isActive={activeCardIndex === 2} 
                scrollProgress={smoothProgress}
              />
            </motion.div>
          </div>

          {/* MOBILE / TABLET VIEWPORT (< 1024px): Simplified Scroll-Linked Slide & Focus */}
          <div className="lg:hidden relative w-full max-w-[420px] mx-auto h-[530px] flex items-center justify-center">
            {SYSTEM_SECTION.cards.map((card, i) => {
              const isCurrent = activeCardIndex === i;
              return (
                <div
                  key={card.title}
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    isCurrent 
                      ? "opacity-100 scale-100 pointer-events-auto z-20 translate-y-0" 
                      : i < activeCardIndex 
                      ? "opacity-0 scale-95 pointer-events-none z-10 -translate-y-8" 
                      : "opacity-0 scale-95 pointer-events-none z-10 translate-y-8"
                  }`}
                >
                  <ModuleCard 
                    card={card as any} 
                    index={i} 
                    isActive={true} 
                  />
                </div>
              );
            })}
          </div>

        </div>

        {/* ============================================================
            BOTTOM ROW: BRANDING BADGE & PAGINATION INDICATORS
            ============================================================ */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between pb-2">
          
          {/* Bottom Left: BUILT FOR WHAT'S NEXT */}
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-[10px] font-bold font-mono text-white">
              N
            </div>
            <span className="text-[9px] font-mono tracking-[0.2em] text-sky-200/70 uppercase">
              BUILT FOR WHAT&apos;S NEXT
            </span>
          </div>

          {/* Bottom Right: Pagination Dots and Active Index */}
          <div className="flex items-center gap-2 font-mono text-xs text-sky-200">
            <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeCardIndex === 0 ? "bg-sky-300 w-4 shadow-[0_0_10px_#38bdf8]" : "bg-white/30"}`} />
            <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeCardIndex === 1 ? "bg-sky-300 w-4 shadow-[0_0_10px_#38bdf8]" : "bg-white/30"}`} />
            <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeCardIndex === 2 ? "bg-sky-300 w-4 shadow-[0_0_10px_#38bdf8]" : "bg-white/30"}`} />
            <span className="ml-2 font-bold text-sky-100">0{activeCardIndex + 1}</span>
          </div>

        </div>

      </div>
    </div>
  );
}
