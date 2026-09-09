"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// ============================================================
// GradientOrb — Premium Cinematic Background (Phase 2.5)
// ============================================================
// A highly sophisticated, dark digital atmosphere featuring:
// 1. Near-black base (#020205)
// 2. Large dark spherical form with subtle blue/violet rim lighting
// 3. Flowing orbital SVG trails representing data movement
// 4. Very sparse glowing particles moving along the orbits
// 5. Deep radial atmospheric glow behind the central content
// 6. Subtle mouse parallax (desktop only)
// 7. Scroll parallax
// 8. Respects prefers-reduced-motion
// ============================================================

export function GradientOrb() {
  const prefersReduced = useReducedMotion();
  
  // Safe window dimensions and mobile check
  const [isMobile, setIsMobile] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (prefersReduced || isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1 to 1
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [prefersReduced, isMobile]);

  // Scroll parallax
  const { scrollY } = useScroll();
  const smoothScroll = useSpring(scrollY, { damping: 20, stiffness: 100 });
  
  // Parallax offsets
  const yBg = useTransform(smoothScroll, [0, 1000], [0, 150]);
  const ySphere = useTransform(smoothScroll, [0, 1000], [0, 60]);
  const yGlow = useTransform(smoothScroll, [0, 1000], [0, 100]);

  // Mouse parallax amounts
  const mouseXBg = mousePosition.x * -3;
  const mouseYBg = mousePosition.y * -3;
  const mouseXSphere = mousePosition.x * -8;
  const mouseYSphere = mousePosition.y * -8;
  const mouseXTrails = mousePosition.x * 12;
  const mouseYTrails = mousePosition.y * 12;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#020205]">
      
      {/* 1. Atmospheric Noise (Layer 1) */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 2. Deep Atmospheric Radial Glow (Layer 2) */}
      <motion.div
        className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[150vw] h-[120vh] opacity-30 md:opacity-[0.35] blur-[100px] md:blur-[150px] z-0"
        style={{
          background: "radial-gradient(ellipse at top, rgba(29,78,216,0.2) 0%, transparent 60%)",
          x: prefersReduced ? "-50%" : `calc(-50% + ${mouseXBg}px)`,
          y: prefersReduced ? 0 : yBg,
          marginTop: prefersReduced ? 0 : mouseYBg,
        }}
      />

      {/* 3. The Dark Sphere / Planet Form (Layer 3) */}
      <motion.div
        className="absolute top-[25%] md:top-[15%] left-1/2 w-[200vw] h-[200vw] md:w-[130vw] md:h-[130vw] rounded-[100%] border-t border-[rgba(56,189,248,0.3)] shadow-[inset_0_100px_150px_-30px_rgba(29,78,216,0.08),0_-30px_100px_-10px_rgba(56,189,248,0.12)] bg-[#010103] z-10"
        style={{
          x: prefersReduced ? "-50%" : `calc(-50% + ${mouseXSphere}px)`,
          y: prefersReduced ? 0 : ySphere,
          marginTop: prefersReduced ? 0 : mouseYSphere,
        }}
      />

      {/* 4. Center Radiant Glow behind headline (Layer 4) */}
      <motion.div
        className="absolute top-[40%] left-1/2 w-[100vw] h-[60vh] max-w-[1000px] rounded-[100%] opacity-50 blur-[100px] mix-blend-screen z-10"
        style={{
          background: "radial-gradient(ellipse, rgba(56,189,248,0.15) 0%, rgba(217,70,239,0.05) 40%, transparent 70%)",
          x: prefersReduced ? "-50%" : `calc(-50% + ${mouseXBg}px)`,
          y: prefersReduced ? 0 : yGlow,
        }}
      />

      {/* 5. Orbital SVG Trails (Layer 5) */}
      {/* Hidden on mobile to ensure the headline remains completely dominant without distraction */}
      <motion.div 
        className="hidden md:block absolute inset-0 opacity-[0.5] mix-blend-screen z-20"
        style={{
          x: prefersReduced ? 0 : mouseXTrails,
          y: prefersReduced ? 0 : mouseYTrails,
        }}
      >
        <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="orbit1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(56,189,248,0)" />
              <stop offset="30%" stopColor="rgba(56,189,248,0.8)" />
              <stop offset="70%" stopColor="rgba(217,70,239,0.4)" />
              <stop offset="100%" stopColor="rgba(45,212,191,0)" />
            </linearGradient>
            <linearGradient id="orbit2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(29,78,216,0)" />
              <stop offset="50%" stopColor="rgba(56,189,248,1)" />
              <stop offset="100%" stopColor="rgba(29,78,216,0)" />
            </linearGradient>
            <filter id="blurGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" />
            </filter>
          </defs>
          
          <g>
            {/* Soft blurred orbital arc behind */}
            <path 
              d="M -300,700 C 200,600 400,200 1300,100" 
              fill="none" 
              stroke="url(#orbit1)" 
              strokeWidth="10"
              filter="url(#blurGlow)"
              className={prefersReduced ? "" : "animate-[dash-flow_25s_linear_infinite]"}
              strokeDasharray="800 1200"
            />
            {/* Sharp thin orbital arc */}
            <path 
              d="M -300,700 C 200,600 400,200 1300,100" 
              fill="none" 
              stroke="rgba(255,255,255,0.7)" 
              strokeWidth="1"
              className={prefersReduced ? "" : "animate-[dash-flow_20s_linear_infinite]"}
              strokeDasharray="400 1600"
            />

            {/* Reverse secondary thin arc */}
            <path 
              d="M -200,300 C 400,100 800,800 1300,900" 
              fill="none" 
              stroke="url(#orbit2)" 
              strokeWidth="1.5"
              className={prefersReduced ? "" : "animate-[dash-flow-reverse_30s_linear_infinite]"}
              strokeDasharray="500 1500"
            />
          </g>
        </svg>
      </motion.div>

      {/* 6. Sparse Cinematic Particles */}
      {!prefersReduced && !isMobile && (
        <div className="absolute inset-0 overflow-hidden z-20">
          {/* We use minimal particles to prevent DOM bloat and ensure it remains extremely subtle */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full mix-blend-screen shadow-[0_0_12px_2px_rgba(56,189,248,0.9)]"
              style={{
                top: `${15 + i * 15}%`,
                left: `-5%`,
                animation: `float-particle ${15 + (i % 3) * 5}s linear infinite`,
                animationDelay: `${i * 2.5}s`,
                opacity: 0,
              }}
            />
          ))}
        </div>
      )}

    </div>
  );
}
