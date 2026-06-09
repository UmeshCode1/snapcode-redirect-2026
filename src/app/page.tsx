"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { eventData } from "@/data/event";
import {
  Calendar,
  MapPin,
  Ticket,
  Instagram,
  Github,
  Mail,
  Phone,
  Share2,
  Check,
  Sparkles,
  ArrowRight,
  Trophy,
  Code2,
  BrainCircuit,
  Rocket,
  Palette,
  Users,
  Target,
  Clock,
  Award,
  ShieldCheck,
  X,
  Play
} from "lucide-react";

const INITIAL_TIME = 5;

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const hoverScale = {
  hover: { scale: 1.05, transition: { type: "spring", stiffness: 300, damping: 10 } },
  tap: { scale: 0.95 }
};

// Map string icon names to Lucide components safely
const IconMap: Record<string, any> = {
  BrainCircuit,
  Code2,
  Sparkles,
  Rocket,
  Palette,
  Users,
  Trophy,
  Target
};

export default function Home() {
  const prefersReducedMotion = useReducedMotion();
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [isActive, setIsActive] = useState(true);
  const [isCancelled, setIsCancelled] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const [typingIndex, setTypingIndex] = useState(0);
  const typingWords = ["Build.", "Design.", "Deploy.", "Win."];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Typing effect
  useEffect(() => {
    if (!mounted) return;
    const typingInterval = setInterval(() => {
      setTypingIndex((prev) => (prev + 1) % (typingWords.length + 1));
    }, 800);
    return () => clearInterval(typingInterval);
  }, [mounted, typingWords.length]);

  // Handle countdown logic
  useEffect(() => {
    if (!mounted || isCancelled || !isActive) return;
    
    if (timeLeft <= 0) {
      if (!isRedirecting) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsRedirecting(true);
        window.location.href = eventData.registrationUrl;
      }
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, isActive, isCancelled, isRedirecting, mounted]);

  const handleProceed = () => {
    setIsRedirecting(true);
    window.location.href = eventData.registrationUrl;
  };

  const cancelRedirect = () => {
    setIsCancelled(true);
    setIsActive(false);
  };

  const handleShare = async () => {
    const shareData = {
      title: eventData.title,
      text: `${eventData.title} - ${eventData.subtitle}. Fee: ${eventData.fee}. Build and win!`,
      url: typeof window !== "undefined" ? window.location.origin : "",
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url || "https://snapcode.aimlcluboct.in");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  const animProps = prefersReducedMotion ? {} : { variants: fadeInUp };

  return (
    <div className="relative min-h-screen w-full bg-grid-pattern pb-16 pt-6 px-4 md:px-8 flex flex-col font-sans overflow-x-hidden">
      
      {/* 1. Header & Hero Section */}
      <header className="w-full max-w-6xl mx-auto flex items-center justify-between mb-8 relative z-20">
        <Image
          src="/assets/logo-college.png"
          alt="Oriental College of Technology Bhopal Logo"
          width={150}
          height={45}
          priority
          className="h-10 w-auto object-contain brightness-110"
        />
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-block text-xs font-semibold uppercase tracking-widest text-slate-400 font-space text-right">
            {eventData.badge}
          </span>
          <Image
            src="/assets/logo-club.png"
            alt="AI & ML Club OCT Logo"
            width={48}
            height={48}
            priority
            className="h-11 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]"
          />
        </div>
      </header>

      <main className="w-full max-w-6xl mx-auto flex-1 flex flex-col gap-16 relative z-10">
        
        {/* Floating CSS Particles (Lightweight) */}
        {!prefersReducedMotion && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className={`absolute rounded-full bg-emerald-500/20 blur-xl animate-float`}
                style={{
                  width: Math.random() * 100 + 50 + 'px',
                  height: Math.random() * 100 + 50 + 'px',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                  animationDelay: `${i * -2}s`,
                  animationDuration: `${Math.random() * 5 + 5}s`
                }}
              />
            ))}
          </div>
        )}

        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center gap-6 mt-4"
        >
          <motion.div {...animProps} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Sparkles className="h-4 w-4 animate-pulse" />
            Frontend Design Challenge
          </motion.div>

          <motion.h1 {...animProps} className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tight leading-tight">
            <span className="bg-gradient-to-br from-emerald-400 via-cyan-400 to-violet-500 bg-clip-text text-transparent drop-shadow-sm glow-text-emerald">
              {eventData.title}
            </span>
          </motion.h1>

          <motion.p {...animProps} className="text-xl sm:text-2xl font-bold text-slate-200 leading-tight font-space">
            {eventData.subtitle}
          </motion.p>
          
          <motion.div {...animProps} className="h-10 mt-2 flex justify-center items-center gap-3 text-2xl md:text-3xl font-black text-emerald-400 font-space tracking-wider">
            {typingWords.map((word, i) => (
              <span key={i} className={`transition-opacity duration-300 ${i < typingIndex ? 'opacity-100' : 'opacity-20'}`}>
                {word}
              </span>
            ))}
            <motion.span 
              animate={{ opacity: [0, 1, 0] }} 
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-3 h-8 bg-emerald-400 ml-1"
            />
          </motion.div>

          <motion.div {...animProps} className="mt-6 flex flex-col items-center">
            <button
              onClick={handleProceed}
              className="group relative flex items-center justify-center gap-2 bg-emerald-500 text-slate-950 font-black text-lg py-4 px-10 rounded-full shadow-[0_0_30px_rgba(16,185,129,0.5)] cursor-pointer hover:bg-emerald-400 transition-all overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-white/20 animate-pulse-slow"></div>
              <span className="relative z-10 flex items-center gap-2">
                Register Now
                <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </motion.div>
        </motion.section>

        {/* 2. Countdown / Redirect Notice */}
        <AnimatePresence>
          {!isCancelled && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, overflow: "hidden" }}
              className="max-w-xl mx-auto w-full"
            >
              <div className="glass-panel rounded-2xl p-4 md:p-6 border border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.1)] flex flex-col items-center text-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center w-10 h-10 bg-slate-800 rounded-full border-2 border-amber-400 text-amber-400 font-bold text-lg font-space">
                    {timeLeft > 0 ? timeLeft : <Sparkles className="h-5 w-5 animate-spin" />}
                  </div>
                  <h3 className="text-slate-200 font-semibold text-sm md:text-base">
                    {isRedirecting ? "Redirecting to registration..." : `You will be redirected to registration in ${timeLeft} seconds.`}
                  </h3>
                </div>
                <div className="flex gap-3 w-full">
                  <button
                    onClick={handleProceed}
                    className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2.5 rounded-xl transition-colors text-sm"
                  >
                    Register Now
                  </button>
                  <button
                    onClick={cancelRedirect}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 font-bold py-2.5 rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
                  >
                    <X className="h-4 w-4" />
                    Stay on This Page
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3. Stats Strip */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="w-full flex flex-wrap justify-center gap-3 md:gap-6 py-6 border-y border-slate-800/60 bg-slate-900/30"
        >
          {[
            { icon: Clock, text: "100 Minutes" },
            { icon: Ticket, text: "₹30 Registration" },
            { icon: ShieldCheck, text: "Open to All OGI Students" },
            { icon: Trophy, text: "3 Winners" },
            { icon: Award, text: "E-Certificate" }
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-2 text-slate-300 font-semibold text-sm">
              <stat.icon className="h-4 w-4 text-emerald-400" />
              {stat.text}
            </div>
          ))}
        </motion.div>

        {/* 4. Event Details */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="glass-card rounded-2xl p-6 flex items-start gap-4 border border-white/5">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 shrink-0">
              <Calendar className="h-6 w-6" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-space">When</span>
              <p className="text-base font-bold text-slate-100">{eventData.date}</p>
              <p className="text-sm text-emerald-400 font-semibold">{eventData.time}</p>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-6 flex items-start gap-4 border border-white/5">
            <div className="h-12 w-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20 shrink-0">
              <MapPin className="h-6 w-6" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-space">Where</span>
              <p className="text-base font-bold text-slate-100">{eventData.venue}</p>
              <p className="text-sm text-cyan-400 font-semibold">{eventData.venueDetails}</p>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-6 flex items-start gap-4 border border-white/5">
            <div className="h-12 w-12 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 border border-violet-500/20 shrink-0">
              <Ticket className="h-6 w-6" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-space">Entry</span>
              <p className="text-base font-bold text-slate-100">Fee: <span className="text-violet-400">{eventData.fee}</span></p>
              <p className="text-sm text-slate-300 font-medium">{eventData.eligibility}</p>
            </div>
          </div>
        </motion.section>

        {/* 5. Challenge Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel rounded-3xl p-8 border border-cyan-500/20 relative overflow-hidden"
        >
          <h2 className="text-3xl font-bold text-white mb-4">The Challenge</h2>
          <p className="text-slate-300 text-lg mb-8 max-w-3xl">
            Participants must design, build, and deploy a complete website using AI-powered Vibe Coding tools. A <span className="text-cyan-400 font-bold">surprise problem statement</span> will be revealed during the event.
          </p>

          <div className="mb-10">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Development Workflow</h3>
            <div className="flex flex-wrap items-center gap-2 md:gap-4 font-space font-bold text-sm md:text-base">
              {eventData.workflow?.map((step, idx) => (
                <div key={idx} className="flex items-center gap-2 md:gap-4">
                  <div className="px-4 py-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {step}
                  </div>
                  {idx < eventData.workflow!.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-slate-500" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Supported Tools</h3>
            <div className="flex flex-wrap gap-3">
              {eventData.tools?.map((tool, idx) => (
                <span key={idx} className="px-4 py-2 rounded-xl bg-slate-800/80 text-slate-200 text-sm font-semibold border border-slate-700">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </motion.section>

        {/* 6. Prizes Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Prize Pool</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {eventData.prizes.map((prize, idx) => {
              const isFirst = idx === 0;
              return (
                <motion.div 
                  key={idx}
                  variants={prefersReducedMotion ? {} : hoverScale}
                  whileHover="hover"
                  className={`glass-card rounded-2xl p-8 flex flex-col items-center text-center border ${isFirst ? 'border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.15)]' : 'border-slate-700/50'}`}
                >
                  <span className="text-5xl mb-4">{prize.icon}</span>
                  <h3 className={`text-xl font-bold mb-2 ${isFirst ? 'text-amber-400' : 'text-slate-200'}`}>
                    {prize.position}
                  </h3>
                  <div className="flex flex-col gap-1 text-slate-300 font-medium">
                    {prize.reward.split(' + ').map((item, i) => (
                      <span key={i} className="flex items-center justify-center gap-1.5">
                        <Check className="h-3 w-3 text-emerald-400" /> {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="glass-panel rounded-2xl p-6 text-center border border-emerald-500/30 glow-emerald">
            <h3 className="text-lg font-bold text-emerald-400 mb-2 flex items-center justify-center gap-2">
              <Award className="h-5 w-5" /> Participation Certificate
            </h3>
            <p className="text-slate-300 font-medium">{eventData.participationCertificate}</p>
          </div>
        </motion.section>

        {/* 7. Why Participate Cards */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Why Participate?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {eventData.benefits.map((benefit: any, idx: number) => {
              const IconComp = IconMap[benefit.icon] || Sparkles;
              return (
                <motion.div 
                  key={idx}
                  variants={prefersReducedMotion ? {} : hoverScale}
                  whileHover="hover"
                  className="glass-card p-5 rounded-2xl border border-white/5 flex flex-col items-start gap-3"
                >
                  <div className="p-2.5 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <h3 className="text-slate-200 font-bold leading-snug">{benefit.title}</h3>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* 8. Registration CTA */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-panel rounded-3xl p-10 md:p-16 text-center border border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.1)] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none"></div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Ready to Build the Future?</h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Secure your spot in the ultimate Vibe Coding challenge. Show off your prompt engineering and design skills to win amazing prizes.
          </p>
          <button
            onClick={handleProceed}
            className="group inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xl py-4 px-10 rounded-full shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all"
          >
            Register Now
            <ArrowRight className="h-6 w-6 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.section>

      </main>

      {/* 9. Footer */}
      <footer className="w-full max-w-6xl mx-auto mt-20 pt-8 border-t border-slate-800 flex flex-col md:flex-row gap-8 items-center justify-between relative z-10 pb-8">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <h4 className="text-lg font-bold text-white">{eventData.contact.club}</h4>
          <p className="text-slate-400 text-sm">{eventData.contact.college}</p>
        </div>

        <div className="flex flex-col gap-4 items-center md:items-end">
          <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-slate-300">
            <a href={`tel:${eventData.contact.phone}`} className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
              <Phone className="h-4 w-4 text-emerald-400" /> {eventData.contact.phone}
            </a>
            <span className="hidden sm:inline text-slate-700">|</span>
            <a href={`mailto:${eventData.contact.email}`} className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
              <Mail className="h-4 w-4 text-cyan-400" /> Email Us
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-all cursor-pointer mr-2"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Share2 className="h-4 w-4 text-emerald-400" />}
              {copied ? "Copied!" : "Share"}
            </button>
            <a href={eventData.contact.instagram} target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-pink-500 border border-slate-700">
              <Instagram className="h-4 w-4" />
            </a>
            <a href={eventData.contact.github} target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white border border-slate-700">
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Ensure AnimatePresence is available for dynamic exit animations
function AnimatePresence({ children }: { children: React.ReactNode }) {
  const ReactAnimatePresence = require("framer-motion").AnimatePresence;
  return <ReactAnimatePresence>{children}</ReactAnimatePresence>;
}
