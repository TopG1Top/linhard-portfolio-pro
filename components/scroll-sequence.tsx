"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, Crosshair } from "lucide-react";
import { useRef, useState } from "react";

type Chapter = { label: string; title: string; body: string; signal: string };

export function ScrollSequence({ id, eyebrow, chapters, image, endnote }: { id: string; eyebrow: string; chapters: Chapter[]; image?: string; endnote: string }) {
  const target = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target, offset: ["start start", "end end"] });
  const orbit = useTransform(scrollYProgress, [0, 1], [0, 310]);
  const innerOrbit = useTransform(scrollYProgress, [0, 1], [0, -420]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.07, 1.22]);
  const line = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setActive(Math.min(chapters.length - 1, Math.floor(Math.min(value, .9999) * chapters.length)));
  });

  return (
    <section id={id} ref={target} className="sequence" style={{ height: `${chapters.length * 92 + 100}svh` }} aria-label={eyebrow}>
      <div className="sequence-sticky">
        {image && <motion.div className="sequence-image" style={{ scale: imageScale }}><img src={image} alt="" /></motion.div>}
        <div className="sequence-grid" aria-hidden="true" />
        <div className="sequence-top"><span>{eyebrow}</span><span>LINHARD ZEJNELI / SYSTEM THINKING</span><span>{String(active + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}</span></div>
        <div className="sequence-layout">
          <div className="sequence-steps" aria-label="Kapitel">
            {chapters.map((chapter, index) => <div key={chapter.label} className={index === active ? "is-active" : ""}><span>0{index + 1}</span><strong>{chapter.label}</strong></div>)}
          </div>
          <div className="sequence-instrument" aria-hidden="true">
            <motion.div className="sequence-orbit sequence-orbit-outer" style={{ rotate: orbit }} />
            <motion.div className="sequence-orbit sequence-orbit-inner" style={{ rotate: innerOrbit }} />
            <div className="sequence-cross"><Crosshair strokeWidth={.65} /></div>
            <span className="sequence-tick sequence-tick-top" /><span className="sequence-tick sequence-tick-right" /><span className="sequence-tick sequence-tick-bottom" /><span className="sequence-tick sequence-tick-left" />
            <div className="sequence-instrument-label"><span>INPUT / {String(active + 1).padStart(2, "0")}</span><span>{chapters[active].signal}</span></div>
          </div>
          <div className="sequence-copy" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 38, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -30, filter: "blur(8px)" }} transition={{ duration: .55, ease: [.22, 1, .36, 1] }}>
                <p className="lux-label"><span />{eyebrow} / 0{active + 1}</p>
                <h2>{chapters[active].title}</h2>
                <p>{chapters[active].body}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="sequence-bottom"><span>{endnote}</span><div><motion.i style={{ scaleX: line }} /></div><span>SCROLLEN <ArrowDownRight aria-hidden="true" /></span></div>
      </div>
    </section>
  );
}
