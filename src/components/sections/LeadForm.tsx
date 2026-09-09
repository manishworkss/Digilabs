"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

import { FORM_SECTION } from "@/lib/constants";
import { leadFormSchema, type LeadFormData } from "@/lib/schema";
import { trackLeadFormSubmit } from "@/lib/analytics";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";

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
      // We use mode: "no-cors" and Content-Type: "text/plain" to bypass CORS preflight
      // Google Apps Script requires this unless you implement complex OPTIONS handling.
      await fetch(endpoint, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(data),
      });

      // With no-cors, the response is opaque, meaning we can't read response.ok.
      // If the fetch doesn't throw a network error, we assume the payload was sent successfully.

      // Track successful submission
      trackLeadFormSubmit();

      setStatus("success");
      reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <SectionWrapper id="contact" className="py-24 md:py-32 relative bg-nova-surface border-t border-nova-border/50">
      <ScrollReveal className="max-w-xl mx-auto w-full">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] text-nova-accent uppercase mb-4">
            {FORM_SECTION.eyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-nova-text">
            {FORM_SECTION.heading}
          </h2>
        </div>

        <div className="relative bg-nova-bg border border-nova-border rounded-2xl p-6 md:p-8 shadow-2xl">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center text-center py-12"
              >
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border border-green-500/20">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-medium text-nova-text mb-2">
                  {FORM_SECTION.successTitle}
                </h3>
                <p className="text-nova-textMuted">
                  {FORM_SECTION.successMessage}
                </p>
                <Button
                  variant="secondary"
                  className="mt-8"
                  onClick={() => setStatus("idle")}
                >
                  Send another message
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
                noValidate
              >
                {/* Form Fields Container */}
                <div className="space-y-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-sm font-medium text-nova-textMuted">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Jane Doe"
                      disabled={status === "loading"}
                      className={`w-full px-4 py-3 bg-nova-surface border rounded-xl text-nova-text placeholder:text-nova-textMuted/50 outline-none transition-colors focus:ring-1 focus:ring-nova-accent focus:border-nova-accent ${
                        errors.name ? "border-red-500/50 focus:ring-red-500 focus:border-red-500" : "border-nova-border hover:border-nova-textMuted/30"
                      }`}
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-sm font-medium text-nova-textMuted">
                      Work Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="jane@company.com"
                      disabled={status === "loading"}
                      className={`w-full px-4 py-3 bg-nova-surface border rounded-xl text-nova-text placeholder:text-nova-textMuted/50 outline-none transition-colors focus:ring-1 focus:ring-nova-accent focus:border-nova-accent ${
                        errors.email ? "border-red-500/50 focus:ring-red-500 focus:border-red-500" : "border-nova-border hover:border-nova-textMuted/30"
                      }`}
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Company */}
                  <div className="space-y-1.5">
                    <label htmlFor="company" className="text-sm font-medium text-nova-textMuted">
                      Company
                    </label>
                    <input
                      id="company"
                      type="text"
                      placeholder="Acme Corp"
                      disabled={status === "loading"}
                      className={`w-full px-4 py-3 bg-nova-surface border rounded-xl text-nova-text placeholder:text-nova-textMuted/50 outline-none transition-colors focus:ring-1 focus:ring-nova-accent focus:border-nova-accent ${
                        errors.company ? "border-red-500/50 focus:ring-red-500 focus:border-red-500" : "border-nova-border hover:border-nova-textMuted/30"
                      }`}
                      {...register("company")}
                    />
                    {errors.company && (
                      <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.company.message}
                      </p>
                    )}
                  </div>

                  {/* Budget */}
                  <div className="space-y-1.5">
                    <label htmlFor="budget" className="text-sm font-medium text-nova-textMuted">
                      Monthly Ad Budget
                    </label>
                    <div className="relative">
                      <select
                        id="budget"
                        disabled={status === "loading"}
                        className={`w-full px-4 py-3 bg-nova-surface border rounded-xl text-nova-text outline-none transition-colors focus:ring-1 focus:ring-nova-accent focus:border-nova-accent appearance-none cursor-pointer ${
                          errors.budget ? "border-red-500/50 focus:ring-red-500 focus:border-red-500" : "border-nova-border hover:border-nova-textMuted/30"
                        }`}
                        {...register("budget")}
                        defaultValue=""
                      >
                        <option value="" disabled className="text-nova-textMuted/50">Select budget range...</option>
                        <option value="under_10k">Under $10,000</option>
                        <option value="10k_to_50k">$10,000 - $50,000</option>
                        <option value="50k_to_100k">$50,000 - $100,000</option>
                        <option value="over_100k">$100,000+</option>
                      </select>
                      {/* Custom dropdown arrow to match theme */}
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                    {errors.budget && (
                      <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.budget.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* General Error Message */}
                {status === "error" && errorMessage && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-400">{errorMessage}</p>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full mt-6"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    FORM_SECTION.submitLabel
                  )}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}
