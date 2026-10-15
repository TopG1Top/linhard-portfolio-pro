"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { heading } from "@/lib/typography";
import { ArrowRight, Download, Fingerprint } from "lucide-react";
import { useRef, useState } from "react";
import { site } from "@/lib/site";

const phases = [
  { label: "Haltung", title: "Ein Kopf für Systeme. Ein Blick für Menschen.", body: "Ich bin Linhard Zejneli, Applikationsentwickler in Ausbildung mit Berufsmaturität Wirtschaft. Mich interessiert nicht nur, ob ein System funktioniert — sondern ob es Menschen Orientierung gibt.", note: "Technik wird dann interessant, wenn sie eine echte Aufgabe löst.", facts: ["APPLIKATIONSENTWICKLUNG / EFZ", "BERUFSMATURITÄT / WIRTSCHAFT", "STANDORT / SCHWEIZ"] },
  { label: "Handwerk", title: "Die Verbindung ist das eigentliche Handwerk.", body: "Oberfläche, Logik und Datenhaltung gehören für mich zusammen. Ich arbeite an Web-Anwendungen, datenbasierten Werkzeugen und interaktiven Experimenten — von der ersten Struktur bis zur benutzbaren Anwendung.", note: "Nicht im perfekten Demo-Moment aufhören. Die Zustände dazwischen mitdenken.", facts: ["FRONTEND / INTERAKTION", "BACKEND / LOGIK", "DATEN / STRUKTUR"] },
  { label: "Charakter", title: "Verantwortung lässt sich nicht delegieren.", body: "Leistungsfussball und Captain-Erfahrung prägen meine Arbeitsweise. Ruhe bewahren, gemeinsam denken, Entscheidungen tragen. Was auf dem Platz zählt, gilt für mich auch im Projekt: Verantwortung übernehmen und dranbleiben.", note: "Klar kommunizieren. Verantwortung tragen. Gemeinsam weiterkommen.", facts: ["HALTUNG / DISZIPLIN", "TEAM / CAPTAIN-ERFAHRUNG", "ANSPRUCH / BIS ZUM ENDE"] },
];

function CraftLayer({ progress, index }: { progress: MotionValue<number>; index: number }) {
  const y = useTransform(progress, [.3, .6], [`${index * 40}%`, `${index * 130}%`]);
  const x = useTransform(progress, [.3, .6], [0, index * 14]);
  return <motion.div className="identity-craft-layer" style={{ x, y, zIndex: 3 - index }}><span>0{index + 1}</span><strong>{["INTERFACE", "LOGIC", "DATA"][index]}</strong><i /></motion.div>;
}

export function ProfileSequence() {
  const target = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const { scrollYProgress: progress } = useScroll({ target, offset: ["start start", "end end"] });
  const scan = useTransform(progress, [0, .3], ["0%", "100%"]);
  const trace = useTransform(progress, [.66, .95], [0, 1]);
  useMotionValueEvent(progress, "change", value => setActive(Math.min(2, Math.floor(value * 3))));
  const phase = phases[active];
  return <section id="profil" ref={target} className={`identity-sequence identity-phase-${active}`} aria-labelledby="profile-title"><div className="identity-sticky"><header className="identity-top"><span>DER MENSCH HINTER DEM SYSTEM</span><span>LINHARD ZEJNELI / 0{active + 1}—03</span></header><div className="identity-layout"><div className="identity-visual" aria-hidden="true"><div className="identity-visual-corners"><i /><i /><i /><i /></div><div className="identity-visual-header"><span>LZ / PERSONAL FILE</span><span>0{active + 1}</span></div><AnimatePresence mode="wait">{active === 0 ? <motion.div className="identity-fingerprint" key="fingerprint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Fingerprint strokeWidth={.42} /><motion.i style={{ top: scan }} /><span>INDIVIDUAL BY DESIGN</span></motion.div> : active === 1 ? <motion.div className="identity-craft" key="craft" initial={reduced ? false : { opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>{[0, 1, 2].map(index => <CraftLayer key={index} index={index} progress={progress} />)}</motion.div> : <motion.div className="identity-team" key="team" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><svg viewBox="0 0 400 340"><path className="identity-team-field" d="M30 40 H370 V300 H30Z M200 40 V300 M160 170 A40 40 0 1 0 240 170 A40 40 0 1 0 160 170" /><motion.path className="identity-team-route" d="M70 235 L150 130 L250 210 L330 95" style={{ pathLength: trace }} />{[[70, 235], [150, 130], [250, 210], [330, 95]].map(([cx, cy], i) => <g key={i}><circle cx={cx} cy={cy} r="15" /><text x={cx} y={cy + 4}>{i === 1 ? "C" : `0${i + 1}`}</text></g>)}</svg><span>ONE TEAM / SHARED RESPONSIBILITY</span></motion.div>}</AnimatePresence><div className="identity-visual-footer"><span>{["HALTUNG / EINZIGARTIG", "HANDWERK / VERBUNDEN", "CHARAKTER / VERANTWORTLICH"][active]}</span><span>VISUELLE STUDIE</span></div></div><div className="identity-copy"><p className="lux-label"><span />PROFIL / {phase.label}</p><AnimatePresence mode="wait" initial={false}><motion.div key={active} initial={reduced ? false : { opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }} transition={{ duration: .5 }}><h2 id="profile-title">{heading(phase.title)}</h2><p className="identity-body">{phase.body}</p><blockquote>{phase.note}</blockquote><div className="identity-facts">{phase.facts.map(fact => <span key={fact}>{fact}</span>)}</div></motion.div></AnimatePresence><div className="identity-links"><a href="/about">Mein Profil <ArrowRight size={14} /></a><a href={site.cvUrl} target="_blank" rel="noreferrer">Curriculum Vitae <Download size={14} /></a></div></div></div><footer className="identity-bottom">{phases.map((p, i) => <span key={p.label} className={active === i ? "is-active" : ""}><small>0{i + 1}</small>{p.label}</span>)}<div><motion.i style={{ scaleX: progress }} /></div></footer></div></section>;
}
