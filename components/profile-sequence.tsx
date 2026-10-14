"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Download } from "lucide-react";
import { useRef, useState } from "react";
import { Typewriter } from "@/components/kinetic-text";
import { site } from "@/lib/site";

const phases = [
  { label: "Haltung", title: "Technik mit Klarheit. Verantwortung mit Tiefe.", body: "Ich bin Linhard Zejneli, Applikationsentwickler in Ausbildung mit Berufsmaturität Wirtschaft. Mich interessiert nicht nur, ob ein System funktioniert — sondern ob es Menschen Orientierung gibt.", signal: "01 / PURPOSE" },
  { label: "Handwerk", title: "Frontend. Backend. Daten. Ein System.", body: "Ich verbinde Oberfläche, Logik und Datenhaltung zu einem Ganzen. Der Anspruch: eine Idee so sauber zu bauen, dass sie ausserhalb des perfekten Demo-Moments besteht.", signal: "02 / CRAFT" },
  { label: "Charakter", title: "Unter Druck ruhig. Bis zum Ende präzise.", body: "Leistungsfussball und Captain-Erfahrung prägen meine Arbeitsweise: Verantwortung übernehmen, gemeinsam denken und dann konsequent liefern.", signal: "03 / DELIVERY" },
];

export function ProfileSequence() {
  const target = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target, offset: ["start start", "end end"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.23]);
  const imageX = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const trace = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const stackY = useTransform(scrollYProgress, [0, 1], ["-9%", "10%"]);
  useMotionValueEvent(scrollYProgress, "change", (value) => setActive(Math.min(2, Math.floor(Math.min(value, .9999) * 3))));

  return <section ref={target} className="profile-sequence" style={{ height: "370svh" }} aria-label="Profil von Linhard Zejneli">
    <div className="profile-sequence-sticky">
      <motion.div className="profile-sequence-image" style={{ scale: imageScale, x: imageX }}><img src="/linhard-finale-object.png" alt="" /></motion.div>
      <div className="profile-sequence-shade" /><div className="profile-sequence-grid" aria-hidden="true" />
      <div className="profile-sequence-top"><span>PROFIL / LINHARD ZEJNELI</span><span>ENGINEERING × DISCIPLINE</span><span>0{active + 1} / 03</span></div>
      <div className="profile-sequence-layout">
        <div className="profile-sequence-steps">{phases.map((phase, index) => <div key={phase.label} className={index === active ? "is-active" : ""}><span>0{index + 1}</span><strong>{phase.label}</strong></div>)}</div>
        <div className={`profile-instrument profile-instrument-${active}`} aria-hidden="true"><motion.div className="profile-instrument-stack" style={{ y: stackY }}><span /><span /><span /></motion.div><svg viewBox="0 0 400 400"><motion.path d="M22 245 H104 L135 155 L176 305 L213 209 L237 247 H304 L336 140 L371 246 H398" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ pathLength: trace }} /></svg><div className="profile-instrument-point" /><div className="profile-instrument-caption"><span>HUMAN / SYSTEM</span><span>{phases[active].signal}</span></div></div>
        <div className="profile-sequence-copy" aria-live="polite"><AnimatePresence mode="wait"><motion.div key={active} initial={{ opacity: 0, y: 40, filter: "blur(9px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -35, filter: "blur(8px)" }} transition={{ duration: .63, ease: [.22, 1, .36, 1] }}><p className="lux-label"><span />PROFIL / {phases[active].label}</p><h2>{phases[active].title}</h2><p>{phases[active].body}</p>{active === 2 && <div className="profile-sequence-signature"><Typewriter text="Verantwortung ist eine Entscheidung." delay={150} /></div>}</motion.div></AnimatePresence><div className="profile-sequence-links"><a href="/about">Profil lesen <ArrowRight aria-hidden="true" /></a><a href={site.cvUrl} target="_blank" rel="noreferrer">CV öffnen <Download aria-hidden="true" /></a></div></div>
      </div>
      <div className="profile-sequence-bottom"><span>KLARHEIT / HANDWERK / CHARAKTER</span><div><motion.i style={{ scaleX: trace }} /></div><span>MEHR ERFAHREN <ArrowUpRight aria-hidden="true" /></span></div>
    </div>
  </section>;
}
