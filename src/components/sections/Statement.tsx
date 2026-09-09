"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { STATEMENT } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { BarChart3, Users, TrendingDown } from "lucide-react";

const INSIGHTS = [
  { icon: TrendingDown, label: "Higher Ad Spend", sub: "Diminishing returns" },
  { icon: Users, label: "More Traffic", sub: "Low intent visitors" },
  { icon: BarChart3, label: "Lower Growth", sub: "Stuck at a ceiling" }
];

export function Statement() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeHover, setActiveHover] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (prefersReduced || isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [prefersReduced, isMobile]);

  // Staggered reveal animations
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.8, ease: "easeOut" as any }
    })
  };

  const insightVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.6 + i * 0.15, duration: 0.6, ease: "easeOut" as any }
    })
  };

  // Panels staggered activation
  const panelVariants = {
    hidden: { opacity: 0, x: isMobile ? 0 : -20, y: isMobile ? -20 : 0 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      y: 0,
      transition: { delay: 1.0 + i * 0.2, duration: 1.2, ease: "easeOut" as any }
    })
  };

  // Data streams activate after panels
  const streamVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { delay: 1.8, duration: 2 } 
    }
  };

  // Final node activates after data reaches it
  const nodeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { delay: 2.8, duration: 1.5, ease: "easeOut" as any } 
    }
  };

  const mX = mousePosition.x;
  const mY = mousePosition.y;

  return (
    <section 
      ref={containerRef} 
      id="statement" 
      className="relative w-full min-h-screen py-24 md:py-32 overflow-hidden bg-[#020205] text-nova-white flex items-center"
    >
      {/* Cinematic Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-[100vh] opacity-20 blur-[120px] mix-blend-screen"
          style={{
            background: "radial-gradient(ellipse at top, rgba(29,78,216,0.3) 0%, transparent 60%)",
            x: prefersReduced ? "-50%" : `calc(-50% + ${mX * -5}px)`,
            y: prefersReduced ? 0 : mY * -5,
          }}
        />
        {/* Distant orbital curve for depth */}
        <div className="absolute inset-0 opacity-[0.1] mix-blend-screen">
          <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <path d="M -200,800 C 300,700 700,200 1200,0" fill="none" stroke="rgba(56,189,248,0.3)" strokeWidth="1" />
          </svg>
        </div>
      </div>

      <div className="max-w-[1440px] w-full mx-auto px-6 lg:px-12 relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-8">
        
        {/* SVG Connector Lines (Card -> Stage) */}
        {!isMobile && (
          <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block">
            <svg className="w-full h-full" viewBox="0 0 1000 800" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineGrad0" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(56,189,248,0)" />
                  <stop offset="50%" stopColor="rgba(56,189,248,1)" />
                  <stop offset="100%" stopColor="rgba(56,189,248,0)" />
                </linearGradient>
                <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(56,189,248,0)" />
                  <stop offset="50%" stopColor="rgba(56,189,248,1)" />
                  <stop offset="100%" stopColor="rgba(124,58,237,0)" />
                </linearGradient>
                <linearGradient id="lineGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(124,58,237,0)" />
                  <stop offset="50%" stopColor="rgba(168,85,247,1)" />
                  <stop offset="100%" stopColor="rgba(168,85,247,0)" />
                </linearGradient>
              </defs>
              
              {/* Higher Ad Spend -> Traffic */}
              <g className={`transition-opacity duration-700 ${activeHover === 0 ? "opacity-100" : "opacity-0"}`}>
                <path d="M 350,400 C 400,400 450,350 500,350" fill="none" stroke="rgba(56,189,248,0.2)" strokeWidth="1" />
                <path d="M 350,400 C 400,400 450,350 500,350" fill="none" stroke="url(#lineGrad0)" strokeWidth="1.5" strokeDasharray="100 800" className={prefersReduced ? "" : "animate-[dash-flow_3s_linear_infinite]"} />
              </g>

              {/* More Traffic -> Attention */}
              <g className={`transition-opacity duration-700 ${activeHover === 1 ? "opacity-100" : "opacity-0"}`}>
                <path d="M 350,500 C 450,500 550,450 700,450" fill="none" stroke="rgba(56,189,248,0.2)" strokeWidth="1" />
                <path d="M 350,500 C 450,500 550,450 700,450" fill="none" stroke="url(#lineGrad1)" strokeWidth="1.5" strokeDasharray="100 800" className={prefersReduced ? "" : "animate-[dash-flow_3s_linear_infinite]"} />
              </g>

              {/* Lower Growth -> Revenue */}
              <g className={`transition-opacity duration-700 ${activeHover === 2 ? "opacity-100" : "opacity-0"}`}>
                <path d="M 350,600 C 450,600 700,550 900,550" fill="none" stroke="rgba(124,58,237,0.2)" strokeWidth="1" />
                <path d="M 350,600 C 450,600 700,550 900,550" fill="none" stroke="url(#lineGrad2)" strokeWidth="1.5" strokeDasharray="100 800" className={prefersReduced ? "" : "animate-[dash-flow_3s_linear_infinite]"} />
              </g>
            </svg>
          </div>
        )}

        {/* LEFT SIDE: Copy & Insights (40%) */}
        <div className="w-full lg:w-[40%] flex flex-col justify-center gap-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            variants={textVariants}
            custom={0}
          >
            <p className="text-xs tracking-[0.2em] text-nova-muted uppercase font-medium mb-6 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-nova-muted/50" />
              {STATEMENT.eyebrow}
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]">
              {STATEMENT.heading}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                {STATEMENT.headingAccent}
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            variants={textVariants}
            custom={1}
          >
            <p className="text-lg text-nova-gray leading-relaxed max-w-md">
              {STATEMENT.body}
            </p>
          </motion.div>

          {/* Fixed Layout for Insights */}
          <div className="flex flex-col gap-4 mt-2">
            {INSIGHTS.map((insight, idx) => (
              <motion.div 
                key={idx} 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-20%" }}
                variants={insightVariants}
                custom={idx}
                onMouseEnter={() => setActiveHover(idx)}
                onMouseLeave={() => setActiveHover(null)}
                className={`flex items-center gap-4 p-4 rounded-xl border bg-white/[0.02] backdrop-blur-sm relative overflow-hidden group w-full max-w-md transition-all duration-500 cursor-default
                  ${activeHover === idx ? "border-blue-400/40 shadow-[0_0_20px_rgba(56,189,248,0.1)]" : "border-white/5"}
                  ${activeHover !== null && activeHover !== idx ? "opacity-50" : "opacity-100"}
                `}
              >
                <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent transition-opacity duration-500 ${activeHover === idx ? "opacity-100" : "opacity-0"}`} />
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-500 z-10
                  ${activeHover === idx ? "bg-blue-900/40 border-blue-400/60 text-blue-300 shadow-[0_0_15px_rgba(56,189,248,0.5)]" : "bg-blue-900/20 border-blue-400/20 text-blue-400"}
                `}>
                  <insight.icon className="w-5 h-5" />
                </div>
                <div className="z-10">
                  <h4 className="text-sm font-medium text-nova-white">{insight.label}</h4>
                  <p className="text-xs text-nova-gray mt-1">{insight.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE: Cinematic Visualization (60%) */}
        <div 
          className="w-full lg:w-[60%] relative flex flex-col lg:block items-center justify-center mt-8 lg:mt-0 lg:min-h-[700px]"
          style={{ perspective: "2000px" }}
        >
          
          <motion.div 
            className="w-full h-[600px] lg:h-full relative flex flex-col lg:flex-row items-center justify-center lg:justify-start"
            style={{
              rotateX: prefersReduced || isMobile ? 0 : mY * 5,
              rotateY: prefersReduced || isMobile ? 0 : mX * -5,
              transformStyle: "preserve-3d"
            }}
          >
            
            {/* DESKTOP SVG Data Streams */}
            <motion.div 
              className="hidden lg:block absolute inset-0 pointer-events-none"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-20%" }}
              variants={streamVariants}
              style={{ transform: "translateZ(-30px)" }}
            >
              <svg className="w-full h-full" viewBox="0 0 1000 700" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="streamDesktop" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(29,78,216,0)" />
                    <stop offset="30%" stopColor="rgba(56,189,248,0.5)" />
                    <stop offset="70%" stopColor="rgba(124,58,237,0.8)" />
                    <stop offset="100%" stopColor="rgba(56,189,248,0)" />
                  </linearGradient>
                  <filter id="streamGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <g filter="url(#streamGlow)">
                  {/* Clean Signal Path: Traffic -> Attention -> Revenue */}
                  {/* Base path (faint) */}
                  <path d="M 0,350 L 300,350 C 400,350 450,450 500,450 L 700,450 C 800,450 850,550 900,550 L 1000,550" fill="none" stroke="rgba(56,189,248,0.2)" strokeWidth="1" />
                  
                  {/* Animated Traveling Signal */}
                  <path d="M 0,350 L 300,350 C 400,350 450,450 500,450 L 700,450 C 800,450 850,550 900,550 L 1000,550" fill="none" stroke="url(#streamDesktop)" strokeWidth="2" className={prefersReduced ? "" : "animate-[dash-flow_6s_linear_infinite]"} strokeDasharray="150 1200" />
                  
                  {/* Micro Nodes Traffic ↔ Attention */}
                  <g transform="translate(425, 400)">
                    <circle cx="-20" cy="-10" r="1.5" fill="rgba(56,189,248,0.6)" />
                    <rect x="-3" y="-3" width="6" height="6" fill="none" stroke="rgba(56,189,248,0.8)" strokeWidth="1" transform="rotate(45)" />
                    <circle cx="20" cy="10" r="1.5" fill="rgba(56,189,248,0.6)" />
                  </g>

                  {/* Micro Nodes Attention ↔ Revenue */}
                  <g transform="translate(825, 500)">
                    <circle cx="-20" cy="-10" r="1.5" fill="rgba(124,58,237,0.6)" />
                    <rect x="-3" y="-3" width="6" height="6" fill="none" stroke="rgba(124,58,237,0.8)" strokeWidth="1" transform="rotate(45)" />
                    <circle cx="20" cy="10" r="1.5" fill="rgba(124,58,237,0.6)" />
                  </g>

                  {/* Sparse background horizontal lines for technical atmosphere */}
                  <path d="M 0,250 L 1000,250" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="4 8" />
                  <path d="M 0,450 L 1000,450" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="4 8" />
                  <path d="M 0,650 L 1000,650" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="4 8" />
                </g>
              </svg>
            </motion.div>

            {/* MOBILE SVG Data Streams */}
            <motion.div 
              className="lg:hidden absolute inset-0 pointer-events-none"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-20%" }}
              variants={streamVariants}
            >
              <svg className="w-full h-full" viewBox="0 0 400 800" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="streamMobile" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(29,78,216,0)" />
                    <stop offset="30%" stopColor="rgba(56,189,248,0.5)" />
                    <stop offset="70%" stopColor="rgba(124,58,237,0.8)" />
                    <stop offset="100%" stopColor="rgba(56,189,248,0)" />
                  </linearGradient>
                </defs>
                <g filter="url(#streamGlow)">
                  <path d="M 200,0 L 200,800" fill="none" stroke="rgba(56,189,248,0.15)" strokeWidth="1" />
                  <path d="M 200,0 L 200,800" fill="none" stroke="url(#streamMobile)" strokeWidth="2" className={prefersReduced ? "" : "animate-[dash-flow_6s_linear_infinite]"} strokeDasharray="150 800" />
                </g>
              </svg>
            </motion.div>

            {/* The 3 Glass Panels (Gates) */}
            <div className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-10 pointer-events-auto" style={{ transformStyle: "preserve-3d" }}>
              {['TRAFFIC', 'ATTENTION', 'REVENUE'].map((label, idx) => {
                const isActive = activeHover === idx;
                const baseGlow = idx === 0 ? "rgba(29,78,216,0.1)" : idx === 1 ? "rgba(56,189,248,0.15)" : "rgba(124,58,237,0.2)";
                const activeGlow = idx === 0 ? "rgba(56,189,248,0.3)" : idx === 1 ? "rgba(56,189,248,0.4)" : "rgba(124,58,237,0.5)";
                
                return (
                  <motion.div 
                    key={label}
                    className={`relative group flex flex-col items-center justify-center w-[200px] h-[60px] lg:w-[130px] lg:h-[450px] rounded-2xl border bg-[#020205]/40 backdrop-blur-md overflow-hidden transition-all duration-700
                      ${isActive ? "border-blue-400/50" : "border-blue-400/20"}
                    `}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-20%" }}
                    variants={panelVariants}
                    custom={idx}
                    style={{
                      transformStyle: "preserve-3d",
                      rotateY: isMobile ? 0 : 35,
                      x: isMobile ? 0 : idx * -20,
                      z: prefersReduced || isMobile ? 0 : -idx * 150,
                      boxShadow: `0 0 ${isActive ? '40px' : '20px'} ${isActive ? activeGlow : baseGlow}`
                    }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-b transition-opacity duration-700
                      ${idx === 0 ? "from-blue-500/15" : idx === 1 ? "from-sky-400/15" : "from-purple-500/20"}
                      ${isActive ? "opacity-100 to-transparent" : "opacity-0 to-transparent"}
                    `} />
                    
                    {/* Internal System Activity */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
                      
                      {/* Traffic (INPUT) */}
                      {idx === 0 && (
                        <div className={`flex flex-col items-center transition-all duration-700 ${isActive ? "opacity-100" : "opacity-40"}`}>
                          <svg width="40" height="20" viewBox="0 0 40 20" fill="none" className="mb-2">
                            <path d="M0,10 C10,10 15,0 20,10 C25,20 30,10 40,10" stroke="rgba(56,189,248,0.6)" strokeWidth="1" className={prefersReduced ? "" : "animate-[dash-flow_3s_linear_infinite]"} strokeDasharray="10 20" />
                          </svg>
                          <span className="text-[7px] tracking-[0.2em] text-blue-400/80">DATA IN</span>
                          {/* 3 tiny dots */}
                          {!prefersReduced && [...Array(3)].map((_, i) => (
                            <motion.div key={i} className="absolute w-0.5 h-0.5 bg-blue-300 rounded-full"
                              initial={{ y: -50, opacity: 0 }}
                              animate={{ y: 50, opacity: [0, 1, 0] }}
                              transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
                            />
                          ))}
                        </div>
                      )}

                      {/* Attention (PROCESS) */}
                      {idx === 1 && (
                        <div className={`flex flex-col items-center transition-all duration-700 ${isActive ? "opacity-100" : "opacity-40"}`}>
                          <div className="relative flex items-center justify-center mb-2">
                            <div className="w-1 h-1 bg-sky-300 rounded-full shadow-[0_0_8px_rgba(56,189,248,1)]" />
                            {!prefersReduced && (
                              <motion.div className="absolute w-6 h-6 border border-sky-400/40 rounded-full"
                                animate={{ scale: [1, 2], opacity: [0.8, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                              />
                            )}
                          </div>
                          <span className="text-[7px] tracking-[0.2em] text-sky-400/80">SIGNAL</span>
                        </div>
                      )}

                      {/* Revenue (OUTPUT) */}
                      {idx === 2 && (
                        <div className={`flex flex-col items-center transition-all duration-700 ${isActive ? "opacity-100" : "opacity-40"}`}>
                          <svg width="40" height="30" viewBox="0 0 40 30" fill="none" className="mb-2">
                            <path d="M0,30 L10,20 L20,25 L40,0" stroke="rgba(168,85,247,0.6)" strokeWidth="1" />
                            <circle cx="40" cy="0" r="1.5" fill="rgba(168,85,247,1)" style={{ filter: "drop-shadow(0 0 5px rgba(168,85,247,1))" }} />
                            {!prefersReduced && (
                              <motion.path d="M0,30 L10,20 L20,25 L40,0" stroke="rgba(168,85,247,1)" strokeWidth="1.5" strokeDasharray="60"
                                initial={{ strokeDashoffset: 60 }}
                                animate={{ strokeDashoffset: 0 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                              />
                            )}
                          </svg>
                          <span className="text-[7px] tracking-[0.2em] text-purple-400/80">OUTPUT</span>
                        </div>
                      )}
                    </div>

                    <div className="z-10 flex flex-col items-center -translate-y-32 lg:-translate-y-48">
                      <span className={`text-[10px] tracking-[0.3em] font-bold uppercase transition-colors duration-500
                        ${isActive ? "text-white" : "text-blue-200/60"}
                      `}>
                        {label}
                      </span>
                      <span className="text-[8px] tracking-[0.2em] font-medium text-nova-gray mt-1 opacity-60">
                        {idx === 0 ? "INPUT" : idx === 1 ? "PROCESS" : "OUTPUT"}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Sparse Particles following paths (Desktop Only) */}
            {!prefersReduced && !isMobile && (
              <div className="absolute inset-0 pointer-events-none z-10">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-[3px] h-[3px] bg-white rounded-full mix-blend-screen shadow-[0_0_10px_2px_rgba(56,189,248,0.9)]"
                    style={{
                      top: `${30 + i * 10}%`,
                      left: `-5%`,
                      animation: `float-particle-arc ${15 + (i % 3) * 5}s ease-in-out infinite`,
                      animationDelay: `${i * 2}s`,
                      opacity: 0,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Final Growth Node */}
            <motion.div 
              className="absolute bottom-[-40px] lg:bottom-auto lg:top-[50%] lg:right-[-20px] -translate-y-0 lg:-translate-y-1/2 flex flex-col items-center gap-6 lg:gap-8 z-20 pointer-events-none"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-20%" }}
              variants={nodeVariants}
              style={{ transform: isMobile ? "none" : "translateZ(50px) translateY(-50%)" }}
            >
              <div className="text-center relative">
                {/* Connector line (Desktop only) */}
                <div className="hidden lg:block absolute bottom-[-32px] left-1/2 -translate-x-1/2 w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent" />
                <div className="hidden lg:block absolute bottom-[-32px] left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-white" />
                <p className="text-[9px] md:text-[10px] tracking-[0.2em] font-bold text-white uppercase leading-tight bg-[#020205]/90 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 shadow-[0_0_20px_rgba(56,189,248,0.15)]">
                  Sustainable
                  <br />
                  <span className="text-white">Growth</span>
                </p>
              </div>

              <div className="relative mt-2">
                {/* Slow breathing pulse */}
                <div className="absolute inset-0 bg-blue-500/30 blur-[20px] rounded-full scale-[3]" style={{ animation: prefersReduced ? "none" : "glow-breathe 8s ease-in-out infinite alternate" }} />
                
                {/* Core Node */}
                <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-950 shadow-[inset_0_0_20px_rgba(56,189,248,0.8),0_0_40px_rgba(56,189,248,0.6)] border border-blue-400 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/50 to-transparent" />
                  <div className="absolute top-1 right-2 w-4 h-4 bg-white/40 blur-[2px] rounded-full" />
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>

    </section>
  );
}
