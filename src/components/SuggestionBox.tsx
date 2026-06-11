"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function SuggestionBox() {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="w-full max-w-2xl mx-auto border border-zinc-900 bg-zinc-950/40 rounded-2xl p-8 sm:p-12 shadow-2xl relative overflow-hidden"
    >
      {/* Ambient Ring Glow */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
      
      <div className="flex flex-col items-center text-center relative z-10">
        {/* Logo with Ambient Glow */}
        <motion.div 
          variants={itemVariants}
          className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-850 flex items-center justify-center p-2.5 mb-5 shadow-lg relative group"
        >
          <div className="absolute inset-0 rounded-full bg-emerald-500/15 opacity-0 group-hover:opacity-100 blur transition-opacity duration-500"></div>
          <Image
            src="/assets/logo-club.png"
            alt="AIML Club Logo"
            width={40}
            height={40}
            className="w-full h-auto object-contain rounded-full relative z-10"
          />
        </motion.div>
        
        {/* Club Badge */}
        <motion.span 
          variants={itemVariants}
          className="px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-450 text-[10px] font-bold uppercase tracking-wider mb-4"
        >
          AI & Machine Learning Club - OCT
        </motion.span>
        
        {/* Motto */}
        <motion.span 
          variants={itemVariants}
          className="text-[10px] sm:text-xs text-zinc-500 font-bold uppercase tracking-[0.2em] block mb-5 font-mono"
        >
          INNOVATE. IMPLEMENT. INSPIRE.
        </motion.span>
        
        {/* Title */}
        <motion.h2 
          variants={itemVariants}
          className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4"
        >
          Your Voice Matters
        </motion.h2>
        
        {/* Tagline */}
        <motion.p 
          variants={itemVariants}
          className="text-base font-semibold text-zinc-350 max-w-lg mb-3 leading-relaxed"
        >
          Let&apos;s build a better college experience together.
        </motion.p>
        
        {/* Description */}
        <motion.p 
          variants={itemVariants}
          className="text-sm text-zinc-400 max-w-lg leading-relaxed mb-10"
        >
          Share your ideas, feedback, workshop interests, event concepts, and innovative thoughts to shape the future of our community.
        </motion.p>
        
        {/* Link Button */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="w-fit"
        >
          <a 
            href="https://voice.aimlcluboct.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-zinc-950 border border-zinc-850 hover:border-zinc-700 text-white font-bold text-sm shadow-xl transition-colors cursor-pointer group"
          >
            ✨ Share Your Voice 
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <ArrowRight className="h-4 w-4 text-emerald-500" />
            </motion.span>
          </a>
        </motion.div>
        
        {/* Bottom Subtext */}
        <motion.span 
          variants={itemVariants}
          className="text-[11px] text-zinc-500 mt-10 block max-w-md leading-relaxed"
        >
          Whether you&apos;re a student, faculty member, alumnus, mentor, or innovator — your perspective matters here.
        </motion.span>
      </div>
    </motion.div>
  );
}
