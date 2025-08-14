"use client"
import { motion } from "framer-motion"
export function Section({ children }: { children: React.ReactNode }) {
  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="relative mx-auto max-w-7xl px-4 py-10">
      {children}
    </motion.section>
  )
}
