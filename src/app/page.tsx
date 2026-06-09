"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { eventData } from "@/data/event";
import {
  Calendar,
  MapPin,
  Ticket,
  Instagram,
  Github,
  Mail,
  Phone,
  Check,
  Sparkles,
  Trophy,
  Code2,
  BrainCircuit,
  Rocket,
  Palette,
  Users,
  Target,
  Award
} from "lucide-react";
import SpotlightHero from "@/components/SpotlightHero";
import Modals from "@/components/Modals";
import AnimatedCounter from "@/components/AnimatedCounter";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } }
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
  hover: { scale: 1.05, transition: { type: "spring" as const, stiffness: 300, damping: 10 } },
  tap: { scale: 0.95 }
};

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

function TiltCard({ children, className }: { children: React.ReactNode, className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={className}
    >
      <div style={{ transform: "translateZ(20px)" }} className="h-full w-full">
        {children}
      </div>
    </motion.div>
  );
}

export default function Home() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    
    // Spotlight follow effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen w-full font-sans overflow-x-hidden text-slate-200">
      <div className="bg-aurora"></div>
      <div 
        className="spotlight"
        style={{ '--x': `${mousePos.x}px`, '--y': `${mousePos.y}px` } as React.CSSProperties}
      ></div>

      <Modals />
      <SpotlightHero />

      {/* Floating CTA */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="fixed bottom-6 right-6 z-40 hidden md:block"
      >
        <a href={eventData.registrationUrl} className="animated-border rounded-full inline-block">
          <button className="px-6 py-3 bg-slate-900/80 backdrop-blur-md rounded-full font-bold text-white border border-transparent shadow-2xl hover:scale-105 transition-transform">
            Register Now
          </button>
        </a>
      </motion.div>

      <main className="w-full max-w-6xl mx-auto flex-1 flex flex-col gap-24 relative z-10 px-4 md:px-8 pb-32">
        
        {/* Stats Strip */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 bg-slate-900/50 p-6 md:p-8 rounded-3xl border border-slate-700/50 backdrop-blur-xl"
        >
          <motion.div variants={fadeInUp} className="text-center">
            <h4 className="text-4xl font-black text-white mb-1"><AnimatedCounter from={0} to={100} /></h4>
            <p className="text-sm text-slate-400 font-medium">Minutes Challenge</p>
          </motion.div>
          <motion.div variants={fadeInUp} className="text-center">
            <h4 className="text-4xl font-black text-white mb-1">₹<AnimatedCounter from={0} to={30} /></h4>
            <p className="text-sm text-slate-400 font-medium">Registration Fee</p>
          </motion.div>
          <motion.div variants={fadeInUp} className="text-center">
            <h4 className="text-4xl font-black text-white mb-1"><AnimatedCounter from={0} to={3} /></h4>
            <p className="text-sm text-slate-400 font-medium">Winning Positions</p>
          </motion.div>
          <motion.div variants={fadeInUp} className="text-center">
            <h4 className="text-4xl font-black text-white mb-1"><AnimatedCounter from={0} to={100} />%</h4>
            <p className="text-sm text-slate-400 font-medium">Certificates</p>
          </motion.div>
          <motion.div variants={fadeInUp} className="text-center col-span-2 md:col-span-1">
            <h4 className="text-4xl font-black text-white mb-1">OGI</h4>
            <p className="text-sm text-slate-400 font-medium">Students Eligible</p>
          </motion.div>
        </motion.section>

        {/* Visual Workflow Challenge */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-5xl font-black text-white mb-12">The <span className="text-emerald-400">Vibe Coding</span> Workflow</h2>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mb-16">
            {eventData.workflow.map((step, idx) => (
              <div key={idx} className="flex items-center gap-4 md:gap-8">
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="px-6 py-4 rounded-xl bg-slate-800 border border-slate-600 text-lg font-bold text-white shadow-xl glow-emerald"
                >
                  {step}
                </motion.div>
                {idx < eventData.workflow.length - 1 && (
                  <div className="text-emerald-400 font-bold text-2xl animate-pulse">→</div>
                )}
              </div>
            ))}
          </div>

          <h3 className="text-xl text-slate-300 font-bold mb-6">Supported Tools</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {eventData.tools.map((tool, idx) => (
              <motion.span 
                key={idx}
                whileHover={{ scale: 1.1, y: -5 }}
                className="px-4 py-2 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-200 font-medium text-sm flex items-center gap-2"
              >
                <Code2 className="h-4 w-4 text-emerald-400" />
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.section>

        {/* Timeline */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-black text-white mb-12 text-center">Event <span className="text-violet-400">Timeline</span></h2>
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-400 via-violet-500 to-transparent hidden md:block"></div>
            <div className="flex flex-col gap-8">
              {eventData.timeline.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="flex flex-col md:flex-row gap-4 md:gap-8 items-start relative"
                >
                  <div className="md:w-32 pt-2 text-emerald-400 font-bold text-lg hidden md:block text-right">
                    {item.time}
                  </div>
                  <div className="hidden md:flex absolute left-8 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-900 border-2 border-emerald-400 mt-3 glow-emerald"></div>
                  <div className="glass-panel p-6 rounded-2xl flex-1 border border-slate-700/50 hover:border-emerald-500/30 transition-colors">
                    <div className="text-emerald-400 font-bold text-sm mb-2 md:hidden">{item.time}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-slate-400">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Prizes Section - Podium Layout */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="pt-12"
        >
          <h2 className="text-3xl md:text-5xl font-black text-white mb-16 text-center">The <span className="text-amber-400">Prizes</span></h2>
          
          <div className="flex flex-col md:flex-row items-end justify-center gap-6 mb-16">
            {/* 2nd Place */}
            <TiltCard className="w-full md:w-1/3 order-2 md:order-1">
              <motion.div 
                className="h-[280px] glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center border border-slate-300/30 shadow-[0_0_30px_rgba(203,213,225,0.1)] relative overflow-hidden"
              >
                <div className="absolute top-0 w-full h-1 bg-slate-300"></div>
                <span className="text-5xl mb-4">🥈</span>
                <h3 className="text-2xl font-bold mb-2 text-slate-300">2nd Place</h3>
                <div className="text-slate-400 font-medium">Trophy + Certificate</div>
              </motion.div>
            </TiltCard>

            {/* 1st Place */}
            <TiltCard className="w-full md:w-1/3 order-1 md:order-2 z-10">
              <motion.div 
                className="h-[340px] glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center animated-border border-transparent relative"
              >
                <div className="absolute top-0 w-full h-2 bg-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.8)]"></div>
                <span className="text-7xl mb-4">🥇</span>
                <h3 className="text-3xl font-black mb-2 text-amber-400 glow-text-amber">1st Place</h3>
                <div className="text-slate-300 font-medium text-lg">Trophy + Certificate</div>
              </motion.div>
            </TiltCard>

            {/* 3rd Place */}
            <TiltCard className="w-full md:w-1/3 order-3 md:order-3">
              <motion.div 
                className="h-[260px] glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center border border-amber-700/30 shadow-[0_0_30px_rgba(180,83,9,0.1)] relative overflow-hidden"
              >
                <div className="absolute top-0 w-full h-1 bg-amber-700"></div>
                <span className="text-5xl mb-4">🥉</span>
                <h3 className="text-2xl font-bold mb-2 text-amber-600">3rd Place</h3>
                <div className="text-slate-400 font-medium">Trophy + Certificate</div>
              </motion.div>
            </TiltCard>
          </div>

          <TiltCard>
            <div className="glass-panel rounded-2xl p-8 text-center border border-emerald-500/30 glow-emerald max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-emerald-400 mb-3 flex items-center justify-center gap-2">
                <Award className="h-6 w-6" /> {eventData.participationCertificate}
              </h3>
              <p className="text-slate-300 font-medium">Showcase your participation in a flagship AI tech event on your LinkedIn & resume.</p>
            </div>
          </TiltCard>
        </motion.section>

        {/* Why Participate Features */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-black text-white mb-12 text-center">Why <span className="text-cyan-400">Participate?</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {eventData.benefits.map((benefit: { title: string, icon: string }, idx: number) => {
              const IconComp = IconMap[benefit.icon] || Sparkles;
              return (
                <TiltCard key={idx} className="h-full">
                  <motion.div 
                    variants={prefersReducedMotion ? {} : hoverScale}
                    whileHover="hover"
                    className="h-full glass-card p-6 rounded-2xl border border-white/5 flex flex-col items-start gap-4"
                  >
                    <div className="p-3 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
                      <IconComp className="h-6 w-6" />
                    </div>
                    <h3 className="text-slate-200 font-bold leading-snug text-lg">{benefit.title}</h3>
                  </motion.div>
                </TiltCard>
              );
            })}
          </div>
        </motion.section>

        {/* Social Proof Placeholder */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-5xl font-black text-white mb-12">The <span className="text-emerald-400">Community</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {eventData.testimonials.map((t, idx) => (
              <div key={idx} className="glass-panel p-8 rounded-3xl text-left border border-slate-700/50">
                <p className="text-xl text-slate-300 italic mb-6">&quot;{t.quote}&quot;</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-emerald-400 font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{t.name}</h4>
                    <p className="text-sm text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

      </main>

      {/* Professional Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 pt-16 pb-8 relative z-10 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-black text-white mb-4">SNAPCODE <span className="text-emerald-400">2026</span></h2>
            <p className="text-slate-400 mb-6 max-w-md">The ultimate frontend design challenge utilizing AI Vibe Coding to build and deploy applications in 100 minutes.</p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors"><Github className="h-5 w-5" /></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Event Details</h3>
            <ul className="flex flex-col gap-3 text-slate-400">
              <li className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {eventData.date}</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {eventData.venue}</li>
              <li className="flex items-center gap-2"><Ticket className="h-4 w-4" /> {eventData.fee}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">Organized By</h3>
            <p className="text-slate-400 font-bold mb-1">{eventData.contact.club}</p>
            <p className="text-slate-500 text-sm mb-4">{eventData.contact.college}</p>
            <ul className="flex flex-col gap-2 text-slate-400">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> aimlcluboct@gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-8 border-t border-slate-900 text-center text-slate-500 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 AI & Machine Learning Club, OCT Bhopal. All rights reserved.</p>
          <p>Built with Next.js & Framer Motion</p>
        </div>
      </footer>
    </div>
  );
}
