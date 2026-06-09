"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { eventData } from "@/data/event";
import { X, Clock, ArrowRight } from "lucide-react";

export default function Modals() {
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [showTimerModal, setShowTimerModal] = useState(false);
  const [hasTriggeredExit, setHasTriggeredExit] = useState(false);

  useEffect(() => {
    // 160-second timer modal
    const timer = setTimeout(() => {
      setShowTimerModal(true);
    }, 160000); // 160 seconds

    // Exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasTriggeredExit) {
        setShowExitIntent(true);
        setHasTriggeredExit(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasTriggeredExit]);

  return (
    <>
      <AnimatePresence>
        {showExitIntent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative max-w-lg w-full bg-slate-900 border border-amber-500/30 rounded-2xl p-8 shadow-2xl shadow-amber-500/10"
            >
              <button
                onClick={() => setShowExitIntent(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
              
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/10 text-amber-500 mb-4">
                  <Clock className="h-8 w-8" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Wait! Don&apos;t Miss Out</h2>
                <p className="text-slate-300">
                  {eventData.seatsInfo} We only have a few spots left for the ultimate Vibe Coding challenge.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href={eventData.registrationUrl}
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors"
                >
                  Secure My Spot Now <ArrowRight className="h-5 w-5" />
                </a>
                <button
                  onClick={() => setShowExitIntent(false)}
                  className="w-full py-3 text-slate-400 hover:text-white transition-colors"
                >
                  I&apos;ll pass on this opportunity
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTimerModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative max-w-lg w-full bg-slate-900 border border-emerald-500/30 rounded-2xl p-8 shadow-2xl shadow-emerald-500/10 glow-emerald"
            >
              <button
                onClick={() => setShowTimerModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
              
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-white mb-2">Ready to Build?</h2>
                <p className="text-slate-300">
                  You&apos;ve been exploring for a while! Are you ready to join SNAPCODE 2026 and build amazing things?
                </p>
              </div>

              <a
                href={eventData.registrationUrl}
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors"
              >
                Register Now <ArrowRight className="h-5 w-5" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
