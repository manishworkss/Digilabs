"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Loader2, ArrowRight } from "lucide-react";

import { leadFormSchema, type LeadFormData } from "@/lib/schema";
import { trackLeadFormSubmit } from "@/lib/analytics";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

// ============================================================
// SVG SYSTEM VISUALIZATION
// ============================================================

const SystemVisualization = () => {
  const nodes = ["DATA", "STRATEGY", "CREATIVE", "OPTIMIZATION"];
  
  return (
    <div className="relative mt-12 flex flex-col pl-4">
      {/* Vertical connection line */}
      <div className="absolute left-[23px] top-4 bottom-12 w-[1px] bg-sky-900/40" />
      
      {/* Animated signal on the line */}
      <motion.div 
        className="absolute left-[23px] w-[1px] h-12 bg-gradient-to-b from-transparent via-sky-400 to-transparent shadow-[0_0_8px_#38bdf8]"
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      {nodes.map((node, i) => (
        <div key={node} className="flex flex-col mb-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-4 h-4 rounded-full border border-sky-500/30 bg-[#01040a] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-sky-400/50" />
            </div>
            <span className="text-[10px] font-mono tracking-widest text-slate-400">{node}</span>
          </div>
        </div>
      ))}

      {/* Final Growth Node */}
      <div className="flex flex-col relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-4 h-4 rounded-sm border border-sky-400 bg-sky-900/20 flex items-center justify-center shadow-[0_0_10px_rgba(56,189,248,0.2)]">
            <div className="w-1.5 h-1.5 rounded-sm bg-sky-300" />
          </div>
          <span className="text-[11px] font-mono tracking-widest text-sky-300 font-medium">GROWTH</span>
        </div>
      </div>

      {/* Connector from Growth pointing towards the Form on Desktop */}
      <div className="hidden lg:block absolute left-[23px] top-full mt-[-10px] w-full min-w-[200px]">
        <svg className="w-full h-24 overflow-visible" viewBox="0 0 200 100" fill="none">
          <motion.path 
            d="M 0 0 C 0 50, 50 80, 200 80" 
            stroke="url(#connectorGradient)" 
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
          />
          <defs>
            <linearGradient id="connectorGradient" x1="0" y1="0" x2="200" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================

export function LeadForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      budget: "",
    },
  });

  const onSubmit = async (data: LeadFormData) => {
    setStatus("loading");
    setErrorMessage(null);

    const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

    if (!endpoint) {
      // For development, simulate network request if no endpoint is configured
      console.warn("NEXT_PUBLIC_FORM_ENDPOINT is not defined. Simulating submission.");
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      reset();
      return;
    }

    try {
      await fetch(endpoint, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(data),
      });

      trackLeadFormSubmit();
      setStatus("success");
      reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <SectionWrapper id="contact" className="py-24 md:py-32 relative bg-[#01040a] overflow-hidden">
      
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-900/10 via-[#01040a] to-[#01040a] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* LEFT COLUMN: CTA & VISUAL */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col"
          >
            <span className="text-[11px] font-mono font-semibold tracking-[0.2em] text-sky-400 uppercase mb-6">
              Get Started
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-white mb-6">
              Let&apos;s talk <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-sky-200 border-b border-sky-400/30 pb-1">growth</span>
            </h2>
            <p className="text-slate-400 text-lg font-light max-w-md leading-relaxed">
              Tell us where you are today, what you&apos;re trying to achieve, and how much you&apos;re ready to invest.
            </p>

            <SystemVisualization />

            {/* Tiny Bottom Metadata */}
            <div className="mt-24 lg:mt-32 flex gap-6 text-[9px] font-mono tracking-widest text-slate-600 uppercase">
              <span>NOVA / CONTACT</span>
              <span className="hidden sm:inline">GROWTH SYSTEM</span>
              <span className="text-sky-500/50">SECURE INTAKE</span>
            </div>
          </motion.div>


          {/* RIGHT COLUMN: LEAD FORM */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto"
          >
            {/* Form Container Glassy Style */}
            <div className="relative bg-[#050b14]/80 backdrop-blur-xl border border-white/5 rounded-[24px] p-8 md:p-10 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden">
              
              {/* Subtle top edge glow */}
              <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-sky-400/50 to-transparent" />

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-center text-center py-16"
                  >
                    <div className="w-16 h-16 bg-sky-500/10 rounded-full flex items-center justify-center mb-6 border border-sky-500/20 shadow-[0_0_20px_rgba(56,189,248,0.15)]">
                      <CheckCircle2 className="w-8 h-8 text-sky-400" />
                    </div>
                    <h3 className="text-2xl font-light text-white mb-3">
                      You&apos;re on the list.
                    </h3>
                    <p className="text-slate-400 font-light max-w-xs mx-auto">
                      Our team will review your details and reach out shortly to discuss your growth plan.
                    </p>
                    <button
                      className="mt-10 text-xs font-mono text-sky-400 hover:text-sky-300 transition-colors uppercase tracking-widest"
                      onClick={() => setStatus("idle")}
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6 relative z-10"
                    noValidate
                  >
                    <div className="space-y-5">
                      {/* Name */}
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-xs font-mono tracking-widest uppercase text-slate-400">
                          Full Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          placeholder="Jane Doe"
                          disabled={status === "loading"}
                          className={`w-full px-4 py-3.5 bg-[#01040a]/50 border rounded-xl text-white placeholder:text-slate-600 outline-none transition-all duration-300 ${
                            errors.name 
                              ? "border-red-500/50 focus:border-red-500 focus:shadow-[0_0_10px_rgba(239,68,68,0.1)]" 
                              : "border-white/10 hover:border-white/20 focus:border-sky-400/50 focus:shadow-[0_0_15px_rgba(56,189,248,0.1)]"
                          }`}
                          {...register("name")}
                        />
                        {errors.name && (
                          <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1.5 font-mono">
                            <AlertCircle className="w-3 h-3" />
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-xs font-mono tracking-widest uppercase text-slate-400">
                          Work Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          placeholder="jane@company.com"
                          disabled={status === "loading"}
                          className={`w-full px-4 py-3.5 bg-[#01040a]/50 border rounded-xl text-white placeholder:text-slate-600 outline-none transition-all duration-300 ${
                            errors.email 
                              ? "border-red-500/50 focus:border-red-500 focus:shadow-[0_0_10px_rgba(239,68,68,0.1)]" 
                              : "border-white/10 hover:border-white/20 focus:border-sky-400/50 focus:shadow-[0_0_15px_rgba(56,189,248,0.1)]"
                          }`}
                          {...register("email")}
                        />
                        {errors.email && (
                          <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1.5 font-mono">
                            <AlertCircle className="w-3 h-3" />
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      {/* Company */}
                      <div className="space-y-2">
                        <label htmlFor="company" className="text-xs font-mono tracking-widest uppercase text-slate-400">
                          Company
                        </label>
                        <input
                          id="company"
                          type="text"
                          placeholder="Acme Corp"
                          disabled={status === "loading"}
                          className={`w-full px-4 py-3.5 bg-[#01040a]/50 border rounded-xl text-white placeholder:text-slate-600 outline-none transition-all duration-300 ${
                            errors.company 
                              ? "border-red-500/50 focus:border-red-500 focus:shadow-[0_0_10px_rgba(239,68,68,0.1)]" 
                              : "border-white/10 hover:border-white/20 focus:border-sky-400/50 focus:shadow-[0_0_15px_rgba(56,189,248,0.1)]"
                          }`}
                          {...register("company")}
                        />
                        {errors.company && (
                          <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1.5 font-mono">
                            <AlertCircle className="w-3 h-3" />
                            {errors.company.message}
                          </p>
                        )}
                      </div>

                      {/* Budget */}
                      <div className="space-y-2">
                        <label htmlFor="budget" className="text-xs font-mono tracking-widest uppercase text-slate-400">
                          Monthly Ad Budget
                        </label>
                        <div className="relative">
                          <select
                            id="budget"
                            disabled={status === "loading"}
                            className={`w-full px-4 py-3.5 bg-[#01040a]/50 border rounded-xl text-white outline-none transition-all duration-300 appearance-none cursor-pointer ${
                              errors.budget 
                                ? "border-red-500/50 focus:border-red-500 focus:shadow-[0_0_10px_rgba(239,68,68,0.1)]" 
                                : "border-white/10 hover:border-white/20 focus:border-sky-400/50 focus:shadow-[0_0_15px_rgba(56,189,248,0.1)]"
                            }`}
                            {...register("budget")}
                            defaultValue=""
                          >
                            <option value="" disabled className="text-slate-600">Select budget range...</option>
                            <option value="under_10k" className="bg-[#050b14] text-white">Under $10,000</option>
                            <option value="10k_to_50k" className="bg-[#050b14] text-white">$10,000 - $50,000</option>
                            <option value="50k_to_100k" className="bg-[#050b14] text-white">$50,000 - $100,000</option>
                            <option value="over_100k" className="bg-[#050b14] text-white">$100,000+</option>
                          </select>
                          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-sky-400">
                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        </div>
                        {errors.budget && (
                          <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1.5 font-mono">
                            <AlertCircle className="w-3 h-3" />
                            {errors.budget.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* General Error Message */}
                    {status === "error" && errorMessage && (
                      <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <p className="text-[13px] text-red-400">{errorMessage}</p>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="group relative w-full flex items-center justify-center gap-2 mt-8 px-6 py-4 bg-sky-500 text-white rounded-xl font-medium tracking-wide hover:bg-sky-400 transition-all duration-300 shadow-[0_0_20px_rgba(56,189,248,0.2)] hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] hover:-translate-y-[1px] disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Initializing...</span>
                        </>
                      ) : (
                        <>
                          <span>Book a Call</span>
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Footer Horizon Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-900/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#01040a] to-transparent pointer-events-none" />
    </SectionWrapper>
  );
}
