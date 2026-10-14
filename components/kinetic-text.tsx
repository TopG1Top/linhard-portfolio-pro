"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function Typewriter({ text, delay = 400, className = "" }: { text: string; delay?: number; className?: string }) {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(0);
  const target = useRef<HTMLSpanElement>(null);
  const inView = useInView(target, { once: true, margin: "-10%" });

  useEffect(() => {
    if (!inView) return;
    if (reduced) { setVisible(text.length); return; }
    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      let count = 0;
      interval = setInterval(() => {
        count += 1;
        setVisible(count);
        if (count >= text.length) clearInterval(interval);
      }, 52);
    }, delay);
    return () => { clearTimeout(timeout); if (interval) clearInterval(interval); };
  }, [delay, inView, reduced, text]);

  return <span ref={target} className={`typewriter ${className}`} aria-label={text}><span aria-hidden="true">{text.slice(0, visible)}</span><span className={`typewriter-caret ${visible >= text.length ? "typewriter-caret-done" : ""}`} aria-hidden="true" /></span>;
}

export function WordReveal({ text, id, className = "", active }: { text: string; id?: string; className?: string; active?: boolean }) {
  const reduced = useReducedMotion();
  return <h2 id={id} className={`word-reveal ${className}`} aria-label={text}>{text.split(" ").map((word, index) => <span className="word-reveal-mask" key={`${word}-${index}`} aria-hidden="true"><motion.span initial={reduced ? false : { y: "110%", opacity: 0 }} animate={active === undefined ? undefined : active ? { y: 0, opacity: 1 } : { y: "110%", opacity: 0 }} whileInView={active === undefined ? { y: 0, opacity: 1 } : undefined} viewport={{ once: true, amount: 0, margin: "18% 0px 18% 0px" }} transition={{ duration: .8, delay: Math.min(index * .055, .5), ease: [.22, 1, .36, 1] }}>{word}&nbsp;</motion.span></span>)}</h2>;
}
