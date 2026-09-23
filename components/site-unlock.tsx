"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ScanLine, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

const steps = ["Interface prüfen", "Projekte entschlüsseln", "Portfolio freigeben"];

export function SiteUnlock() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (sessionStorage.getItem("portfolio-unlocked") || reducedMotion) return;

    setVisible(true);
    const startedAt = performance.now();
    const duration = 2300;
    let frame = 0;

    const tick = (now: number) => {
      const next = Math.min(100, Math.round(((now - startedAt) / duration) * 100));
      setProgress(next);
      if (next < 100) {
        frame = requestAnimationFrame(tick);
        return;
      }

      sessionStorage.setItem("portfolio-unlocked", "true");
      window.setTimeout(() => setVisible(false), 420);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const completedSteps = progress < 35 ? 0 : progress < 72 ? 1 : progress < 100 ? 2 : 3;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#07090f] px-5 text-slate-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.38 } }}
          aria-live="polite"
          aria-label="Portfolio wird geladen"
        >
          <div className="scan-grid absolute inset-0 opacity-60" />
          <motion.div
            className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent shadow-[0_0_28px_rgba(52,211,153,0.8)]"
            animate={{ top: ["10%", "90%", "10%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative w-full max-w-lg">
            <div className="mb-8 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              <span className="inline-flex items-center gap-2">
                <ScanLine className="h-4 w-4 text-emerald-300" /> System Scan
              </span>
              <span>{String(progress).padStart(3, "0")}%</span>
            </div>

            <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] p-6 shadow-[0_28px_100px_rgba(0,0,0,0.5)] sm:p-8">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/80 to-transparent" />
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg border border-emerald-300/25 bg-emerald-300/10 text-emerald-200">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">Linhard Zejneli</p>
                  <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">Portfolio wird freigeschaltet.</h2>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                {steps.map((step, index) => {
                  const done = index < completedSteps;
                  const active = index === completedSteps && progress < 100;
                  return (
                    <div key={step} className="flex items-center justify-between border-b border-white/10 pb-3 text-sm">
                      <span className={done || active ? "text-slate-100" : "text-slate-500"}>{step}</span>
                      <span className={done ? "text-emerald-300" : active ? "animate-pulse text-indigo-300" : "text-slate-600"}>
                        {done ? <Check className="h-4 w-4" /> : active ? "SCANNING" : "WAIT"}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-7 h-1 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-300"
                  animate={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
