"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { eventData } from "@/data/event";
import {
  Calendar,
  MapPin,
  Ticket,
  Instagram,
  Github,
  Mail,
  Sparkles,
  Trophy,
  Code2,
  BrainCircuit,
  Rocket,
  Palette,
  Users,
  Target,
  Award,
  Clock,
  ArrowRight,
  X,
  Linkedin,
  Globe,
  MessageCircle
} from "lucide-react";
import Navbar from "@/components/Navbar";
import SpotlightHero from "@/components/SpotlightHero";
import Modals from "@/components/Modals";
import AnimatedCounter from "@/components/AnimatedCounter";
import SuggestionBox from "@/components/SuggestionBox";

const IconMap: Record<string, React.ElementType> = {
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
  const [mounted, setMounted] = useState(false);
  const [showRedirectModal, setShowRedirectModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Detect screen width to render mobile bottom-sheet vs desktop dialog
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Show registration redirect modal after 1 minute (60 seconds)
    const timer = setTimeout(() => {
      setShowRedirectModal(true);
    }, 60000);

    return () => {
      window.removeEventListener("resize", checkMobile);
      clearTimeout(timer);
    };
  }, [mounted]);

  if (!mounted) return null;

  const animationProps = (delay = 0) => {
    if (prefersReducedMotion) {
      return {
        initial: { opacity: 1 },
        animate: { opacity: 1 }
      };
    }
    return {
      initial: { opacity: 0, y: 15 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-80px" },
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay }
    };
  };

  return (
    <div className="relative min-h-screen w-full font-sans overflow-x-hidden text-zinc-200 bg-black selection:bg-zinc-800 selection:text-zinc-100">
      {/* 1-Minute Redirect Modal Pop-up (Responsive Bottom Sheet on Mobile, Centered Dialog on Desktop) */}
      <AnimatePresence>
        {showRedirectModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[110] flex bg-black/80 backdrop-blur-md ${
              isMobile ? "items-end p-0" : "items-center justify-center p-6"
            }`}
          >
            <motion.div
              initial={
                isMobile 
                  ? { y: "100%", opacity: 1 } 
                  : { scale: 0.95, y: 15, opacity: 0 }
              }
              animate={
                isMobile 
                  ? { y: 0, opacity: 1 } 
                  : { scale: 1, y: 0, opacity: 1 }
              }
              exit={
                isMobile 
                  ? { y: "100%", opacity: 1 } 
                  : { scale: 0.95, y: 15, opacity: 0 }
              }
              transition={
                isMobile
                  ? { type: "spring", damping: 30, stiffness: 300 }
                  : { type: "spring", duration: 0.5 }
              }
              className={`relative bg-zinc-950/90 border border-zinc-900 shadow-2xl backdrop-blur-xl transition-all duration-150 ${
                isMobile 
                  ? "w-full rounded-t-2xl rounded-b-none p-6 pb-10 max-w-none border-b-0" 
                  : "max-w-md w-full rounded-2xl p-8"
              }`}
              role="dialog"
              aria-modal="true"
              aria-labelledby="redirect-modal-title"
            >
              <button
                onClick={() => setShowRedirectModal(false)}
                className="absolute top-5 right-5 text-zinc-550 hover:text-zinc-300 focus-visible:ring-2 focus-visible:ring-emerald-500 rounded p-1 transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="h-4 w-4" />
              </button>
              
              <div className="flex flex-col items-center text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-950/30 border border-emerald-800/20 text-emerald-400 mb-4 animate-pulse">
                  <Ticket className="h-6 w-6 text-emerald-500" />
                </div>
                <h2 id="redirect-modal-title" className="text-2xl font-bold text-white mb-2">Ready to Register?</h2>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  You&apos;ve been exploring SNAPCODE 2026 for a minute! Secure your spot now for the frontend challenge using Vibe Coding.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowRedirectModal(false)}
                  className="w-full py-2.5 rounded-lg border border-zinc-850 hover:border-zinc-700 bg-zinc-950 text-zinc-400 hover:text-zinc-200 font-semibold text-xs transition-all active:scale-[0.98] cursor-pointer"
                >
                  Keep Browsing
                </button>
                <a
                  href={eventData.registrationUrl}
                  className="w-full py-2.5 bg-zinc-100 hover:bg-white text-black rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]"
                >
                  Register Now <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Handcrafted Subtle Dot Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none z-0"></div>

      {/* Ambient Moving Spotlight Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="ambient-orb-1"></div>
        <div className="ambient-orb-2"></div>
      </div>

      <Modals />
      <Navbar />
      <SpotlightHero />

      {/* Floating CTA */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="fixed bottom-6 right-6 z-40 hidden md:block"
      >
        <a 
          href={eventData.registrationUrl} 
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-zinc-100 hover:bg-white text-black font-bold text-xs shadow-2xl transition-all hover:scale-105 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500"
          aria-label="Register for SNAPCODE 2026"
        >
          Register Now <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </motion.div>

      <main className="w-full max-w-6xl mx-auto flex-1 flex flex-col gap-28 relative z-10 px-6 md:px-8 pb-32">
        
        {/* Stats Grid */}
        <motion.section 
          {...animationProps()}
          className="grid grid-cols-2 md:grid-cols-5 gap-px bg-zinc-900 border border-zinc-900 rounded-xl overflow-hidden"
          aria-label="Event Key Stats"
        >
          <div className="flex flex-col items-center justify-center p-6 sm:p-8 bg-black hover:bg-zinc-950/40 hover:-translate-y-[2px] transition-all duration-300 text-center">
            <Clock className="h-4 w-4 text-zinc-500 mb-3" />
            <h4 className="text-3xl font-bold tracking-tight text-white mb-1">
              <AnimatedCounter from={0} to={100} />
            </h4>
            <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">Minutes Challenge</p>
          </div>
          
          <div className="flex flex-col items-center justify-center p-6 sm:p-8 bg-black hover:bg-zinc-950/40 hover:-translate-y-[2px] transition-all duration-300 text-center">
            <Ticket className="h-4 w-4 text-zinc-500 mb-3" />
            <h4 className="text-3xl font-bold tracking-tight text-white mb-1">
              ₹<AnimatedCounter from={0} to={30} />
            </h4>
            <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">Reg Fee</p>
          </div>
          
          <div className="flex flex-col items-center justify-center p-6 sm:p-8 bg-black hover:bg-zinc-950/40 hover:-translate-y-[2px] transition-all duration-300 text-center">
            <Trophy className="h-4 w-4 text-zinc-500 mb-3" />
            <h4 className="text-3xl font-bold tracking-tight text-white mb-1">
              <AnimatedCounter from={0} to={3} />
            </h4>
            <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">Winning Positions</p>
          </div>
          
          <div className="flex flex-col items-center justify-center p-6 sm:p-8 bg-black hover:bg-zinc-950/40 hover:-translate-y-[2px] transition-all duration-300 text-center">
            <Award className="h-4 w-4 text-zinc-500 mb-3" />
            <h4 className="text-3xl font-bold tracking-tight text-white mb-1">
              <AnimatedCounter from={0} to={100} />%
            </h4>
            <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">Certificates</p>
          </div>
          
          <div className="flex flex-col items-center justify-center p-6 sm:p-8 bg-black hover:bg-zinc-950/40 hover:-translate-y-[2px] transition-all duration-300 text-center col-span-2 md:col-span-1">
            <Users className="h-4 w-4 text-zinc-500 mb-3" />
            <h4 className="text-3xl font-bold tracking-tight text-white mb-1">OGI</h4>
            <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">Eligible Students</p>
          </div>
        </motion.section>

        {/* Visual Workflow Challenge */}
        <motion.section 
          id="workflow"
          {...animationProps()}
          className="text-center scroll-mt-24"
        >
          <div className="mb-12">
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-2">Challenge Pipeline</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">The Vibe Coding Workflow</h2>
          </div>
          
          {/* Workflow Pipeline */}
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-3 md:gap-2 mb-16 max-w-4xl mx-auto">
            {eventData.workflow.map((step, idx) => (
              <div key={idx} className="flex flex-col md:flex-row items-center w-full md:w-auto">
                <div 
                  className="w-full md:w-auto px-5 py-3.5 rounded-lg bg-zinc-950 border border-zinc-900 text-sm font-semibold text-zinc-300 flex items-center justify-center gap-3 hover:border-zinc-800 transition-colors"
                >
                  <span className="flex items-center justify-center w-5 h-5 rounded bg-zinc-900 text-zinc-400 text-[10px] font-bold border border-zinc-850">
                    0{idx + 1}
                  </span>
                  <span className="tracking-wide text-zinc-200 font-mono">{step.toUpperCase()}</span>
                </div>
                {idx < eventData.workflow.length - 1 && (
                  <div className="my-2.5 md:my-0 md:mx-3 text-zinc-650 font-bold text-lg animate-pulse" aria-hidden="true">
                    <span className="block md:hidden">↓</span>
                    <span className="hidden md:block">→</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <h3 className="text-xs text-zinc-500 font-bold tracking-wider uppercase mb-5">Supported AI Tools & Environments</h3>
          <div className="flex flex-wrap justify-center gap-2.5 max-w-2xl mx-auto">
            {eventData.tools.map((tool, idx) => (
              <span 
                key={idx}
                className="px-3 py-1.5 rounded-md bg-zinc-950 border border-zinc-900 text-zinc-400 font-medium text-xs flex items-center gap-2 hover:border-zinc-800 transition-colors"
              >
                <Code2 className="h-3.5 w-3.5 text-zinc-500" />
                {tool}
              </span>
            ))}
          </div>
        </motion.section>

        {/* Timeline */}
        <motion.section 
          id="timeline"
          {...animationProps()}
          className="scroll-mt-24 max-w-3xl mx-auto w-full"
        >
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-2">Schedule</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Event Timeline</h2>
          </div>
          
          <div className="relative pl-6 sm:pl-8 border-l border-zinc-900 ml-4">
            <div className="flex flex-col gap-10">
              {eventData.timeline.map((item, idx) => (
                <div key={idx} className="relative">
                  {/* Circle Indicator on the line */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3 h-3 rounded-full bg-black border border-zinc-750 flex items-center justify-center">
                    <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                  </div>
                  
                  <div className="bg-zinc-950 border border-zinc-900 rounded-lg p-5 hover:border-zinc-850 transition-colors">
                    <div className="text-xs font-semibold text-emerald-500 mb-2 flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-emerald-500" />
                      {item.time}
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100 mb-2">{item.title}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Prizes Section - Clean SaaS Pricing-style Grid */}
        <motion.section 
          id="prizes"
          {...animationProps()}
          className="scroll-mt-24"
        >
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-2">Recognition</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Prizes & Rewards</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12 items-stretch">
            {/* 2nd Place */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="premium-card p-6 flex flex-col justify-between min-h-[200px] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <div>
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-1">Runner Up</span>
                <h3 className="text-2xl font-bold text-zinc-200 mb-4">Second Place</h3>
              </div>
              <div>
                <span className="text-3xl mb-4 block">🥈</span>
                <p className="text-sm text-zinc-400 font-medium">{eventData.prizes[1].reward}</p>
              </div>
            </motion.div>

            {/* 1st Place */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0, ease: [0.16, 1, 0.3, 1] }}
              className="premium-card-primary p-6 flex flex-col justify-between min-h-[220px] relative border-emerald-500/20 shadow-lg shadow-emerald-950/10 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[9px] font-bold uppercase tracking-wider border border-emerald-500/20">
                Champion
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider block mb-1">Grand Winner</span>
                <h3 className="text-2xl font-bold text-white mb-4">First Place</h3>
              </div>
              <div>
                <span className="text-4xl mb-4 block">🥇</span>
                <p className="text-sm text-zinc-300 font-medium">{eventData.prizes[0].reward}</p>
              </div>
            </motion.div>

            {/* 3rd Place */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="premium-card p-6 flex flex-col justify-between min-h-[200px] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <div>
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-1">Second Runner Up</span>
                <h3 className="text-2xl font-bold text-zinc-200 mb-4">Third Place</h3>
              </div>
              <div>
                <span className="text-3xl mb-4 block">🥉</span>
                <p className="text-sm text-zinc-400 font-medium">{eventData.prizes[2].reward}</p>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="border border-zinc-900 bg-zinc-950/40 rounded-xl p-6 text-center flex flex-col justify-center items-center">
              <h3 className="text-sm font-bold text-zinc-200 mb-2 flex items-center justify-center gap-2">
                <Award className="h-4 w-4 text-emerald-500" /> {eventData.participationCertificate}
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed max-w-sm">All participants will receive a verified e-certificate issued by the AIML Club to add to their portfolios.</p>
            </div>
            
            <div className="border border-emerald-500/20 bg-emerald-950/5 rounded-xl p-6 text-center flex flex-col justify-center items-center shadow-lg shadow-emerald-950/5">
              <h3 className="text-sm font-bold text-emerald-450 mb-2 flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span> Live Results & Announcements
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mb-4">Event announcements and live results will be streamed in real-time during the challenge.</p>
              <a 
                href="https://result.aimlcluboct.in/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded bg-emerald-500 hover:bg-emerald-450 text-black font-bold text-[11px] transition-colors cursor-pointer"
              >
                Go to Live Results <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </motion.section>

        {/* Why Participate Features */}
        <motion.section 
          id="why-join"
          {...animationProps()}
          className="scroll-mt-24"
        >
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-2">Benefits</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Why Participate?</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {eventData.benefits.map((benefit: { title: string, icon: string }, idx: number) => {
              const IconComp = IconMap[benefit.icon] || Sparkles;
              return (
                <div key={idx} className="premium-card p-5 flex flex-col justify-between min-h-[140px]">
                  <div className="p-2 w-fit rounded bg-zinc-900 text-zinc-400 border border-zinc-850">
                    <IconComp className="h-4 w-4 text-emerald-500" />
                  </div>
                  <h3 className="text-zinc-250 font-bold leading-snug text-sm tracking-wide mt-4">{benefit.title}</h3>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section 
          id="community"
          {...animationProps()}
          className="text-center scroll-mt-24"
        >
          <div className="mb-16">
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-2">Feedback</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Student Testimonials</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {eventData.testimonials.map((t, idx) => (
              <div key={idx} className="premium-card p-6 text-left flex flex-col justify-between">
                <p className="text-sm text-zinc-400 italic leading-relaxed mb-6">&quot;{t.quote}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 text-xs font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-zinc-200 text-xs font-bold">{t.name}</h4>
                    <p className="text-[10px] text-zinc-550 mt-0.5">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Your Voice Matters Section */}
        <motion.section
          {...animationProps()}
          className="w-full"
        >
          <SuggestionBox />
        </motion.section>

        {/* Contact/Coordinators CTA Card */}
        <motion.section
          {...animationProps(0.1)}
          className="max-w-3xl mx-auto w-full border border-zinc-900 bg-zinc-950/20 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden text-center md:text-left"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div>
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-2">Support & Updates</span>
              <h3 className="text-2xl font-bold text-white mb-2">Have Questions?</h3>
              <p className="text-sm text-zinc-400 max-w-md mb-5">
                Get in touch with our event coordinators, or join our official WhatsApp group for real-time announcements.
              </p>
              <a 
                href={eventData.contact.whatsappGroup}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 text-emerald-400 text-xs font-semibold transition-all active:scale-[0.98] cursor-pointer"
              >
                <MessageCircle className="h-4 w-4" /> Join WhatsApp Group
              </a>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto justify-center">
              {eventData.coordinators.map((coordinator, idx) => (
                <a
                  key={idx}
                  href={`tel:${coordinator.phone.replace(/\s+/g, '')}`}
                  className="flex flex-col items-center md:items-start gap-1 p-4 rounded-xl bg-zinc-950 border border-zinc-900 hover:border-zinc-800 hover:bg-zinc-950/80 transition-all group w-full sm:w-44"
                >
                  <span className="text-[10px] text-zinc-550 font-medium uppercase tracking-wider">Coordinator</span>
                  <span className="text-sm font-bold text-zinc-200 group-hover:text-emerald-400 transition-colors">{coordinator.name}</span>
                  <span className="text-xs text-zinc-400 font-mono mt-1">{coordinator.phone}</span>
                </a>
              ))}
            </div>
          </div>
        </motion.section>

      </main>

      {/* Minimal Product Footer */}
      <footer className="border-t border-zinc-900 bg-[#030303] pt-16 pb-8 relative z-10 px-6 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h2 className="text-lg font-bold text-white mb-4">SNAPCODE <span className="text-emerald-500">2026</span></h2>
            <p className="text-xs text-zinc-500 mb-6 max-w-md leading-relaxed">
              Organized by the AI & Machine Learning Club of Oriental College of Technology, Bhopal. A 100-minute challenge testing rapid product design & vibe coding abilities.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <a 
                href={eventData.contact.instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded bg-zinc-950 border border-zinc-900 flex items-center justify-center text-zinc-500 hover:text-zinc-200 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500"
                aria-label="AIML Club Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a 
                href={eventData.contact.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded bg-zinc-950 border border-zinc-900 flex items-center justify-center text-zinc-500 hover:text-zinc-200 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500"
                aria-label="AIML Club LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a 
                href={eventData.contact.whatsappChannel} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded bg-zinc-950 border border-zinc-900 flex items-center justify-center text-zinc-500 hover:text-zinc-200 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500"
                aria-label="AIML Club WhatsApp Channel"
              >
                <MessageCircle className="h-4 w-4 text-emerald-500" />
              </a>
              <a 
                href={eventData.contact.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded bg-zinc-950 border border-zinc-900 flex items-center justify-center text-zinc-500 hover:text-zinc-200 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500"
                aria-label="Organizer GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a 
                href={`mailto:${eventData.contact.email}`} 
                className="w-8 h-8 rounded bg-zinc-950 border border-zinc-900 flex items-center justify-center text-zinc-500 hover:text-zinc-200 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500"
                aria-label="Organizer Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xs font-bold text-zinc-200 mb-4 uppercase tracking-wider">Event Details</h3>
            <ul className="flex flex-col gap-2.5 text-xs text-zinc-500">
              <li className="flex items-center gap-2"><Calendar className="h-3.5 w-3.5 text-zinc-600" /> {eventData.date}</li>
              <li className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-zinc-600" /> {eventData.venue}</li>
              <li className="flex items-center gap-2"><Ticket className="h-3.5 w-3.5 text-zinc-600" /> {eventData.fee}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-zinc-200 mb-4 uppercase tracking-wider">Coordinators</h3>
            <ul className="flex flex-col gap-3 text-xs text-zinc-500">
              {eventData.coordinators.map((coordinator, idx) => (
                <li key={idx} className="flex flex-col">
                  <span className="font-semibold text-zinc-400">{coordinator.name}</span>
                  <a 
                    href={`tel:${coordinator.phone.replace(/\s+/g, '')}`} 
                    className="hover:text-emerald-450 transition-colors text-[11px] font-mono mt-1"
                  >
                    {coordinator.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-zinc-200 mb-4 uppercase tracking-wider">Organized By</h3>
            <p className="text-xs font-semibold text-zinc-400 mb-1">{eventData.contact.club}</p>
            <p className="text-[10px] text-zinc-550 mb-3">{eventData.contact.college}</p>
            <ul className="flex flex-col gap-2 text-xs text-zinc-500">
              <li className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-zinc-650" /> {eventData.contact.email}</li>
              <li className="flex items-center gap-2">
                <Globe className="h-3.5 w-3.5 text-zinc-650" />
                <a 
                  href={eventData.contact.website} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-emerald-400 transition-colors"
                >
                  aimlcluboct.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-8 border-t border-zinc-900/60 text-[10px] text-zinc-600 flex justify-center items-center">
          <p>© 2026 AI &amp; Machine Learning Club, OCT Bhopal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
