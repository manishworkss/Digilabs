"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// ============================================================
// GradientOrb — Final Cinematic Hero Polish
// ============================================================
// A highly sophisticated, dark digital atmosphere featuring:
// 1. Near-black base (#020205)
// 2. Large dark spherical form with subtle blue/violet rim lighting
// 3. Flowing, organic, asymmetric orbital SVG trails
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

  // Mouse parallax amounts
  const mouseXBg = mousePosition.x * -3;
  const mouseYBg = mousePosition.y * -3;
  const mouseXSphere = mousePosition.x * -8;
  const mouseYSphere = mousePosition.y * -8;
  const mouseXTrails1 = mousePosition.x * 12;
  const mouseYTrails1 = mousePosition.y * 12;
  const mouseXTrails2 = mousePosition.x * 5;
  const mouseYTrails2 = mousePosition.y * 5;

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
        className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[150vw] h-[120vh] opacity-20 md:opacity-[0.25] blur-[100px] md:blur-[150px] z-0"
        style={{
          background: "radial-gradient(ellipse at top, rgba(15,23,42,0.8) 0%, rgba(29,78,216,0.3) 40%, transparent 70%)",
          x: prefersReduced ? "-50%" : `calc(-50% + ${mouseXBg}px)`,
          y: prefersReduced ? 0 : yBg,
          marginTop: prefersReduced ? 0 : mouseYBg,
        }}
      />

      {/* 3. The Dark Sphere / Planet Form (Layer 3) */}
      <motion.div
        className="absolute top-[35%] md:top-[25%] left-1/2 w-[200vw] h-[200vw] md:w-[160vw] md:h-[160vw] rounded-[100%] border-t border-[rgba(56,189,248,0.15)] shadow-[inset_0_100px_150px_-30px_rgba(29,78,216,0.05),0_-30px_100px_-10px_rgba(56,189,248,0.05)] bg-[#010103] z-10"
        style={{
          x: prefersReduced ? "-50%" : `calc(-50% + ${mouseXSphere}px)`,
          y: prefersReduced ? 0 : ySphere,
          marginTop: prefersReduced ? 0 : mouseYSphere,
        }}
      />

      {/* 4. Center Radiant Glow behind headline (Layer 4) */}
      <motion.div
        className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[100vw] h-[60vh] max-w-[1000px] rounded-[100%] blur-[100px] mix-blend-screen z-10"
        style={{
          background: "radial-gradient(ellipse, rgba(56,189,248,0.1) 0%, rgba(29,78,216,0.05) 40%, transparent 70%)",
          animation: prefersReduced ? "none" : "glow-breathe 15s ease-in-out infinite alternate",
        }}
      />

      {/* 5. Organic Orbital SVG Trails (Layer 5) */}
      {/* Distant Orbit Layer */}
      <motion.div 
        className="hidden md:block absolute inset-0 opacity-[0.25] mix-blend-screen z-20"
        style={{
          x: prefersReduced ? 0 : mouseXTrails2,
          y: prefersReduced ? 0 : mouseYTrails2,
        }}
      >
        <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <defs>
            <linearGradient id="orbit-distant" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(56,189,248,0)" />
              <stop offset="50%" stopColor="rgba(29,78,216,0.6)" />
              <stop offset="100%" stopColor="rgba(56,189,248,0)" />
            </linearGradient>
          </defs>
          <g>
            <path 
              d="M -400,900 C 100,800 600,100 1400,-100" 
              fill="none" 
              stroke="url(#orbit-distant)" 
              strokeWidth="4"
              className={prefersReduced ? "" : "animate-[dash-flow_35s_linear_infinite]"}
              strokeDasharray="900 1500"
            />
          </g>
        </svg>
      </motion.div>

      {/* Foreground Orbit Layer */}
      <motion.div 
        className="hidden md:block absolute inset-0 opacity-[0.4] mix-blend-screen z-20"
        style={{
          x: prefersReduced ? 0 : mouseXTrails1,
          y: prefersReduced ? 0 : mouseYTrails1,
        }}
      >
        <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="orbit1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(56,189,248,0)" />
              <stop offset="40%" stopColor="rgba(56,189,248,0.5)" />
              <stop offset="80%" stopColor="rgba(124,58,237,0.15)" />
              <stop offset="100%" stopColor="rgba(29,78,216,0)" />
            </linearGradient>
            <linearGradient id="orbit2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(29,78,216,0)" />
              <stop offset="40%" stopColor="rgba(56,189,248,0.3)" />
              <stop offset="100%" stopColor="rgba(29,78,216,0)" />
            </linearGradient>
            <filter id="blurGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>
          
          <g>
            {/* Highly organic, sweeping low-arc curve */}
            <path 
              d="M -300,1100 C 100,1000 400,600 1300,500" 
              fill="none" 
              stroke="url(#orbit1)" 
              strokeWidth="1.5"
              filter="url(#blurGlow)"
              className={prefersReduced ? "" : "animate-[dash-flow_30s_linear_infinite]"}
              strokeDasharray="600 1800"
            />
            {/* Ultra thin complementary curve */}
            <path 
              d="M -300,1100 C 100,1000 400,600 1300,500" 
              fill="none" 
              stroke="rgba(186,230,253,0.3)" 
              strokeWidth="0.5"
              className={prefersReduced ? "" : "animate-[dash-flow_25s_linear_infinite]"}
              strokeDasharray="400 2000"
            />

            {/* Subtly intersecting reverse curve */}
            <path 
              d="M -200,600 C 500,400 800,1100 1400,1200" 
              fill="none" 
              stroke="url(#orbit2)" 
              strokeWidth="0.5"
              className={prefersReduced ? "" : "animate-[dash-flow-reverse_40s_linear_infinite]"}
              strokeDasharray="700 1500"
            />
          </g>
        </svg>
      </motion.div>

      {/* 6. Sparse Cinematic Particles */}
      {!prefersReduced && !isMobile && (
        <div className="absolute inset-0 overflow-hidden z-20 pointer-events-none">
          {/* Only 4 particles to maintain extreme subtlety */}
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute w-[3px] h-[3px] bg-white rounded-full mix-blend-screen shadow-[0_0_10px_1px_rgba(56,189,248,0.8)]"
              style={{
                top: `${40 + i * 15}%`,
                left: `-5%`,
                animation: `float-particle-arc ${20 + (i % 2) * 10}s ease-in-out infinite`,
                animationDelay: `${i * 3.5}s`,
                opacity: 0,
              }}
            />
          ))}
        </div>
      )}

    </div>
  );
}
