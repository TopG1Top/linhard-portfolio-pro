"use client"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function Section({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn("inner-page relative mx-auto max-w-7xl px-4 py-10", className)}
    >
      {children}
    </motion.section>
  )
}
