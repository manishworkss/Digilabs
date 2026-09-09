"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { PROCESS_SECTION } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// ============================================================
// CONSTANTS & DATA
// ============================================================

const STEP_METADATA = [
  ["MARKET INTELLIGENCE", "AUDIENCE INSIGHTS", "OPPORTUNITY MAPPING"],
  ["SYSTEM DESIGN", "CHANNEL STRATEGY", "PERFORMANCE FRAMEWORK"],
  ["CAMPAIGN EXECUTION", "REAL-TIME OPTIMIZATION", "PERFORMANCE MONITORING"],
  ["SCALE WINNING STRATEGIES", "INCREASE EFFICIENCY", "COMPOUND GROWTH"]
];

const MICRO_NODES = [
  { top: "27.5%", labels: ["DATA", "SIGNALS", "INSIGHTS"] },
  { top: "52.5%", labels: ["CONNECT", "INTEGRATE", "OPTIMIZE"] },
  { top: "77.5%", labels: ["DEPLOY", "MEASURE", "ITERATE"] }
];

const NODE_POSITIONS = ["15%", "40%", "65%", "90%"];

// ============================================================
// SVG COMPONENTS
// ============================================================

const Node1Discover = ({ isActive, reducedMotion }: { isActive: boolean, reducedMotion: boolean }) => (
  <div className="relative flex items-center justify-center w-12 h-12">
    <motion.div 
      className="absolute inset-0 border border-sky-500/20 rounded-full"
      animate={{ rotate: reducedMotion ? 0 : 360 }}
      transition={{ duration: 15, ease: "linear", repeat: Infinity }}
    />
    <motion.div 
      className="absolute inset-1 border border-sky-400/30 rounded-full"
      animate={{ rotate: reducedMotion ? 0 : -360 }}
      transition={{ duration: 10, ease: "linear", repeat: Infinity }}
    />
    <div className={`w-3 h-3 rounded-full transition-all duration-700 ${isActive ? 'bg-sky-300 shadow-[0_0_15px_#38bdf8]' : 'bg-[#081e3d] border border-sky-500/50'}`} />
    
    {/* Micro orbiting points */}
    {isActive && !reducedMotion && (
      <>
        <div className="absolute top-0 w-1 h-1 bg-sky-200 rounded-full animate-ping" />
        <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-sky-300 rounded-full opacity-80" />
      </>
    )}
  </div>
);

const Node2Build = ({ isActive, reducedMotion }: { isActive: boolean, reducedMotion: boolean }) => (
  <div className="relative flex items-center justify-center w-12 h-12 gap-1">
    <motion.div 
      className={`w-3 h-3 rounded-sm transition-all duration-700 ${isActive ? 'bg-sky-400/80 border-sky-300' : 'bg-[#081e3d] border-sky-500/30'} border`}
      animate={isActive && !reducedMotion ? { y: [-2, 2, -2] } : {}}
      transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
    />
    <div className="flex flex-col gap-1">
      <motion.div 
        className={`w-3 h-3 rounded-sm transition-all duration-700 delay-100 ${isActive ? 'bg-sky-300 shadow-[0_0_10px_#38bdf8]' : 'bg-[#081e3d] border border-sky-500/30'}`}
      />
      <motion.div 
        className={`w-3 h-3 rounded-sm transition-all duration-700 delay-200 ${isActive ? 'bg-sky-400/80 border-sky-300' : 'bg-[#081e3d] border-sky-500/30'} border`}
        animate={isActive && !reducedMotion ? { y: [2, -2, 2] } : {}}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
      />
    </div>
  </div>
);

