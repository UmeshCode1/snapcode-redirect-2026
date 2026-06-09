"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { eventData } from "@/data/event";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Workflow", href: "#workflow" },
    { name: "Timeline", href: "#timeline" },
    { name: "Prizes", href: "#prizes" },
    { name: "Why Join", href: "#why-join" },
    { name: "Community", href: "#community" },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Left Side: College Logo */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center">
            <Image
              src="/assets/logo-oct.png"
              alt="Oriental College of Technology (OCT)"
              width={160}
              height={48}
              className="h-10 w-auto object-contain transition-transform duration-300 hover:scale-105"
              priority
            />
          </a>
          <span className="hidden sm:inline-block w-px h-6 bg-slate-800"></span>
          <span className="hidden sm:inline-block text-xs font-semibold text-slate-400 tracking-wider uppercase">
            Bhopal
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors relative group"
            >
              {link.name}
              <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Right Side: Club Logo & CTA */}
        <div className="flex items-center gap-4">
          <a
            href="https://instagram.com/aiml_club_oct"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 group"
          >
            <Image
              src="/assets/logo-club.png"
              alt="AIML Club Logo"
              width={40}
              height={40}
              className="h-9 w-auto object-contain rounded-full border border-emerald-500/30 glow-emerald transition-all group-hover:scale-110 group-hover:border-emerald-400"
            />
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-bold text-white leading-none tracking-tight">AI & ML CLUB</span>
              <span className="text-[10px] text-slate-400 font-medium leading-none">OCT BHOPAL</span>
            </div>
          </a>

          {/* Mini Action Button */}
          <a
            href={eventData.registrationUrl}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs transition-all hover:scale-105 active:scale-95 shadow-md shadow-emerald-500/20"
          >
            Register Now <ArrowRight className="h-3 w-3" />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-400 hover:text-white md:hidden hover:bg-slate-900 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-2xl overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-semibold text-slate-300 hover:text-emerald-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="w-full h-px bg-slate-850 my-2"></div>
              <a
                href={eventData.registrationUrl}
                onClick={() => setIsOpen(false)}
                className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-xl font-bold text-center flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                Register Now <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
