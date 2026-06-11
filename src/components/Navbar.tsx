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
      setScrolled(window.scrollY > 20);
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
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md border-b border-zinc-900 py-3 shadow-md"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Left Side: College Logo & Label */}
        <div className="flex items-center gap-4">
          <a href="#" className="flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-emerald-500 rounded" aria-label="OCT Bhopal Homepage">
            <Image
              src="/assets/logo-oct.png"
              alt="Oriental College of Technology"
              width={130}
              height={36}
              className="h-8 w-auto object-contain brightness-95"
              priority
            />
          </a>
          <span className="hidden md:inline-block w-px h-5 bg-zinc-800"></span>
          <span className="hidden md:inline-block text-[10px] font-medium text-zinc-500 tracking-widest uppercase">
            Bhopal
          </span>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8" role="navigation">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-xs font-semibold text-zinc-400 hover:text-zinc-100 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 rounded px-1.5 py-1.5 group"
            >
              {link.name}
              <span className="absolute bottom-0 left-1.5 right-1.5 h-[1.5px] bg-emerald-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
            </a>
          ))}
        </nav>

        {/* Right Side: Club Logo & CTA */}
        <div className="flex items-center gap-4">
          <a
            href="https://instagram.com/aiml_club_oct"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 group focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
            aria-label="AI & ML Club Instagram"
          >
            <Image
              src="/assets/logo-club.png"
              alt="AIML Club"
              width={32}
              height={32}
              className="h-7 w-auto object-contain rounded-full border border-zinc-800 group-hover:border-zinc-700 transition-colors"
            />
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-[10px] font-bold text-zinc-300 leading-none tracking-wide">AIML CLUB</span>
              <span className="text-[8px] text-zinc-500 font-medium leading-none mt-0.5">OCT</span>
            </div>
          </a>

          {/* Clean Muted Register CTA */}
          <a
            href={eventData.registrationUrl}
            className="hidden sm:inline-flex items-center gap-1 px-4 py-1.5 rounded-md bg-zinc-100 hover:bg-white text-black font-semibold text-xs transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            Register <ArrowRight className="h-3 w-3" />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 text-zinc-450 hover:text-zinc-100 md:hidden hover:bg-zinc-900 rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500"
            aria-label="Toggle Navigation Menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden border-t border-zinc-900 bg-black/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ x: -15, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.05, type: "spring", stiffness: 300, damping: 24 }}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-semibold text-zinc-300 hover:text-white transition-colors py-1 focus-visible:ring-2 focus-visible:ring-emerald-500 rounded px-1"
                >
                  {link.name}
                </motion.a>
              ))}
              <div className="w-full h-px bg-zinc-900 my-2"></div>
              <a
                href={eventData.registrationUrl}
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 bg-zinc-100 hover:bg-white text-black rounded-md font-semibold text-center flex items-center justify-center gap-1.5 transition-all text-xs focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                Register Now <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
