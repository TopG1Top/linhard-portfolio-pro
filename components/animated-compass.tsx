"use client";

import { motion } from "framer-motion";
import { Compass } from "lucide-react";

export function AnimatedCompass() {
  return (
    <div className="relative grid aspect-square w-full max-w-[17rem] place-items-center" aria-hidden="true">
      <motion.div
        className="absolute inset-0 rounded-full border border-dashed border-primary/25"
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-5 rounded-full border border-secondary/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute left-1/2 top-[-4px] h-2 w-2 -translate-x-1/2 rounded-full bg-secondary shadow-[0_0_16px_hsl(var(--secondary))]" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.82 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <Compass className="compass-sketch h-36 w-36 text-foreground md:h-44 md:w-44" strokeWidth={1.15} />
        <motion.span
          className="absolute left-1/2 top-1/2 h-[42%] w-px origin-bottom -translate-x-1/2 -translate-y-full bg-gradient-to-t from-primary to-secondary"
          animate={{ rotate: [-12, 18, -6, -12] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      <span className="absolute left-1/2 top-2 -translate-x-1/2 font-mono text-[10px] font-bold text-muted-foreground">N</span>
      <span className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[10px] text-muted-foreground">S</span>
      <span className="absolute left-2 top-1/2 -translate-y-1/2 font-mono text-[10px] text-muted-foreground">W</span>
      <span className="absolute right-2 top-1/2 -translate-y-1/2 font-mono text-[10px] text-muted-foreground">E</span>
    </div>
  );
}
