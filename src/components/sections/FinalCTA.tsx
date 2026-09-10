"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FINAL_CTA } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Play, Zap, Target, Users } from "lucide-react";

// ============================================================
// Final CTA — High Performance Dashboard Vibe
// ============================================================

export function FinalCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // 3D rotations based on scroll
  const rotateX = useTransform(scrollYProgress, [0, 1], [10, -5]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [-20, -10]);
  const yOffset = useTransform(scrollYProgress, [0, 1], [100, -50]);

  return (
    <SectionWrapper id="cta" className="relative overflow-hidden pt-32 pb-48 bg-[#020205]">
      
      {/* Background Glowing Horizon & Grid */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-end opacity-40 mix-blend-screen">
        <div className="w-[150vw] h-[50vh] bg-gradient-radial from-blue-600/30 via-transparent to-transparent blur-3xl rounded-[100%]" />
      </div>

      <div ref={containerRef} className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Content */}
          <ScrollReveal className="flex flex-col items-start text-left max-w-xl z-20">
            <p className="text-xs md:text-sm text-blue-400 font-semibold uppercase tracking-[0.2em] mb-4 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">
              A System For What's Next
            </p>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-nova-white mb-6 leading-tight">
              Ready to make your next <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                campaign count?
              </span>
            </h2>
            
            <p className="text-lg text-nova-gray mb-10 leading-relaxed">
              {FINAL_CTA.body}
            </p>
            
            <div className="flex flex-wrap gap-4 mb-16">
              <Button href="#contact" variant="primary" size="lg" className="rounded-full px-8 bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                Book a Call &rarr;
              </Button>
              <Button href="#system" variant="secondary" size="lg" className="rounded-full px-6 border border-white/10 hover:bg-white/5 group">
                <Play className="w-4 h-4 mr-2 text-blue-400 group-hover:text-blue-300" />
                See How It Works
              </Button>
            </div>

            {/* Feature Icons Row */}
            <div className="flex flex-wrap gap-6 md:gap-8 items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-nova-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-nova-white">Data-Driven</p>
                  <p className="text-xs text-nova-gray">Real insights, real growth</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-nova-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-nova-white">Performance First</p>
                  <p className="text-xs text-nova-gray">Ads that deliver results</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-nova-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-nova-white">Expert Support</p>
                  <p className="text-xs text-nova-gray">From strategy to scale</p>
                </div>
              </div>
            </div>
          </ScrollReveal>


          {/* RIGHT COLUMN: 3D Dashboard */}
          <div className="relative w-full h-[500px] lg:h-[600px] perspective-[1500px] z-10 flex items-center justify-center mt-12 lg:mt-0">
            
            {/* Glowing Swooshes */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <svg width="120%" height="120%" viewBox="0 0 800 600" className="absolute -right-20 opacity-60 mix-blend-screen">
                <path d="M 100 500 C 400 400 200 100 700 50" fill="none" stroke="url(#blue-gradient)" strokeWidth="4" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 15px rgba(59,130,246,0.8))" }} />
                <path d="M 50 450 C 300 350 400 200 800 150" fill="none" stroke="url(#blue-gradient)" strokeWidth="2" strokeLinecap="round" opacity="0.5" style={{ filter: "drop-shadow(0 0 10px rgba(59,130,246,0.5))" }} />
                <defs>
                  <linearGradient id="blue-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Glass Dashboard Container */}
            <motion.div 
              style={{ rotateX, rotateY, y: yOffset }}
              className="relative w-full max-w-lg aspect-[4/3] rounded-2xl bg-[#0a0f1d]/80 backdrop-blur-xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.2)] flex flex-col p-6 overflow-hidden transform-style-3d"
            >
              {/* Dashboard Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-semibold text-nova-white">Campaign Performance</h3>
                <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-nova-gray flex items-center gap-2">
                  Last 30 days
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              {/* Chart Area */}
              <div className="relative flex-grow mb-6 border-b border-white/10 pb-4">
                {/* SVG Graph */}
                <svg width="100%" height="100%" viewBox="0 0 400 150" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="25" x2="400" y2="25" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  <line x1="0" y1="75" x2="400" y2="75" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  <line x1="0" y1="125" x2="400" y2="125" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  
                  {/* Fill Gradient */}
                  <defs>
                    <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Line Path */}
                  <path 
                    d="M 0 100 Q 50 120 100 80 T 200 70 T 300 40 T 400 10" 
                    fill="none" 
                    stroke="#3b82f6" 
                    strokeWidth="4" 
                    strokeLinecap="round"
                    style={{ filter: "drop-shadow(0 4px 8px rgba(59,130,246,0.5))" }}
                  />
                  
                  {/* Fill Area */}
                  <path 
                    d="M 0 100 Q 50 120 100 80 T 200 70 T 300 40 T 400 10 L 400 150 L 0 150 Z" 
                    fill="url(#chart-fill)" 
                  />

                  {/* Active Point */}
                  <circle cx="340" cy="27" r="4" fill="white" className="animate-pulse" />
                  <circle cx="340" cy="27" r="10" fill="#3b82f6" opacity="0.3" className="animate-ping" />
                  
                  {/* ROI Tooltip */}
                  <g transform="translate(280, 0)">
                    <rect width="60" height="30" rx="4" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" />
                    <text x="30" y="12" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">+178%</text>
                    <text x="30" y="24" fontSize="8" fill="#86868B" textAnchor="middle">ROI Growth</text>
                  </g>
                </svg>
                
                {/* X Axis Labels */}
                <div className="absolute bottom-[-10px] left-0 right-0 flex justify-between text-[10px] text-nova-muted px-2">
                  <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
                </div>
              </div>

              {/* Bottom Metric Cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col">
                  <span className="text-[10px] text-nova-gray mb-1">ROAS</span>
                  <span className="text-lg font-bold text-white mb-1">4.8x</span>
                  <span className="text-[10px] text-green-400 flex items-center gap-1">
                    &uarr; 32%
                  </span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col">
                  <span className="text-[10px] text-nova-gray mb-1">Conversions</span>
                  <span className="text-lg font-bold text-white mb-1">12.4K</span>
                  <span className="text-[10px] text-green-400 flex items-center gap-1">
                    &uarr; 54%
                  </span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col">
                  <span className="text-[10px] text-nova-gray mb-1">Revenue</span>
                  <span className="text-lg font-bold text-white mb-1">$86.2K</span>
                  <span className="text-[10px] text-green-400 flex items-center gap-1">
                    &uarr; 48%
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Floating Side Badges */}
            <div className="absolute -right-4 top-1/4 flex flex-col gap-3 translate-x-1/2 z-20 hidden md:flex">
              <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, -20]) }} className="bg-[#1a1f35]/90 backdrop-blur-md border border-white/10 rounded-lg p-3 flex items-center gap-3 shadow-xl">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>
                </div>
                <span className="text-xs font-medium text-white">Smarter<br/>Campaigns</span>
              </motion.div>
              
              <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, -10]) }} className="bg-[#1a1f35]/90 backdrop-blur-md border border-white/10 rounded-lg p-3 flex items-center gap-3 shadow-xl translate-x-4">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                </div>
                <span className="text-xs font-medium text-white">Higher<br/>Conversions</span>
              </motion.div>
              
              <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, -30]) }} className="bg-[#1a1f35]/90 backdrop-blur-md border border-white/10 rounded-lg p-3 flex items-center gap-3 shadow-xl">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <span className="text-xs font-medium text-white">Long-Term<br/>Growth</span>
              </motion.div>
            </div>

            {/* Handwritten Note */}
            <div className="absolute -bottom-8 -right-12 z-30 transform rotate-[-5deg] hidden lg:block">
              <div className="relative">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="absolute -top-6 -left-6 transform rotate-[160deg]">
                  <path d="M 5 35 Q 20 20 35 5" stroke="#60a5fa" strokeWidth="2" fill="none" />
                  <path d="M 25 5 L 35 5 L 35 15" stroke="#60a5fa" strokeWidth="2" fill="none" strokeLinejoin="round" />
                </svg>
                <p className="text-2xl text-blue-300 font-caveat drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]">
                  Growth<br/>on Autopilot
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* HORIZON & TRUSTED BRANDS */}
      <div className="relative mt-32 w-full flex flex-col items-center">
        {/* Curved Glowing Horizon */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200vw] h-[200px] border-t border-blue-500/40 rounded-[100%] shadow-[0_-20px_50px_rgba(59,130,246,0.2)] bg-[#020205] z-0" />
        
        <div className="relative z-10 flex flex-col items-center w-full max-w-6xl mx-auto px-5 sm:px-8 mt-16 pb-16">
          <p className="text-[10px] uppercase tracking-[0.2em] text-nova-muted mb-8 font-semibold">
            Trusted by Ambitious Brands
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 mix-blend-screen items-center">
            {/* Spotify */}
            <svg height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white hover:text-white/80 transition-colors">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.54.659.301 1.02zm1.44-3.3c-.301.42-.84.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.44-.539.12-1.02-.18-1.14-.72-.12-.54.18-1.02.72-1.14 4.32-1.26 9.72-.6 13.319 1.62.48.3.66.84.302 1.38zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.66.18-1.32-.18-1.5-.84-.18-.66.18-1.32.84-1.5 4.32-1.32 11.28-1.02 15.72 1.62.6.36.78 1.14.42 1.74-.36.6-1.14.78-1.56.42z"/>
            </svg>
            {/* Notion (Simplified) */}
            <svg height="24" viewBox="0 0 100 100" fill="currentColor" className="text-white">
              <path d="M15 25 h70 v50 h-70 z" fill="none" stroke="currentColor" strokeWidth="8"/>
              <path d="M35 35 v30 l30-30 v30" stroke="currentColor" strokeWidth="8" fill="none"/>
            </svg>
            {/* Stripe (Simplified) */}
            <svg height="24" viewBox="0 0 100 100" fill="currentColor" className="text-white">
              <text x="50" y="65" fontSize="40" fontWeight="bold" textAnchor="middle" fill="currentColor">stripe</text>
            </svg>
            {/* Figma */}
            <svg height="24" viewBox="0 0 38 57" fill="currentColor" className="text-white">
              <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" />
              <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" />
              <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" />
              <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" />
              <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" />
            </svg>
            {/* Linear (Simplified) */}
            <svg height="24" viewBox="0 0 100 100" fill="currentColor" className="text-white">
              <path d="M10 90 L90 10" stroke="currentColor" strokeWidth="12" strokeLinecap="round"/>
              <path d="M30 90 L90 30" stroke="currentColor" strokeWidth="12" strokeLinecap="round"/>
              <path d="M50 90 L90 50" stroke="currentColor" strokeWidth="12" strokeLinecap="round"/>
            </svg>
            {/* Webflow (Simplified) */}
            <svg height="24" viewBox="0 0 100 100" fill="currentColor" className="text-white">
              <text x="50" y="65" fontSize="40" fontWeight="bold" textAnchor="middle" fill="currentColor">Webflow</text>
            </svg>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="relative mt-8 flex flex-col items-center justify-center opacity-60">
          <div className="w-5 h-8 border border-white rounded-full flex justify-center p-1 mb-2">
            <motion.div 
              className="w-1 h-2 bg-white rounded-full"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />
          </div>
          <span className="text-[10px] text-nova-muted uppercase tracking-widest">
            Scroll to Contact
          </span>
        </div>
      </div>

    </SectionWrapper>
  );
}
