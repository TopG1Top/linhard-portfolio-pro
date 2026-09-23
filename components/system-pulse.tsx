"use client";

import { motion } from "framer-motion";
import { Braces, Cpu, Rocket } from "lucide-react";

const stages = [
  { label: "IDEA", icon: Braces },
  { label: "BUILD", icon: Cpu },
  { label: "SHIP", icon: Rocket },
];

export function SystemPulse() {
  return (
    <div className="relative overflow-hidden rounded-md border bg-slate-950 px-4 py-4 text-slate-100">
      <div className="mb-4 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500">
        <span>Live build signal</span>
        <span className="inline-flex items-center gap-2 text-emerald-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" /> Active
        </span>
      </div>
      <div className="relative grid grid-cols-3">
        <div className="absolute left-[16.66%] right-[16.66%] top-4 h-px bg-white/10" />
        <motion.div
          className="absolute left-[16.66%] top-[13px] z-10 h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(52,211,153,0.9)]"
          animate={{ left: ["16.66%", "50%", "83.33%", "16.66%"] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", times: [0, 0.35, 0.7, 1] }}
        />
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          return (
            <div key={stage.label} className="relative z-20 flex flex-col items-center gap-2">
              <motion.div
                className="grid h-8 w-8 place-items-center rounded-md border border-white/10 bg-slate-900"
                animate={{ borderColor: ["rgba(255,255,255,.1)", "rgba(52,211,153,.55)", "rgba(255,255,255,.1)"] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.8 }}
              >
                <Icon className="h-4 w-4" />
              </motion.div>
              <span className="font-mono text-[9px] tracking-[0.12em] text-slate-500">{stage.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
