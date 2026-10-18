"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ShieldCheck, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LogoMark } from "@/components/logo-mark";
import { EntryIdentityField } from "@/components/entry-identity-field";

const stages = [
  { title: "Einmaligkeit erzeugen", detail: "16 zufällige Bytes / nur für diesen Aufruf" },
  { title: "Den Moment verdichten", detail: "SHA 256 / ein neuer Hash nimmt Form an" },
  { title: "Die Bühne freigeben", detail: "Initialisierung abgeschlossen / das Erlebnis beginnt" },
];

export function EntryVerification() {
  const reduced = useReducedMotion() === true;
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<"pending" | "ready" | "limited">("pending");
  const [digest, setDigest] = useState("");
  const [nonce, setNonce] = useState("");
  const [open, setOpen] = useState(true);
  const skipRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    let active = true;
    let closing: ReturnType<typeof setTimeout>;
    const runCheck = async () => {
      try {
        if (!window.isSecureContext || !window.crypto?.subtle) throw new Error("Web Crypto unavailable");
        const challenge = window.crypto.getRandomValues(new Uint8Array(16));
        const hash = await window.crypto.subtle.digest("SHA-256", challenge);
        const hex = (bytes: Uint8Array) => Array.from(bytes, b => b.toString(16).padStart(2, "0")).join("").toUpperCase();
        if (active) { setNonce(hex(challenge)); setDigest(hex(new Uint8Array(hash))); setResult("ready"); }
      } catch { if (active) setResult("limited"); }
    };
    void runCheck();
    const total = reduced ? 600 : 4300;
    const started = performance.now();
    const interval = window.setInterval(() => {
      const next = Math.min(100, Math.round(((performance.now() - started) / total) * 100));
      setProgress(next);
      if (next >= 100) { window.clearInterval(interval); closing = setTimeout(() => { if (active) setOpen(false); }, reduced ? 80 : 400); }
    }, reduced ? 50 : 40);
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
    return () => { document.body.style.overflow = previous; roots.forEach((el,i) => { el.inert = prior[i]; }); window.removeEventListener("keydown", skip); focused?.focus({ preventScroll: true }); };
  }, [open]);

  const stage = Math.min(2, Math.floor(progress / (100 / 3)));
  const exitDuration = reduced ? .08 : .7;
  return <AnimatePresence>{open && <motion.div className={`entry-verification entry-v4 entry-stage-${stage}`} role="dialog" aria-modal="true" aria-label="Lokaler Systemcheck" initial="initial" animate="visible" exit="exit" variants={{ initial: { opacity: 1 }, visible: { opacity: 1 }, exit: { opacity: 0, transition: { duration: reduced ? .08 : .2, delay: reduced ? 0 : .5 } } }}>
    <motion.div className="entry-vault-veil entry-vault-veil-left" aria-hidden="true" variants={{ initial: { x: "0%" }, exit: { x: reduced ? "0%" : "-100%", transition: { duration: exitDuration, ease: [.76, 0, .24, 1] } } }} />
    <motion.div className="entry-vault-veil entry-vault-veil-right" aria-hidden="true" variants={{ initial: { x: "0%" }, exit: { x: reduced ? "0%" : "100%", transition: { duration: exitDuration, ease: [.76, 0, .24, 1] } } }} />
    <motion.div className="entry-v4-content" variants={{ exit: { opacity: 0, y: reduced ? 0 : -12, transition: { duration: reduced ? .05 : .25 } } }}>
      <header className="entry-top"><span><LogoMark /> LINHARD ZEJNELI <small>SECURE EXPERIENCE</small></span><span className="entry-counter" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} aria-label={`Initialisierung ${progress} Prozent`}><small>INITIALISIERUNG</small><b aria-hidden="true">{String(progress).padStart(3, "0").split("").map((digit, index) => <span className="entry-counter-column" key={index}><motion.i animate={{ y: `${-Number(digit) * 10}%` }} transition={{ duration: reduced ? 0 : .15 }}>{Array.from({ length: 10 }, (_, n) => <em key={n}>{n}</em>)}</motion.i></span>)}<span className="entry-counter-percent">%</span></b></span></header>
      <div className="entry-body">
        <EntryIdentityField progress={progress} digest={digest} nonce={nonce} ready={result === "ready"} />
        <div className="entry-copy"><p className="lux-label"><span />PRÄZISION / VOM ERSTEN MOMENT</p><h2>Jeder Anfang<br /> hat eine Signatur</h2><p className="entry-description">Ein flüchtiger Zufallswert wird zu einem einzigartigen Hash. Direkt in deinem Browser. Ohne Speicherung oder Übertragung.</p>
          <div className="entry-v4-current"><span>0{stage + 1} / 03</span><div><motion.strong key={stage} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .25 }}>{stages[stage].title}</motion.strong><p>{stages[stage].detail}</p></div></div>
          <div className="entry-v4-checkpoints">{["ENTROPIE", "HASH", "FREIGABE"].map((label, index) => <div key={label} className={stage > index || progress === 100 ? "is-complete" : stage === index ? "is-active" : ""}><span>{stage > index || progress === 100 ? <Check size={10} /> : `0${index + 1}`}</span><strong>{label}</strong><i /></div>)}</div>
          <div className="entry-progress"><motion.div style={{ scaleX: progress / 100 }} /></div><div className="entry-v4-receipt"><span>{result === "limited" ? "BASISMODUS / BEREIT" : stage === 2 ? "LOCAL FINGERPRINT / READY" : "LOCAL FINGERPRINT / COMPUTING"}</span><code>{stage === 2 && digest ? `${digest.slice(0, 8)} · ${digest.slice(-8)}` : "········ · ········"}</code></div>
        </div>
      </div>
      <footer className="entry-bottom"><span><ShieldCheck aria-hidden="true" />{result === "limited" ? "BASISMODUS / SEITE BLEIBT NUTZBAR" : "LOKALER SYSTEMCHECK"}</span><span>ERZEUGTES IDENTITÄTSMUSTER / KEINE BIOMETRISCHE ERFASSUNG</span><button ref={skipRef} type="button" onClick={() => setOpen(false)} aria-label="Startsequenz überspringen">Überspringen <X aria-hidden="true" /></button></footer>
    </motion.div>
  </motion.div>}</AnimatePresence>;
}
