"use client";

import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

export function PageIntro({
  index,
  eyebrow,
  title,
  description,
}: {
  index: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative mb-10 overflow-hidden border-b pb-10 pt-3 md:mb-14 md:pb-14"
    >
      <div className="absolute right-0 top-0 hidden font-mono text-[7rem] font-black leading-none text-foreground/[0.025] md:block">
        {index}
      </div>
      <div className="relative">
        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-secondary">
          <span className="font-mono text-muted-foreground">{index}</span>
          <span className="h-px w-10 bg-secondary/60" />
          {eyebrow}
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <h1 className="max-w-4xl text-4xl font-black leading-[1.02] tracking-tight md:text-6xl">{title}</h1>
          <div className="flex items-start gap-3 lg:justify-end">
            <ArrowDownRight className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <p className="max-w-xl text-base leading-7 text-muted-foreground md:text-lg">{description}</p>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
