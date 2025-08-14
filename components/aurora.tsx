"use client"
import { motion } from "framer-motion"
export function Aurora() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5, scale: [1, 1.07, 1] }} transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }} className="absolute -top-20 left-1/2 h-[28rem] w-[60rem] -translate-x-1/2 rounded-full blur-3xl" style={{ background: "radial-gradient(closest-side, rgba(99,102,241,0.35), transparent 70%)" }} />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.35, x: [0, 30, 0] }} transition={{ duration: 14, repeat: Infinity }} className="absolute bottom-0 right-0 h-[24rem] w-[40rem] rounded-full blur-3xl" style={{ background: "radial-gradient(closest-side, rgba(16,185,129,0.25), transparent 70%)" }} />
    </div>
  )
}
