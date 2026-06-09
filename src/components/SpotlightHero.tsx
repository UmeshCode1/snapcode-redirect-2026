"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { eventData } from "@/data/event";
import { ArrowRight, Sparkles } from "lucide-react";

const words = ["Create", "Innovate", "Build", "Deploy", "Win"];

export default function SpotlightHero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-16 px-4 z-10">
      
      {/* Minimal Header Spacer */}
      <div className="h-6"></div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center max-w-4xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 mb-8 backdrop-blur-md">
          <Sparkles className="h-4 w-4" />
          <span className="text-sm font-semibold tracking-wide uppercase">{eventData.badge}</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">SNAPCODE</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 ml-4">2026</span>
        </h1>

        <p className="text-xl md:text-3xl font-medium text-slate-300 mb-8">
          Frontend Design Challenge using Vibe Coding
        </p>

        <div className="h-16 mb-12 flex items-center justify-center text-3xl md:text-5xl font-bold text-violet-400">
          <AnimatePresence mode="wait">
            <motion.span
              key={words[index]}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="glow-text-violet"
            >
              {words[index]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Premium CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={eventData.registrationUrl} className="relative group animated-border rounded-full w-full sm:w-auto">
            <button className="relative w-full sm:w-auto px-8 py-4 bg-slate-900 rounded-full font-bold text-lg text-white transition-all hover:bg-slate-800 flex items-center justify-center gap-2 z-10 border border-transparent">
              Register Now <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </a>
          <a href="#overview" className="px-8 py-4 rounded-full font-bold text-lg text-slate-300 hover:text-white hover:bg-white/5 border border-slate-700 transition-all w-full sm:w-auto">
            Explore Event
          </a>
        </div>
      </motion.div>
    </section>
  );
}