const Node3Launch = ({ isActive }: { isActive: boolean }) => (
  <div className="relative flex items-center justify-center w-12 h-12">
    <div className={`absolute inset-1 rounded-full border transition-all duration-700 ${isActive ? 'border-sky-400/50' : 'border-sky-500/20'}`} />
    <div className={`flex items-center justify-center w-6 h-6 rounded bg-[#081e3d] border transition-all duration-700 ${isActive ? 'border-sky-300 shadow-[0_0_12px_#38bdf8]' : 'border-sky-500/40'}`}>
      <div className={`w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-b-[4px] border-b-transparent transition-all duration-700 ${isActive ? 'border-l-white' : 'border-l-sky-500/50'} ml-0.5`} />
    </div>
  </div>
);

const Node4Scale = ({ isActive }: { isActive: boolean }) => (
  <div className="relative flex items-end justify-center w-12 h-12 gap-1 pb-2">
    <div className={`absolute inset-0 rounded-full border border-sky-500/20 transition-all duration-1000 ${isActive ? 'scale-110 opacity-50' : 'scale-100 opacity-20'}`} />
    <div className={`w-1.5 transition-all duration-1000 ${isActive ? 'h-3 bg-sky-400/60' : 'h-2 bg-sky-500/20'}`} />
    <div className={`w-1.5 transition-all duration-1000 delay-100 ${isActive ? 'h-5 bg-sky-400/80' : 'h-3 bg-sky-500/20'}`} />
    <div className={`w-1.5 transition-all duration-1000 delay-200 ${isActive ? 'h-7 bg-sky-300 shadow-[0_0_12px_#38bdf8]' : 'h-4 bg-sky-500/20'}`} />
  </div>
);

// ============================================================
// RIGHT PANELS (READOUTS)
// ============================================================

const ReadoutPanel = ({ index, isActive }: { index: number, isActive: boolean }) => {
  const titles = ["RESEARCH", "ARCHITECTURE", "EXECUTION", "GROWTH"];
  return (
    <div className={`w-40 h-24 border bg-[#01040a]/80 backdrop-blur-md rounded-lg p-3 flex flex-col justify-between transition-all duration-700 ${isActive ? 'border-sky-500/40 shadow-[0_0_20px_rgba(56,189,248,0.1)]' : 'border-white/5 opacity-50'}`}>
      <div className="flex items-center gap-2">
        <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-sky-400 animate-pulse' : 'bg-slate-700'}`} />
        <span className={`text-[9px] font-mono tracking-widest ${isActive ? 'text-sky-300' : 'text-slate-500'}`}>{titles[index]}</span>
      </div>
      <div className="h-10 w-full flex items-center justify-center opacity-70">
        {index === 0 && (
          <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
            <path d="M 0 15 Q 20 5, 40 15 T 80 10 T 100 20" fill="none" stroke={isActive ? "#38bdf8" : "#334155"} strokeWidth="1.5" />
            {isActive && <circle cx="80" cy="10" r="2" fill="#fff" filter="drop-shadow(0 0 4px #fff)" />}
          </svg>
        )}
        {index === 1 && (
          <div className="flex gap-2">
            <div className={`w-4 h-4 rounded-sm border ${isActive ? 'border-sky-400 bg-sky-900/30' : 'border-slate-700'}`} />
            <div className={`w-4 h-4 rounded-sm border ${isActive ? 'border-sky-400 bg-sky-900/30' : 'border-slate-700'}`} />
            <div className={`w-4 h-4 rounded-sm border ${isActive ? 'border-sky-400 bg-sky-900/30' : 'border-slate-700'}`} />
          </div>
        )}
        {index === 2 && (
          <div className="flex items-end gap-1.5 h-full pt-2">
            <div className={`w-2 h-[40%] rounded-t-sm ${isActive ? 'bg-sky-400' : 'bg-slate-700'}`} />
            <div className={`w-2 h-[70%] rounded-t-sm ${isActive ? 'bg-sky-400' : 'bg-slate-700'}`} />
            <div className={`w-2 h-[50%] rounded-t-sm ${isActive ? 'bg-sky-400' : 'bg-slate-700'}`} />
            <div className={`w-2 h-[90%] rounded-t-sm ${isActive ? 'bg-sky-400' : 'bg-slate-700'}`} />
          </div>
        )}
        {index === 3 && (
          <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
            <path d="M 0 25 Q 40 25, 60 15 T 100 5" fill="none" stroke={isActive ? "#38bdf8" : "#334155"} strokeWidth="2" className={isActive ? "drop-shadow-[0_0_6px_#38bdf8]" : ""} />
            {isActive && <path d="M 95 0 L 100 5 L 90 5 Z" fill="#38bdf8" />}
          </svg>
        )}
      </div>
    </div>
  );
};

