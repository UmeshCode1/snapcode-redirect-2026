"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { eventData } from "@/data/event";
import { ArrowRight, Calendar, MapPin, Ticket } from "lucide-react";

const words = ["Create", "Innovate", "Build", "Deploy", "Win"];

export default function SpotlightHero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center pt-32 pb-16 px-6 z-10">
      <div className="text-center max-w-4xl mx-auto flex flex-col items-center">
        {/* Organization / Club Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-950 text-zinc-400 text-xs font-medium tracking-wide uppercase mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          {eventData.badge}
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight text-white leading-[1.05] mb-6"
        >
          SNAPCODE <span className="text-zinc-500">2026</span>
        </motion.h1>

        {/* Subtitle / Value Prop */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl text-zinc-400 font-medium max-w-2xl leading-relaxed mb-8"
        >
          The ultimate frontend design challenge. Build and deploy a complete website in just 100 minutes using AI-powered Vibe Coding.
        </motion.p>

        {/* Muted Rotating Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="h-10 mb-10 flex items-center justify-center text-sm font-semibold tracking-wider text-emerald-400 uppercase gap-2"
        >
          <span>Engineered to</span>
          <div className="overflow-hidden h-6 w-24 relative inline-block text-left">
            <AnimatePresence mode="wait">
              <motion.span
                key={words[index]}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-0 top-0 text-white font-bold"
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Horizontal Meta Info Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full max-w-3xl border border-zinc-800 bg-zinc-950/40 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-around gap-4 mb-12"
        >
          <div className="flex items-center gap-2.5 text-sm text-zinc-300">
            <Calendar className="h-4 w-4 text-zinc-500" />
            <span className="font-semibold">{eventData.date}</span>
          </div>
          <span className="hidden sm:inline-block w-px h-6 bg-zinc-800"></span>
          <div className="flex items-center gap-2.5 text-sm text-zinc-300">
            <MapPin className="h-4 w-4 text-zinc-500" />
            <span className="font-semibold">{eventData.venue}</span>
          </div>
          <span className="hidden sm:inline-block w-px h-6 bg-zinc-800"></span>
          <div className="flex items-center gap-2.5 text-sm text-zinc-300">
            <Ticket className="h-4 w-4 text-zinc-500" />
            <span className="font-semibold">{eventData.fee}</span>
          </div>
        </motion.div>

        {/* Premium Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <a
            href={eventData.registrationUrl}
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-zinc-100 hover:bg-white text-black font-bold text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            Register Now
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#workflow"
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg border border-zinc-800 bg-zinc-950/20 hover:bg-zinc-900/50 text-zinc-300 hover:text-white font-bold text-sm transition-all active:scale-[0.98] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            Explore Challenge
          </a>
        </motion.div>
      </div>
    </section>
  );
}
