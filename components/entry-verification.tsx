"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LogoMark } from "@/components/logo-mark";
import { EntryIdentityField } from "@/components/entry-identity-field";

const stages = [
  { title: "Aus Fragmenten wird Identität", label: "ASSEMBLE", detail: "Ein Moment der nur einmal existiert" },
  { title: "Präzision hinterlässt eine Signatur", label: "RESOLVE", detail: "Eine einzigartige Signatur nimmt Form an" },
  { title: "Das ist erst der Anfang", label: "ENTER", detail: "Willkommen in meiner digitalen Welt" },
];

export function EntryVerification() {
  const reduced = useReducedMotion() === true;
  const [progress, setProgress] = useState(0);
  const [digest, setDigest] = useState("");
  const [open, setOpen] = useState(true);
  const skipRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    let active = true;
    let closing: ReturnType<typeof setTimeout>;
    const createSignature = async () => {
      try {
        const challenge = window.crypto.getRandomValues(new Uint8Array(16));
        const hash = await window.crypto.subtle.digest("SHA-256", challenge);
        if (active) setDigest(Array.from(new Uint8Array(hash), b => b.toString(16).padStart(2, "0")).join("").toUpperCase());
      } catch { /* The entrance remains available without Web Crypto. */ }
    };
    void createSignature();
    const total = reduced ? 450 : 4800;
    const started = performance.now();
    const interval = window.setInterval(() => {
      const next = Math.min(100, Math.round(((performance.now() - started) / total) * 100));
      setProgress(next);
      if (next >= 100) {
        window.clearInterval(interval);
        closing = setTimeout(() => { if (active) setOpen(false); }, reduced ? 50 : 350);
      }
    }, 40);
    return () => { active = false; window.clearInterval(interval); clearTimeout(closing); };
  }, [reduced, open]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    const focused = document.activeElement as HTMLElement | null;
    const roots = Array.from(document.querySelectorAll<HTMLElement>(".site-header, main"));
    const prior = roots.map(el => el.inert);
    roots.forEach(el => { el.inert = true; });
    document.body.style.overflow = "hidden";
    skipRef.current?.focus({ preventScroll: true });
    const skip = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "Tab") { event.preventDefault(); skipRef.current?.focus(); }
    };
    window.addEventListener("keydown", skip);
    return () => {
      document.body.style.overflow = previous;
      roots.forEach((el, i) => { el.inert = prior[i]; });
      window.removeEventListener("keydown", skip);
      focused?.focus({ preventScroll: true });
    };
  }, [open]);

  const stage = progress < 31 ? 0 : progress < 68 ? 1 : 2;
  const resolved = Math.round(Math.min(1, Math.max(0, (progress - 22) / 48)) * 64);
  return <AnimatePresence>{open && <motion.div
    className={`entry-verification entry-v5 entry-stage-${stage}`}
    role="dialog" aria-modal="true" aria-label="Willkommen bei Linhard Zejneli"
    initial="initial" animate="visible" exit="exit"
    variants={{ initial: { opacity: 1 }, visible: { opacity: 1 }, exit: { opacity: 0, transition: { delay: reduced ? 0 : .65, duration: .15 } } }}
  >
    {["left", "right"].map(side => <motion.div key={side} className={`entry-door entry-door-${side}`} aria-hidden="true" variants={{
      initial: { x: "0%" }, exit: { x: reduced ? "0%" : side === "left" ? "-101%" : "101%", transition: { duration: reduced ? .1 : .8, ease: [.76, 0, .24, 1] } },
    }} />)}
    <motion.div className="entry-cinema" variants={{ exit: { opacity: 0, scale: reduced ? 1 : 1.08, filter: reduced ? "blur(0px)" : "blur(5px)", transition: { duration: reduced ? .05 : .45 } } }}>
      <div className="entry-architecture" aria-hidden="true"><i /><i /><i /><i /></div>
      <header className="entry-masthead"><span className="entry-brand"><LogoMark /><span>LINHARD ZEJNELI<small>INDEPENDENT DIGITAL CRAFT</small></span></span><span className="entry-edition"><i />SCHWEIZ<span>PERSONAL EDITION / 01</span></span></header>

      <div className="entry-stage-art"><EntryIdentityField progress={progress} reduced={reduced} /></div>

      <aside className="entry-telemetry" aria-hidden="true"><span className="entry-micro-label">SESSION SIGNATURE</span><div className="entry-hash-matrix">{Array.from({ length: 8 }, (_, i) => <code key={i} className={resolved > i * 8 ? "is-written" : ""}>{digest.slice(i * 8, i * 8 + Math.max(0, Math.min(8, resolved - i * 8))).padEnd(8, "·")}</code>)}</div><span className="entry-telemetry-rule" /><span className="entry-micro-label">LOCAL / EPHEMERAL</span><span className="entry-telemetry-count">{String(resolved).padStart(2, "0")}<small> / 64</small></span></aside>

      <aside className="entry-chapters" aria-hidden="true">{stages.map((item, i) => <div key={item.label} className={stage === i ? "is-current" : stage > i ? "is-past" : ""}><span>0{i + 1}</span><i /><strong>{item.label}</strong></div>)}</aside>

      <div className="entry-title-block"><p className="entry-overline">DIGITAL CRAFT / HUMAN SIGNATURE</p><h2><span>Linhard</span> <span>Zejneli</span></h2><div className="entry-stage-caption"><AnimatePresence mode="wait"><motion.p key={stage} initial={reduced ? false : { opacity: 0, y: 13, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -10, filter: "blur(3px)" }} transition={{ duration: reduced ? 0 : .22 }}>{stages[stage].title}<span>{stages[stage].detail}</span></motion.p></AnimatePresence></div></div>

      <footer className="entry-console"><div className="entry-console-progress" role="progressbar" aria-label={`Startsequenz ${progress} Prozent`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><span className="entry-progress-number">{String(progress).padStart(3, "0")}<small>%</small></span><div><span>{progress === 100 ? "BEREIT FÜR MEHR" : "DAS ERLEBNIS ENTSTEHT"}</span><div className="entry-segment-track" aria-hidden="true">{Array.from({ length: 32 }, (_, i) => <i key={i} className={progress >= (i + 1) / 32 * 100 ? "is-lit" : ""} />)}</div></div></div><p className="entry-privacy">Eine inszenierte Signatur<span>Keine biometrische Erfassung</span></p><button ref={skipRef} type="button" onClick={() => setOpen(false)} aria-label="Startsequenz überspringen">Direkt eintreten <ArrowUpRight size={14} aria-hidden="true" /></button></footer>
    </motion.div>
  </motion.div>}</AnimatePresence>;
}
