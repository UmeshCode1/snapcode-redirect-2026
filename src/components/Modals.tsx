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
      {/* Exit Intent Modal */}
      <AnimatePresence>
        {showExitIntent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="relative max-w-md w-full bg-zinc-950 border border-zinc-900 rounded-xl p-6 shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-labelledby="exit-modal-title"
            >
              <button
                onClick={() => setShowExitIntent(false)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300 focus-visible:ring-2 focus-visible:ring-emerald-500 rounded p-0.5"
                aria-label="Close dialog"
              >
                <X className="h-4 w-4" />
              </button>
              
              <div className="flex flex-col items-center text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900 border border-zinc-850 text-zinc-400 mb-4">
                  <Clock className="h-5 w-5 text-emerald-500" />
                </div>
                <h2 id="exit-modal-title" className="text-xl font-bold text-white mb-2">Wait! Don&apos;t Miss Out</h2>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {eventData.seatsInfo} Secure your spot for the ultimate Vibe Coding challenge. Registration closes soon.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <a
                  href={eventData.registrationUrl}
                  className="w-full py-2.5 bg-zinc-100 hover:bg-white text-black rounded-lg font-semibold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  Secure My Spot Now <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <button
                  onClick={() => setShowExitIntent(false)}
                  className="w-full py-2 text-zinc-500 hover:text-zinc-350 transition-colors text-xs font-semibold focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
                >
                  I&apos;ll pass on this opportunity
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 160s Exploration Modal */}
      <AnimatePresence>
        {showTimerModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="relative max-w-md w-full bg-zinc-950 border border-zinc-900 rounded-xl p-6 shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-labelledby="timer-modal-title"
            >
              <button
                onClick={() => setShowTimerModal(false)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300 focus-visible:ring-2 focus-visible:ring-emerald-500 rounded p-0.5"
                aria-label="Close dialog"
              >
                <X className="h-4 w-4" />
              </button>
              
              <div className="flex flex-col items-center text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900 border border-zinc-850 text-zinc-400 mb-4">
                  <Clock className="h-5 w-5 text-emerald-500" />
                </div>
                <h2 id="timer-modal-title" className="text-xl font-bold text-white mb-2">Ready to Build?</h2>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Join other students in Bhopal to showcase your design skills. Secure your place now.
                </p>
              </div>

              <a
                href={eventData.registrationUrl}
                className="w-full py-2.5 bg-zinc-100 hover:bg-white text-black rounded-lg font-semibold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                Register Now <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