// ============================================================
// LEFT TEXT STEP
// ============================================================

const ProcessStep = ({ step, index }: { step: any; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  
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
      className="flex flex-col gap-4 min-h-[50vh] sm:min-h-[70vh] justify-center max-w-md"
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
      <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-light mb-4">
        {step.description}
      </p>
      
      {/* Technical Metadata Block */}
      <div className="flex flex-col gap-2 border-t border-sky-900/30 pt-4 mt-2">
        {STEP_METADATA[index].map((meta, i) => (
          <span key={i} className="text-[10px] font-mono tracking-widest text-sky-200/50 uppercase">
            {meta}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

// ============================================================
// CENTRAL ENERGY SPINE & STICKY MACHINE
// ============================================================

const CentralMachine = ({ progress }: { progress: MotionValue<number> }) => {
  const prefersReducedMotion = useReducedMotion();
  const smoothProgress = useSpring(progress, { stiffness: 100, damping: 20 });

  // Map progress to active indices (0, 1, 2, 3)
  const activeIndex = useTransform(smoothProgress, [0, 0.25, 0.5, 0.75, 1], [0, 1, 2, 3, 3]);
  const activeStep = Math.min(3, Math.max(0, Math.round(activeIndex.get()))); // React state equivalent via motion is tricky, we'll use raw transforms for styles

  // The traveling energy particle on the spine
  const particleY = useTransform(smoothProgress, [0, 1], ["15%", "90%"]);
  const spineGlowOpacity = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  // Sub-progress for each node (0 to 1)
  const p1 = useTransform(smoothProgress, [0, 0.25], [0, 1]);
  const p2 = useTransform(smoothProgress, [0.25, 0.5], [0, 1]);
  const p3 = useTransform(smoothProgress, [0.5, 0.75], [0, 1]);
  const p4 = useTransform(smoothProgress, [0.75, 1], [0, 1]);

  return (
    <div className="relative w-full h-[800px] max-h-screen flex items-center justify-center">
      
      {/* CENTER LINE BASE */}
      <div className="absolute left-1/2 top-[10%] bottom-[10%] w-[1px] bg-sky-900/30 -translate-x-1/2" />
      
      {/* ENERGY PARTICLE & GLOW */}
      <motion.div 
        className="absolute left-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent via-sky-400 to-transparent -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_#38bdf8]"
        style={{ top: particleY, opacity: prefersReducedMotion ? 0 : spineGlowOpacity }}
      />
      <motion.div 
        className="absolute left-1/2 w-1.5 h-3 bg-sky-300 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#fff]"
        style={{ top: particleY, opacity: prefersReducedMotion ? 0 : spineGlowOpacity }}
      />

      {/* HORIZONTAL CONNECTORS & MAJOR NODES */}
      {NODE_POSITIONS.map((pos, i) => {
        // We use a custom hook-like approach with useTransform inside the component body 
        // to determine if this specific node is "active" based on smoothProgress.
        // For simplicity in a loop, we'll just render them and use framer-motion styles mapped to smoothProgress.
        
        // Active threshold: e.g. Node 0 is active around 0-0.25, Node 1 around 0.25-0.5
        const thresholdStart = Math.max(0, (i * 0.25) - 0.1);
        const thresholdEnd = Math.min(1, (i * 0.25) + 0.3);
        const nodeOpacity = useTransform(smoothProgress, [thresholdStart, thresholdStart + 0.1, thresholdEnd - 0.1, thresholdEnd], [0.3, 1, 1, 0.3]);
        
        return (
          <div key={`node-${i}`} className="absolute w-full flex items-center justify-center" style={{ top: pos, transform: "translateY(-50%)" }}>
            
            {/* Left Horizontal Connector (pointing to text) */}
            <motion.div 
              className="absolute right-1/2 w-24 h-[1px] origin-right"
              style={{ 
                background: "linear-gradient(to right, transparent, rgba(56,189,248,0.5))",
                opacity: nodeOpacity 
              }} 
            />

            {/* Right Horizontal Connector (pointing to readout panel) */}
            <motion.div 
              className="absolute left-1/2 w-24 h-[1px] origin-left"
              style={{ 
                background: "linear-gradient(to left, transparent, rgba(56,189,248,0.5))",
                opacity: nodeOpacity 
              }} 
            />

            {/* The Central Node wrapper */}
            <motion.div className="bg-[#01040a] rounded-full z-10" style={{ opacity: useTransform(smoothProgress, [0,1], [1,1]) }}> 
              {/* Force re-render of active state for SVGs using a trick or just pass progress, 
                  but since we can't easily extract boolean from MotionValue in render without state,
                  we will just use a wrapper component that subscribes to it. */}
              <ActiveStateWrapper progress={smoothProgress} index={i} reducedMotion={prefersReducedMotion} />
            </motion.div>

            {/* Right Readout Panel */}
            <motion.div className="absolute left-[calc(50%+4rem)]" style={{ opacity: nodeOpacity }}>
              <ActiveReadoutWrapper progress={smoothProgress} index={i} />
            </motion.div>
          </div>
        );
      })}

      {/* MICRO NODES (The Empty Space) */}
      {MICRO_NODES.map((micro, i) => (
        <div key={`micro-${i}`} className="absolute w-full flex flex-col items-center justify-center gap-2" style={{ top: micro.top, transform: "translateY(-50%)" }}>
          <div className="w-4 h-4 border border-sky-900/50 rounded-sm rotate-45 flex items-center justify-center bg-[#01040a]">
            <div className="w-1 h-1 bg-sky-700 rounded-sm" />
          </div>
          <div className="absolute left-[calc(50%+1.5rem)] flex flex-col gap-1">
            {micro.labels.map((label, j) => (
              <div key={j} className="flex items-center gap-2">
                <div className="w-2 h-[1px] bg-sky-800" />
                <span className="text-[8px] font-mono text-sky-600/60 tracking-widest">{label}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* CINEMATIC BOTTOM TRANSITION */}
      <motion.div 
        className="absolute w-full flex flex-col items-center justify-center"
        style={{ 
          top: "100%", 
          opacity: useTransform(smoothProgress, [0.8, 1], [0, 1]) 
        }}
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-sky-500/50 to-transparent" />
        <div className="absolute top-16 w-full max-w-xs h-32 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500/20 via-[#01040a]/0 to-[#01040a]/0 rounded-full blur-xl pointer-events-none" />
        <span className="mt-8 text-[10px] font-mono tracking-[0.3em] text-sky-400/80 uppercase">
          A System For What&apos;s Next
        </span>
      </motion.div>

    </div>
  );
};

// Wrappers to convert MotionValue to boolean active states for the complex SVG components
import { useState, useEffect } from "react";

const ActiveStateWrapper = ({ progress, index, reducedMotion }: { progress: MotionValue<number>, index: number, reducedMotion: boolean }) => {
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    return progress.on("change", (v) => {
      const active = (v >= Math.max(0, index * 0.25 - 0.1) && v <= Math.min(1, index * 0.25 + 0.3));
      setIsActive(active);
    });
  }, [progress, index]);

  if (index === 0) return <Node1Discover isActive={isActive} reducedMotion={reducedMotion} />;
  if (index === 1) return <Node2Build isActive={isActive} reducedMotion={reducedMotion} />;
  if (index === 2) return <Node3Launch isActive={isActive} />;
  if (index === 3) return <Node4Scale isActive={isActive} />;
  return null;
};

const ActiveReadoutWrapper = ({ progress, index }: { progress: MotionValue<number>, index: number }) => {
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    return progress.on("change", (v) => {
      const active = (v >= Math.max(0, index * 0.25 - 0.1) && v <= Math.min(1, index * 0.25 + 0.3));
      setIsActive(active);
    });
  }, [progress, index]);

  return <ReadoutPanel index={index} isActive={isActive} />;
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
      id="process" 
      ref={containerRef} 
      className="relative bg-[#01040a] text-white"
    >
      {/* Background Atmosphere - Technical Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none" />
      <div className="absolute left-1/4 right-1/4 top-0 bottom-0 border-x border-sky-900/10 pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* DESKTOP SPLIT LAYOUT */}
        <div className="hidden lg:grid grid-cols-2 gap-12">
          
          {/* Left Column: Scrollable Content */}
          <div className="pt-32 pb-96 pr-8">
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

          {/* Right Column: Sticky Machine Assembly */}
          <div className="relative">
            <div className="sticky top-0 h-screen flex items-center justify-center">
              <CentralMachine progress={scrollYProgress} />
            </div>
          </div>
        </div>

        {/* MOBILE / TABLET LAYOUT (<1024px) */}
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
            {/* Central Spine for Mobile */}
            <div className="absolute left-6 top-10 bottom-10 w-[1px] bg-sky-900/30 z-0" />
            
            {PROCESS_SECTION.steps.map((step, index) => (
              <div key={step.number} className="relative z-10 flex flex-col gap-8">
                {/* Node & Text Wrapper */}
                <div className="flex gap-6">
                  <div className="bg-[#01040a] rounded-full py-2 z-10 scale-75 origin-top-left">
                    {index === 0 && <Node1Discover isActive={true} reducedMotion={true} />}
                    {index === 1 && <Node2Build isActive={true} reducedMotion={true} />}
                    {index === 2 && <Node3Launch isActive={true} />}
                    {index === 3 && <Node4Scale isActive={true} />}
                  </div>
                  
                  {/* Text Block */}
                  <div className="flex flex-col gap-3 bg-[#01040a]/80 backdrop-blur-sm pr-4 pt-2">
                    <div className="text-sky-400 font-mono tracking-widest text-sm">{step.number}</div>
                    <h3 className="text-3xl font-light text-white">{step.title}</h3>
                    <p className="text-slate-400 text-base font-light">{step.description}</p>
                    
                    {/* Metadata */}
                    <div className="flex flex-col gap-1 border-t border-sky-900/30 pt-4 mt-2">
                      {STEP_METADATA[index].map((meta, i) => (
                        <span key={i} className="text-[9px] font-mono tracking-widest text-sky-200/50 uppercase">
                          {meta}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Micro Nodes (Mobile) */}
                {index < 3 && (
                  <div className="flex flex-col items-start ml-4 pl-4 gap-2 border-l border-sky-900/30 py-4">
                    {MICRO_NODES[index].labels.map((label, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <div className="w-2 h-[1px] bg-sky-800" />
                        <span className="text-[8px] font-mono text-sky-600/60 tracking-widest">{label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Cinematic Bottom Transition Mobile */}
            <div className="relative z-10 flex flex-col items-center justify-center mt-12">
               <div className="w-[1px] h-16 bg-gradient-to-b from-sky-500/50 to-transparent" />
               <span className="mt-8 text-[10px] font-mono tracking-[0.3em] text-sky-400/80 uppercase">
                 A System For What&apos;s Next
               </span>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
