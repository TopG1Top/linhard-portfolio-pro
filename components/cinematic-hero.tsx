"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { heading } from "@/lib/typography";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";

const scenes = [
  { label: "Linhard Zejneli / Applikationsentwicklung", title: ["Digitale Produkte.", "Mit Substanz."], body: "Ich verbinde Engineering, Daten und Interface-Design. Für Anwendungen, die nicht nur beeindrucken, sondern verständlich funktionieren.", note: "SCHWEIZ", caption: "01 / DIE IDEE", detail: "Ein guter Anfang ist eine präzise Frage." },
  { label: "Unter der Oberfläche", title: ["Durchdacht.", "Bis ins System."], body: "Vom lokalen, verschlüsselten Vault bis zum City-Dashboard: Datenfluss, Zustände und Oberfläche werden zusammen gedacht — und zusammen gebaut.", note: "CODE / CONTEXT / CRAFT", caption: "02 / DAS HANDWERK", detail: "Architektur wird sichtbar, wenn alles zusammenpasst." },
  { label: "Selected work / 2025—2026", title: ["Nicht nur zeigen.", "Erlebbar machen."], body: "Sieben Projekte. Sieben unterschiedliche Aufgaben. Entdecke die Idee, die technische Entscheidung und das Erlebnis dahinter.", note: "SIEBEN PROJEKTE / EIN ANSPRUCH", caption: "03 / DIE WIRKUNG", detail: "Scroll weiter. Die Details machen den Unterschied." },
];

function MonolithSlice({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const offset = useTransform(progress, [0, .22, .62, 1], [index % 2 ? 40 : -40, 0, index % 2 ? -16 : 16, 0]);
  const top = index * 20;
  return <motion.div className="hero-monolith-slice" style={{ clipPath: `inset(${top}% 0 ${80 - top}% 0)`, x: offset }}><img src="/linhard-monolith-hero.png" alt="" /></motion.div>;
}

export function CinematicHero() {
  const target = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const { scrollYProgress: progress } = useScroll({ target, offset: ["start start", "end end"] });
  useMotionValueEvent(progress, "change", value => setActive(Math.min(2, Math.floor(value * 3))));
  const imageScale = useTransform(progress, [0, 1], [1, 1.17]);
  const reveal = useTransform(progress, [0, .16, .8, 1], ["inset(6% 8% 6% 8%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(3% 3% 3% 3%)"]);
  const beam = useTransform(progress, [0, 1], ["0%", "100%"]);
  const line = useTransform(progress, [.2, .8], [0, 1]);
  const scene = scenes[active];
  return <section ref={target} className={`cinema-hero cinema-scene-${active}`} aria-labelledby="hero-title"><div className="cinema-sticky">
    <div className="cinema-background-word" aria-hidden="true">ENGINEERED.</div>
    <div className="cinema-coordinate"><span>INDEPENDENT THINKING / PRECISE EXECUTION</span><span>SCHWEIZ</span></div>
    <motion.div className="hero-monolith" style={reduced ? {} : { scale: imageScale, clipPath: reveal }}>{Array.from({ length: 5 }, (_, index) => <MonolithSlice key={index} index={index} progress={progress} />)}<div className="hero-monolith-light" /><motion.div className="hero-monolith-beam" style={{ top: beam }} /><div className="hero-object-frame"><i /><i /><i /><i /></div><span className="hero-object-label">OBJECT 001 / IDEAS INTO SYSTEMS</span><svg className="hero-object-blueprint" viewBox="0 0 500 600"><motion.path d="M40 520 H160 V450 H250 V300 H390 V100 H460" style={{ pathLength: line }} /><motion.path d="M40 160 H120 V250 H340 V500 H460" style={{ pathLength: line }} /><circle cx="250" cy="300" r="8" /></svg></motion.div>
    <div className="cinema-copy"><AnimatePresence mode="wait" initial={false}><motion.div key={active} initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: .18 } }}><p className="lux-label"><span />{scene.label}</p>{active === 0 ? <h1 id="hero-title">{scene.title.map((text, i) => <span className="cinema-title-mask" key={text}><motion.span initial={reduced ? false : { y: "108%" }} animate={{ y: 0 }} transition={{ duration: 1.1, delay: i * .13, ease: [.16, 1, .3, 1] }}>{heading(text)}</motion.span></span>)}</h1> : <h1 id="hero-title">{scene.title.map((text, i) => <span className="cinema-title-mask" key={text}><motion.span initial={reduced ? false : { y: "108%" }} animate={{ y: 0 }} transition={{ duration: .95, delay: i * .12, ease: [.16, 1, .3, 1] }}>{heading(text)}</motion.span></span>)}</h1>}<motion.p className="cinema-intro" initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .24, duration: .8 }}>{scene.body}</motion.p></motion.div></AnimatePresence><div className="cinema-actions"><a href="#selected">Arbeiten entdecken <ArrowDownRight size={16} /></a><a href="mailto:linhard79@hotmail.com">Kontakt <ArrowUpRight size={14} /></a></div></div>
    <aside className="cinema-side-note"><span>{scene.caption}</span><p>{scene.detail}</p></aside>
    <div className="cinema-footer"><span>{scene.note}</span><div className="cinema-chapters">{["Idee", "System", "Wirkung"].map((name, i) => <span className={i === active ? "is-active" : ""} key={name}><small>0{i + 1}</small>{name}</span>)}</div><span className="cinema-scroll">SCROLL TO REVEAL <i /></span></div><motion.div className="cinema-progress" style={{ scaleX: progress }} />
  </div></section>;
}
