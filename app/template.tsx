"use client"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1, opacity: [1, 1, 0] }}
          transition={{ duration: 0.7, times: [0, 0.8, 1] }}
        />
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
