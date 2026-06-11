"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Send, CheckCircle2, AlertCircle } from "lucide-react";
import Image from "next/image";

const CATEGORIES = [
  { id: "event", label: "Event Concept", icon: "💡" },
  { id: "workshop", label: "Workshop", icon: "🚀" },
  { id: "feedback", label: "Feedback", icon: "💬" },
  { id: "other", label: "Other Suggestion", icon: "✨" }
];

export default function SuggestionBox() {
  const [category, setCategory] = useState("event");
  const [suggestion, setSuggestion] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestion.trim()) {
      setError("Please type your suggestion before submitting.");
      return;
    }
    setError("");
    setIsSubmitting(true);

    // Mock API call to create a satisfying interaction delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Save to local storage for realistic state persistence
    try {
      const stored = localStorage.getItem("snapcode_suggestions") || "[]";
      const suggestions = JSON.parse(stored);
      suggestions.push({
        id: Date.now(),
        category,
        suggestion,
        name: name.trim() || "Anonymous",
        timestamp: new Date().toISOString()
      });
      localStorage.setItem("snapcode_suggestions", JSON.stringify(suggestions));
    } catch (err) {
      console.error("Local storage error:", err);
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setSuggestion("");
    setName("");
    setIsSubmitted(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto border border-zinc-900 bg-zinc-950/40 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Dynamic Ambient Background Glow */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
      
      <div className="flex flex-col items-center relative z-10">
        {/* AIML Club Logo Badge */}
        <div className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-850 flex items-center justify-center p-2.5 mb-5 shadow-lg">
          <Image
            src="/assets/logo-club.png"
            alt="AIML Club Logo"
            width={40}
            height={40}
            className="w-full h-auto object-contain rounded-full"
          />
        </div>
        
        <span className="px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-450 text-[9px] font-bold uppercase tracking-wider mb-3">
          AI & Machine Learning Club - OCT
        </span>
        
        <span className="text-[10px] text-zinc-550 font-bold uppercase tracking-widest block mb-4">
          Innovate • Implement • Inspire
        </span>
        
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3 text-center">
          Your Voice Matters
        </h2>
        
        <p className="text-sm font-semibold text-zinc-350 max-w-lg mb-2 text-center">
          Let&apos;s build a better college experience together.
        </p>
        
        <p className="text-xs text-zinc-450 max-w-lg leading-relaxed mb-8 text-center">
          Share your ideas, feedback, workshop interests, event concepts, and innovative thoughts to shape the future of our community.
        </p>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form
              key="feedback-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="w-full text-left flex flex-col gap-5"
            >
              {/* Category Pill Selection */}
              <div>
                <label className="block text-xs font-bold text-zinc-450 uppercase tracking-wider mb-2.5">
                  Select Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={`px-3 py-2.5 rounded-lg border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all duration-200 cursor-pointer ${
                        category === cat.id
                          ? "border-emerald-500/30 bg-emerald-950/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.05)]"
                          : "border-zinc-900 bg-zinc-950 text-zinc-400 hover:border-zinc-800 hover:text-zinc-300"
                      }`}
                    >
                      <span className="text-lg">{cat.icon}</span>
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Message text area */}
              <div>
                <label htmlFor="suggestion" className="block text-xs font-bold text-zinc-455 uppercase tracking-wider mb-2">
                  Your Suggestion / Feedback
                </label>
                <textarea
                  id="suggestion"
                  rows={4}
                  maxLength={1000}
                  value={suggestion}
                  onChange={(e) => {
                    setSuggestion(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="What's on your mind? Share details about your idea or feedback..."
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-900 text-zinc-200 placeholder:text-zinc-650 text-sm focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/40 transition-all resize-none"
                />
                <div className="flex justify-between items-center mt-1.5 px-1">
                  {error ? (
                    <span className="text-[10px] text-red-400 flex items-center gap-1 font-medium">
                      <AlertCircle className="h-3 w-3" /> {error}
                    </span>
                  ) : (
                    <span></span>
                  )}
                  <span className="text-[10px] text-zinc-600 font-mono">
                    {suggestion.length}/1000
                  </span>
                </div>
              </div>

              {/* Optional Name field */}
              <div>
                <label htmlFor="name" className="block text-xs font-bold text-zinc-455 uppercase tracking-wider mb-2">
                  Name (Optional)
                </label>
                <input
                  id="name"
                  type="text"
                  maxLength={50}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Anonymous"
                  className="w-full px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-900 text-zinc-200 placeholder:text-zinc-650 text-xs focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/40 transition-all"
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 bg-zinc-100 hover:bg-white text-black font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-3.5 w-3.5 text-black" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" /> Submit Suggestion
                    </>
                  )}
                </button>

                <a
                  href="https://voice.aimlcluboct.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-5 border border-zinc-850 hover:border-zinc-750 bg-zinc-950 text-zinc-350 hover:text-zinc-200 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] cursor-pointer"
                >
                  ✨ Voice Portal <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="feedback-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-full flex flex-col items-center py-6 text-center"
            >
              {/* Circular scale success checkmark icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                className="w-16 h-16 rounded-full bg-emerald-950/30 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
              >
                <CheckCircle2 className="h-8 w-8 text-emerald-500" />
              </motion.div>

              <h3 className="text-xl font-bold text-white mb-2">Suggestion Recorded!</h3>
              <p className="text-xs text-zinc-400 max-w-md leading-relaxed mb-8">
                Thank you for sharing your thoughts! Your input has been saved locally. We constantly review suggestions to improve the college and club experience.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm justify-center">
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-lg border border-zinc-850 hover:border-zinc-700 bg-zinc-950 text-zinc-400 hover:text-zinc-200 font-semibold text-xs transition-all active:scale-[0.98] cursor-pointer"
                >
                  Submit Another
                </button>
                <a
                  href="https://voice.aimlcluboct.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-zinc-100 hover:bg-white text-black font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-all hover:scale-102 active:scale-[0.98] cursor-pointer"
                >
                  Go to Voice Portal <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footnote */}
        <span className="text-[10px] text-zinc-550 mt-8 block max-w-md text-center">
          Whether you&apos;re a student, faculty member, alumnus, mentor, or innovator — your perspective matters here.
        </span>
      </div>
    </div>
  );
}
