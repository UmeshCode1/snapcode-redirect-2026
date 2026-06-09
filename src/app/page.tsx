"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { eventData } from "@/data/event";
import {
  Calendar,
  MapPin,
  Ticket,
  ExternalLink,
  Pause,
  Play,
  Instagram,
  Github,
  Mail,
  Phone,
  Share2,
  Check,
  Sparkles,
  ArrowRight,
  Info,
  RefreshCw,
  Trophy,
  Zap,
  Code2,
  BrainCircuit,
  Rocket
} from "lucide-react";

const INITIAL_TIME = 5; // Reduced to 5 seconds as requested

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const hoverScale = {
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95 }
};

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [isActive, setIsActive] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [typingText, setTypingText] = useState("");
  
  const fullText = "Build. Design. Deploy. Win.";

  // Set mounted flag to avoid hydration differences
  useEffect(() => {
    setMounted(true);
  }, []);

  // Typing effect
  useEffect(() => {
    if (!mounted) return;
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypingText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
    return () => clearInterval(typingInterval);
  }, [mounted, fullText]);

  // Handle countdown logic
  useEffect(() => {
    if (!mounted) return;
    if (timeLeft <= 0) {
      if (isActive && !isRedirecting) {
        setIsRedirecting(true);
        window.location.href = eventData.registrationUrl;
      }
      return;
    }

    if (!isActive) return;

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, isActive, isRedirecting, mounted]);

  // Force instant redirection
  const handleProceed = () => {
    setIsRedirecting(true);
    window.location.href = eventData.registrationUrl;
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
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

  // Circular progress calculations
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = mounted
    ? circumference - (timeLeft / INITIAL_TIME) * circumference
    : 0;

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-grid-pattern pb-16 pt-6 px-4 md:px-8 flex flex-col justify-between overflow-hidden">
      {/* Decorative Glow Elements & Particles */}
      <div className="fixed top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none animate-pulse-slow"></div>
      <div className="fixed bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-violet-600/20 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      <div className="fixed top-3/4 left-3/4 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

      {/* Header with logos */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-6xl mx-auto glass-panel rounded-2xl py-4 px-6 md:px-8 flex items-center justify-between shadow-lg mb-12 relative z-10 border border-white/10"
      >
        <div className="flex items-center gap-3">
          <Image
            src="/assets/logo-college.png"
            alt="Oriental College of Technology Bhopal Logo"
            width={150}
            height={45}
            priority
            className="h-10 w-auto object-contain brightness-110"
          />
        </div>
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
      </motion.header>

      {/* Main Body content */}
      <main className="w-full max-w-6xl mx-auto flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-10 items-center relative z-10">
        {/* Left Side: Event Details Header */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-6"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Sparkles className="h-4 w-4 animate-pulse text-cyan-400" />
            Frontend Design Challenge
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight">
            <span className="bg-gradient-to-br from-emerald-400 via-cyan-400 to-violet-500 bg-clip-text text-transparent drop-shadow-sm glow-text-emerald">
              {eventData.title}
            </span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-xl sm:text-2xl font-bold text-slate-200 leading-tight font-space">
            {eventData.subtitle}
          </motion.p>
          
          <motion.div variants={fadeInUp} className="h-8">
             <p className="text-emerald-400 font-space text-lg font-bold tracking-wider">
               {typingText}
               <motion.span 
                 animate={{ opacity: [0, 1, 0] }} 
                 transition={{ repeat: Infinity, duration: 0.8 }}
                 className="inline-block w-2 h-5 bg-emerald-400 ml-1 translate-y-1"
               />
             </p>
          </motion.div>

          <motion.p variants={fadeInUp} className="text-slate-400 max-w-xl text-base sm:text-lg leading-relaxed">
            {eventData.description}
          </motion.p>

          {/* Action tags */}
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 justify-center lg:justify-start pt-2">
            <span className="px-4 py-1.5 rounded-lg text-sm font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
              ⚡ UI/UX design
            </span>
            <span className="px-4 py-1.5 rounded-lg text-sm font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.1)]">
              💻 Vibe Coding
            </span>
            <span className="px-4 py-1.5 rounded-lg text-sm font-semibold bg-violet-500/10 text-violet-300 border border-violet-500/30 shadow-[0_0_10px_rgba(139,92,246,0.1)]">
              🏆 Prize Pool
            </span>
          </motion.div>
        </motion.section>

        {/* Right Side: Redirect Widget */}
        <motion.section 
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100 }}
          className="lg:col-span-5 w-full max-w-md"
        >
          <div className="glass-panel rounded-3xl p-6 md:p-8 flex flex-col gap-6 shadow-[0_0_40px_rgba(16,185,129,0.15)] border border-emerald-500/20 relative overflow-hidden group">
            {/* Background spotlight */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/20 transition-colors duration-500"></div>

            {/* Title / Status */}
            <div className="flex flex-col gap-1.5 items-center text-center relative z-10">
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400 font-space">
                {isRedirecting ? "Connecting to form..." : "Registration Portal"}
              </span>
              <h3 className="text-xl font-bold text-white">
                {isRedirecting ? "Redirecting Now" : `Redirecting in ${timeLeft}s...`}
              </h3>
            </div>

            {/* Circular Countdown Progress */}
            <div className="flex justify-center items-center py-4 relative z-10">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  className="stroke-slate-800/50"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  className="stroke-emerald-400 countdown-ring"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.5))' }}
                />
              </svg>

              {/* Central text overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center font-space">
                {timeLeft > 0 ? (
                  <>
                    <motion.span 
                      key={timeLeft}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-4xl font-bold text-white tracking-tighter"
                    >
                      {timeLeft}
                    </motion.span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mt-1">
                      secs
                    </span>
                  </>
                ) : (
                  <Sparkles className="h-10 w-10 text-emerald-400 animate-spin" />
                )}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col gap-3 relative z-10">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleProceed}
                disabled={isRedirecting}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold py-4 px-6 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)] group cursor-pointer border-none"
              >
                {isRedirecting ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    Register Now
                    <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(30, 41, 59, 0.8)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={toggleTimer}
                  disabled={timeLeft <= 0}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-700 bg-slate-900/50 text-slate-200 text-sm font-semibold transition-all cursor-pointer"
                >
                  {isActive ? (
                    <>
                      <Pause className="h-4 w-4 text-amber-400" />
                      Cancel Redirect
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 text-emerald-400" />
                      Resume Timer
                    </>
                  )}
                </motion.button>
              </div>
            </div>
            
            {!isActive && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-xs text-amber-400 text-center font-medium mt-[-5px]"
              >
                Redirect cancelled. Take your time to explore the event details!
              </motion.p>
            )}
          </div>
        </motion.section>
      </main>

      {/* Grid of details */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl mx-auto mt-24 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Date & Time */}
          <motion.div variants={hoverScale} whileHover="hover" whileTap="tap" className="glass-card rounded-2xl p-6 flex items-start gap-4 border border-white/5 hover:border-emerald-500/30">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <Calendar className="h-6 w-6" />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-space">
                When
              </span>
              <p className="text-base font-bold text-slate-100">
                {eventData.date}
              </p>
              <p className="text-sm text-emerald-400 font-semibold">
                {eventData.time}
              </p>
            </div>
          </motion.div>

          {/* Card 2: Venue */}
          <motion.div variants={hoverScale} whileHover="hover" whileTap="tap" className="glass-card rounded-2xl p-6 flex items-start gap-4 border border-white/5 hover:border-cyan-500/30">
            <div className="h-12 w-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20 shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              <MapPin className="h-6 w-6" />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-space">
                Where
              </span>
              <p className="text-base font-bold text-slate-100">
                {eventData.venue}
              </p>
              <p className="text-sm text-cyan-400 font-semibold">
                {eventData.venueDetails}
              </p>
            </div>
          </motion.div>

          {/* Card 3: Fee & Eligibility */}
          <motion.div variants={hoverScale} whileHover="hover" whileTap="tap" className="glass-card rounded-2xl p-6 flex items-start gap-4 border border-white/5 hover:border-violet-500/30">
            <div className="h-12 w-12 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 border border-violet-500/20 shrink-0 shadow-[0_0_15px_rgba(139,92,246,0.15)]">
              <Ticket className="h-6 w-6" />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-space">
                Entry
              </span>
              <p className="text-base font-bold text-slate-100">
                Fee: <span className="text-violet-400 font-space">{eventData.fee}</span>
              </p>
              <p className="text-sm text-slate-300 font-medium">
                {eventData.eligibility}
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Challenge Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl mx-auto mt-24 relative z-10"
      >
        <div className="glass-panel rounded-3xl p-8 md:p-12 border border-slate-700/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
              <BrainCircuit className="h-6 w-6" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">The Challenge</h2>
          </div>
          
          <p className="text-slate-300 text-lg mb-8 max-w-3xl leading-relaxed">
            Participants must design, build, and deploy a complete website using AI-powered Vibe Coding tools. A <span className="text-cyan-400 font-bold">surprise problem statement</span> will be revealed during the event.
          </p>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1 w-full glass-card p-6 rounded-2xl border border-white/5">
              <h3 className="text-emerald-400 font-space font-bold mb-4 flex items-center gap-2">
                <Code2 className="h-5 w-5" /> Allowed Platforms
              </h3>
              <div className="flex flex-wrap gap-2">
                {["ChatGPT", "Cursor", "Bolt", "Claude", "Gemini", "Lovable", "Windsurf", "Other AI tools"].map((tool, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-md bg-slate-800/80 text-slate-200 text-sm border border-slate-700">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex-1 w-full glass-card p-6 rounded-2xl border border-white/5 flex flex-col justify-center items-center text-center h-full min-h-[140px]">
              <h3 className="text-slate-400 font-space font-bold mb-2 uppercase tracking-widest text-sm">Time Limit</h3>
              <div className="text-5xl font-black bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                100
              </div>
              <p className="text-amber-400/80 font-bold tracking-widest uppercase mt-1">Minutes</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Prizes & Why Participate */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10"
      >
        {/* Prizes */}
        <div className="glass-panel rounded-3xl p-8 border border-amber-500/20 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-amber-500/5 blur-3xl pointer-events-none"></div>
          
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
              <Trophy className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">Prize Pool</h2>
          </div>

          <div className="flex flex-col gap-4">
            {eventData.prizes.map((prize, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 border border-slate-700/50"
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{prize.icon}</span>
                  <span className="font-bold text-slate-200">{prize.position}</span>
                </div>
                <span className="text-amber-400 font-semibold text-sm">{prize.reward}</span>
              </motion.div>
            ))}
            <div className="mt-2 text-center p-3 rounded-xl bg-slate-800/30 border border-slate-700/30">
              <p className="text-slate-300 text-sm">{eventData.participationCertificate}</p>
            </div>
          </div>
        </div>

        {/* Why Participate */}
        <div className="glass-panel rounded-3xl p-8 border border-violet-500/20 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-violet-500/5 blur-3xl pointer-events-none"></div>
          
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-violet-500/20 text-violet-400">
              <Rocket className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">Why Participate?</h2>
          </div>

          <ul className="flex flex-col gap-5">
            {eventData.benefits.map((benefit, idx) => (
              <motion.li 
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-3"
              >
                <div className="mt-1 p-1 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0">
                  <Check className="h-3 w-3" />
                </div>
                <span className="text-slate-200 font-medium leading-tight">{benefit}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* Footer / Contacts */}
      <footer className="w-full max-w-6xl mx-auto mt-24 pt-8 border-t border-slate-800 flex flex-col md:flex-row gap-8 items-center justify-between relative z-10 pb-8">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <h4 className="text-lg font-bold text-white">
            {eventData.contact.club}
          </h4>
          <p className="text-slate-400 text-sm">
            {eventData.contact.college}
          </p>
          <p className="text-emerald-400 font-space text-xs tracking-widest uppercase mt-1">
            {eventData.tagline}
          </p>
        </div>

        <div className="flex flex-col gap-4 items-center md:items-end">
          <div className="flex items-center gap-4 text-sm text-slate-300">
            <a href={`tel:${eventData.contact.phone}`} className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
              <Phone className="h-4 w-4 text-emerald-400" />
              {eventData.contact.phone}
            </a>
            <span className="text-slate-700">|</span>
            <a href={`mailto:${eventData.contact.email}`} className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
              <Mail className="h-4 w-4 text-cyan-400" />
              Email Us
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-all cursor-pointer mr-2"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Share2 className="h-4 w-4 text-emerald-400" />}
              {copied ? "Copied!" : "Share Event"}
            </button>
            <a href={eventData.contact.instagram} target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-pink-500 hover:bg-slate-700 transition-all border border-slate-700">
              <Instagram className="h-4.5 w-4.5" />
            </a>
            <a href={eventData.contact.github} target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all border border-slate-700">
              <Github className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
